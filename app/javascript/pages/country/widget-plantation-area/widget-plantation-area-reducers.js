export const initialState = {
  isLoading: true,
  plantationAreaData: [],
  paginate: {
    limit: 5,
    page: 1
  },
  units: [
    {
      value: 'ha',
      label: 'Hectare - ha'
    },
    {
      value: '%',
      label: 'Percent Area - %'
    }
  ],
  settings: {
    unit: 'ha'
  }
};

const setPlantationAreaIsLoading = (state, { payload }) => ({
  ...state,
  isLoading: payload
});

const setPlantationAreaData = (state, { payload }) => ({
  ...state,
  isLoading: false,
  plantationAreaData: payload
});

const setPlantationAreaPage = (state, { payload }) => ({
  ...state,
  paginate: {
    ...state.paginate,
    page: payload
  }
});

const setPlantationAreaSettingsUnit = (state, { payload }) => ({
  ...state,
  settings: {
    ...state.settings,
    unit: payload
  }
});

export default {
  setPlantationAreaIsLoading,
  setPlantationAreaData,
  setPlantationAreaPage,
  setPlantationAreaSettingsUnit
};
