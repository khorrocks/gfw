import { createSelector, createStructuredSelector } from 'reselect';
import flatten from 'lodash/flatten';
import isEmpty from 'lodash/isEmpty';
import sortBy from 'lodash/sortBy';

import { formatDate } from 'utils/dates';

import initialState from './map-initial-state';
import decodeLayersConfig from './map-decode-config';

// get list data
const getMapUrlState = state => (state.query && state.query.map) || null;
const getDatasets = state => state.datasets.filter(d => !isEmpty(d.layer));
const getLoading = state => state.loading;
const getWidget = state => state[state.widgetKey] || null;
const getGeostore = state => state.geostore || null;

const reduceParams = params => {
  if (!params) return null;
  return params.reduce((obj, param) => {
    const newObj = {
      ...obj,
      [param.key]:
        param.key === 'endDate' && !param.default
          ? formatDate(new Date())
          : param.default
    };
    return newObj;
  }, {});
};

const reduceSqlParams = params => {
  if (!params) return null;
  return params.reduce((obj, param) => {
    const newObj = {
      ...obj,
      [param.key]: param.key_params.reduce((subObj, item) => {
        const keyValues = {
          ...subObj,
          [item.key]: item.value
        };
        return keyValues;
      }, {})
    };
    return newObj;
  }, {});
};

// get map settings

export const getWidgetSettings = createSelector(
  getWidget,
  widget => widget && widget.settings
);

export const getMapSettings = createSelector(
  [getMapUrlState, getWidgetSettings],
  (urlState, widgetState) => ({
    ...initialState,
    ...urlState,
    ...widgetState
  })
);

export const getLayers = createSelector(
  getMapSettings,
  settings => settings.layers
);

export const getDatasetIds = createSelector([getLayers], layers => {
  if (!layers || !layers.length) return null;
  return layers.map(l => l.dataset);
});

export const getActiveDatasets = createSelector(
  [getDatasets, getDatasetIds],
  (datasets, datasetIds) => {
    if (isEmpty(datasets) || isEmpty(datasetIds)) return null;
    return datasets.filter(d => datasetIds.indexOf(d.id) > -1);
  }
);

export const getParsedDatasets = createSelector(getActiveDatasets, datasets => {
  if (isEmpty(datasets)) return null;
  return datasets.map(d => {
    const { layer, metadata } = d;
    const appMeta = metadata.find(m => m.application === 'gfw') || {};
    const { info } = appMeta || {};
    const defaultLayer =
      (layer &&
        layer.find(l => l.applicationConfig && l.applicationConfig.default)) ||
      layer[0];

    return {
      ...d,
      ...info,
      ...(info &&
        info.isSelectorLayer && {
          selectorLayerConfig: {
            options: layer.map(l => l.applicationConfig.selectorConfig)
          }
        }),
      metadata:
        defaultLayer &&
        defaultLayer.applicationConfig &&
        defaultLayer.applicationConfig.metadata,
      layers:
        layer &&
        sortBy(
          layer.map((l, i) => {
            const { layerConfig, applicationConfig } = l;
            const { sortOrder } = applicationConfig || {};
            const {
              params_config,
              decode_config,
              sql_config,
              body,
              url
            } = layerConfig;
            const decodeFunction = decodeLayersConfig[l.id];
            return {
              ...l,
              ...applicationConfig,
              sortOrder: applicationConfig.default ? 0 : sortOrder || i + 1,
              ...(!isEmpty(params_config) && {
                params: {
                  url: body.url || url,
                  ...reduceParams(params_config)
                }
              }),
              ...(!isEmpty(sql_config) && {
                sqlParams: {
                  ...reduceSqlParams(sql_config)
                }
              }),
              ...decodeFunction,
              ...(!isEmpty(decode_config) && {
                decodeParams: {
                  ...(decodeFunction && decodeFunction.decodeParams),
                  ...reduceParams(decode_config)
                }
              })
            };
          }),
          'sortOrder'
        )
    };
  });
});

export const getLayerGroups = createSelector(
  [getParsedDatasets, getLayers],
  (datasets, layers) => {
    if (isEmpty(datasets) || isEmpty(layers)) return null;

    return datasets.map(d => {
      const layerConfig = layers.find(l => l.dataset === d.id) || {};
      const { params, sqlParams, decodeParams } = layerConfig;

      return {
        ...d,
        ...layerConfig,
        ...(d.selectorLayerConfig && {
          selectorLayerConfig: {
            ...d.selectorLayerConfig,
            selected: d.layers.find(l => l.id === layerConfig.layers[0])
              .applicationConfig.selectorConfig
          }
        }),
        layers: d.layers.map(l => ({
          ...l,
          ...layerConfig,
          active:
            layerConfig &&
            layerConfig.layers &&
            layerConfig.layers.indexOf(l.id) > -1,
          params: {
            ...l.params,
            ...params
          },
          sqlParams: {
            ...l.sqlParams,
            ...sqlParams
          },
          decodeParams: {
            ...l.decodeParams,
            ...decodeParams
          },
          ...(l.decodeParams &&
            l.decodeParams.startDate && {
              timelineConfig: {
                ...l.decodeParams,
                minDate: l.decodeParams && l.decodeParams.startDate,
                maxDate: l.decodeParams && l.decodeParams.endDate,
                trimEndDate: l.decodeParams && l.decodeParams.endDate,
                ...decodeParams
              }
            })
        }))
      };
    });
  }
);

export const getActiveLayers = createSelector(getLayerGroups, layerGroups => {
  if (isEmpty(layerGroups)) return null;
  return flatten(layerGroups.map(d => d.layers)).filter(l => l.active);
});

export const getMapProps = createStructuredSelector({
  layers: getLayers,
  settings: getMapSettings,
  layerGroups: getLayerGroups,
  activeLayers: getActiveLayers,
  loading: getLoading,
  geostore: getGeostore
});
