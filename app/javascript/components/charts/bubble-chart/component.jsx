import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  ZAxis,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
// import ChartToolTip from '../components/chart-tooltip';

import './styles.scss';

class BubbleChart extends PureComponent {
  parseDomain() {
    const data = this.getData();
    return [
      0,
      Math.max.apply(null, data.map(d => d.map(entry => entry.value)).flat())
    ];
  }

  getData() {
    const data01 = [
      { hour: 'key', index: 1, value: 170 },
      { hour: 'key', index: 1, value: 180 },
      { hour: 'key', index: 1, value: 150 },
      { hour: 'key', index: 1, value: 120 },
      { hour: 'key', index: 1, value: 200 },
      { hour: 'key', index: 1, value: 300 },
      { hour: 'key', index: 1, value: 400 },
      { hour: 'key', index: 1, value: 200 },
      { hour: 'key', index: 1, value: 100 },
      { hour: 'key', index: 1, value: 150 },
      { hour: 'key', index: 1, value: 160 },
      { hour: 'key', index: 1, value: 170 },
      { hour: 'key', index: 1, value: 180 },
      { hour: 'key', index: 1, value: 144 },
      { hour: 'key', index: 1, value: 166 },
      { hour: 'key', index: 1, value: 145 },
      { hour: 'key', index: 1, value: 150 },
      { hour: 'key', index: 1, value: 170 },
      { hour: 'key', index: 1, value: 180 },
      { hour: 'key', index: 1, value: 165 },
      { hour: 'key', index: 1, value: 130 },
      { hour: 'key', index: 1, value: 140 },
      { hour: 'key', index: 1, value: 170 },
      { hour: 'key', index: 1, value: 180 }
    ];

    const data02 = [
      { hour: 'key', index: 1, value: 160 },
      { hour: 'key', index: 1, value: 180 },
      { hour: 'key', index: 1, value: 150 },
      { hour: 'key', index: 1, value: 120 },
      { hour: 'key', index: 1, value: 200 },
      { hour: 'key', index: 1, value: 300 },
      { hour: 'key', index: 1, value: 100 },
      { hour: 'key', index: 1, value: 200 },
      { hour: 'key', index: 1, value: 100 },
      { hour: 'key', index: 1, value: 150 },
      { hour: 'key', index: 1, value: 160 },
      { hour: 'key', index: 1, value: 160 },
      { hour: 'key', index: 1, value: 180 },
      { hour: 'key', index: 1, value: 144 },
      { hour: 'key', index: 1, value: 166 },
      { hour: 'key', index: 1, value: 145 },
      { hour: 'key', index: 1, value: 150 },
      { hour: 'key', index: 1, value: 160 },
      { hour: 'key', index: 1, value: 180 },
      { hour: 'key', index: 1, value: 165 },
      { hour: 'key', index: 1, value: 130 },
      { hour: 'key', index: 1, value: 140 },
      { hour: 'key', index: 1, value: 160 },
      { hour: 'key', index: 1, value: 180 }
    ];
    return [data01, data02];
  }

  renderTooltip(props) {
    const { active, payload } = props;

    if (active && payload && payload.length) {
      const data = payload[0].payload;

      return (
        <div
          style={{
            backgroundColor: '#fff',
            border: '1px solid #999',
            margin: 0,
            padding: 10
          }}
        >
          <p>{data.hour}</p>
          <p>
            <span>value: </span>
            {data.value}
          </p>
        </div>
      );
    }

    return null;
  }

  renderAxisTick(props) {
    const { x, y, payload } = props;

    return (
      <g transform={`translate(${x + 10}, ${y - 20})`}>
        <text x={0} y={0} textAnchor="end" fill="#666" transform="rotate(-35)">
          {payload.value}
        </text>
      </g>
    );
  }

  renderYAxis(label) {
    const { value, position } = label;
    return (
      <YAxis
        type="number"
        dataKey="index"
        height={10}
        width={80}
        tick={false}
        tickLine={false}
        axisLine={false}
        label={{ value, position }}
      />
    );
  }

  renderScatterChart(props) {
    const { data, xAxis, length, height } = props;
    const domain = this.parseDomain();
    const range = [16, 225];

    return (
      <ResponsiveContainer width="99%" height={height / length}>
        <ScatterChart margin={{ top: 10, right: 0, bottom: 0, left: 0 }}>
          {this.renderYAxis({
            value: xAxis ? '' : 'Monday',
            position: 'insideRight'
          })}
          {xAxis && (
            <XAxis
              type="category"
              dataKey="hour"
              interval={0}
              tick={this.renderAxisTick}
              orientation="top"
              padding={{ top: 20 }}
              tickMargin={0}
            />
          )}
          <ZAxis type="number" dataKey="value" domain={domain} range={range} />
          {!xAxis && (
            <Tooltip
              cursor={{ strokeDasharray: '3 3' }}
              wrapperStyle={{ zindex: 1000 }}
              content={this.renderTooltip}
            />
          )}
          {<Scatter data={data} fill={xAxis ? 'transparent' : '#8884d8'} />}
        </ScatterChart>
      </ResponsiveContainer>
    );
  }

  render() {
    const {
      // data,
      // maxSize,
      // dataKey,
      // innerRadius,
      // outerRadius,
      // startAngle,
      // endAngle,
      // tooltip,
      // simple,
      className
    } = this.props;

    const height = 250;
    const rawdata = this.getData();
    const data = [
      rawdata[0], // need to duplicate the first data entry
      ...rawdata,
      ...rawdata,
      ...rawdata
    ];

    return (
      <div className={cx('c-bubble-chart', className)} style={{ height }}>
        {rawdata &&
          data.map((d, i) =>
            this.renderScatterChart({
              data: d,
              xAxis: i === 0,
              length: data.length,
              height
            })
          )}
      </div>
    );
  }
}

BubbleChart.propTypes = {
  // data: PropTypes.array,
  // maxSize: PropTypes.number,
  // dataKey: PropTypes.string,
  // innerRadius: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  // outerRadius: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  // startAngle: PropTypes.number,
  // endAngle: PropTypes.number,
  className: PropTypes.string
  // simple: PropTypes.bool,
  // tooltip: PropTypes.array
};

BubbleChart.defaultProps = {
  maxSize: 300,
  dataKey: 'value',
  innerRadius: '50%',
  outerRadius: '100%',
  startAngle: -270,
  endAngle: -630
};

export default BubbleChart;
