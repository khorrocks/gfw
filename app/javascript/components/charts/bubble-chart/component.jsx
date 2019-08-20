import React, { PureComponent } from 'react';
// import PropTypes from 'prop-types';
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
    const { data01, data02 } = this.getData();
    return [
      0,
      Math.max.apply(null, [
        ...data01.map(entry => entry.value),
        ...data02.map(entry => entry.value)
      ])
    ];
  }

  getData() {
    const data01 = [
      { hour: 'key', index: 10, value: 170 },
      { hour: 'key', index: 10, value: 180 },
      { hour: 'key', index: 10, value: 150 },
      { hour: 'key', index: 10, value: 120 },
      { hour: 'key', index: 10, value: 200 },
      { hour: 'key', index: 10, value: 300 },
      { hour: 'key', index: 10, value: 400 },
      { hour: 'key', index: 10, value: 200 },
      { hour: 'key', index: 10, value: 100 },
      { hour: 'key', index: 10, value: 150 },
      { hour: 'key', index: 10, value: 160 },
      { hour: 'key', index: 10, value: 170 },
      { hour: 'key', index: 10, value: 180 },
      { hour: 'key', index: 10, value: 144 },
      { hour: 'key', index: 10, value: 166 },
      { hour: 'key', index: 10, value: 145 },
      { hour: 'key', index: 10, value: 150 },
      { hour: 'key', index: 10, value: 170 },
      { hour: 'key', index: 10, value: 180 },
      { hour: 'key', index: 10, value: 165 },
      { hour: 'key', index: 10, value: 130 },
      { hour: 'key', index: 10, value: 140 },
      { hour: 'key', index: 10, value: 170 },
      { hour: 'key', index: 10, value: 180 }
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
    return { data01, data02 };
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
      <g transform={`translate(${x},${y})`}>
        <text
          x={0}
          y={0}
          dy={16}
          textAnchor="end"
          fill="#666"
          transform="rotate(-35)"
        >
          {payload.value}
        </text>
      </g>
    );
  }

  render() {
    /*
    const {
      data,
      maxSize,
      dataKey,
      innerRadius,
      outerRadius,
      startAngle,
      endAngle,
      className,
      tooltip,
      simple
    } = this.props;
    */

    const domain = this.parseDomain();
    const range = [16, 225];
    const { data01, data02 } = this.getData();
    const height = 250;
    const length = 2;

    return (
      <div style={{ height }}>
        <ResponsiveContainer width="99%" height={height / length}>
          <ScatterChart
            // width={width}
            // height={200}
            margin={{ top: 10, right: 0, bottom: 0, left: 0 }}
          >
            <XAxis
              type="category"
              dataKey="hour"
              interval={0}
              // tick={this.renderAxisTick}
              orientation="top"
              padding={{ top: 20, bottom: 20 }}
              // dy={-20}
              // tickLine={{ transform: 'translate(0, -6)' }}
              // tickMargin={10}
            />
            <YAxis
              type="number"
              dataKey="index"
              name="sunday"
              height={10}
              width={80}
              tick={false}
              tickLine={false}
              axisLine={false}
              label={{ value: 'Sunday', position: 'insideRight' }}
            />
            <ZAxis
              type="number"
              dataKey="value"
              domain={domain}
              range={range}
            />
            <Tooltip
              cursor={{ strokeDasharray: '3 3' }}
              wrapperStyle={{ zindex: 1000 }}
              content={this.renderTooltip}
            />
            <Scatter data={data01} fill="#8884d8" />
          </ScatterChart>
        </ResponsiveContainer>
        <ResponsiveContainer width="99%" height={height / length}>
          <ScatterChart margin={{ top: 10, right: 0, bottom: 0, left: 0 }}>
            <YAxis
              type="number"
              dataKey="index"
              height={10}
              width={80}
              tick={false}
              tickLine={false}
              axisLine={false}
              label={{ value: 'Monday', position: 'insideRight' }}
            />
            <ZAxis
              type="number"
              dataKey="value"
              domain={domain}
              range={range}
            />
            <Tooltip
              cursor={{ strokeDasharray: '3 3' }}
              wrapperStyle={{ zindex: 1000 }}
              content={this.renderTooltip}
            />
            <Scatter data={data02} fill="#8884d8" />
          </ScatterChart>
        </ResponsiveContainer>
      </div>
    );
  }
}

/*
BubbleChart.propTypes = {
  data: PropTypes.array,
  maxSize: PropTypes.number,
  dataKey: PropTypes.string,
  innerRadius: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  outerRadius: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  startAngle: PropTypes.number,
  endAngle: PropTypes.number,
  className: PropTypes.string,
  simple: PropTypes.bool,
  tooltip: PropTypes.array
};
*/

BubbleChart.defaultProps = {
  maxSize: 300,
  dataKey: 'value',
  innerRadius: '50%',
  outerRadius: '100%',
  startAngle: -270,
  endAngle: -630
};

export default BubbleChart;
