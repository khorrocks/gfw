import CartoDB from './abstract/cartoDB';
import PlantationsByTypeCartoCSS from '../cartocss/plantations_by_type.cartocss';

const OPTIONS = {
  sql:
    "SELECT the_geom_webmercator, cartodb_id, type_text, spec_org, spec_simp, percent, round(area_ha::numeric,1) as area_ha, '{tableName}' AS tablename, '{tableName}' AS layer, {analysis} AS analysis FROM {tableName}",
  cartocss: PlantationsByTypeCartoCSS,
  infowindow: true,
  interactivity:
    'cartodb_id, tablename, layer, analysis, type_text, spec_org, spec_simp, percent, area_ha',
  analysis: true
};

class PlantationsByType extends CartoDB {
  constructor(map, options) {
    super(map, OPTIONS);
    this.options = { ...this.options, ...options };
  }
}

export default PlantationsByType;
