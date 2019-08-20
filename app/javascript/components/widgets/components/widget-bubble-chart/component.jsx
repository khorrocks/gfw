import React, { PureComponent } from 'react';
// import PropTypes from 'prop-types';

import BubbleChart from 'components/charts/bubble-chart';

import './styles';

class WidgetBubbleChart extends PureComponent {
  render() {
    return (
      <div className="c-sankey-chart-legend-widget">
        <BubbleChart />
      </div>
    );
  }
}

/*
WidgetBubbleChart.propTypes = {
};
*/

export default WidgetBubbleChart;
