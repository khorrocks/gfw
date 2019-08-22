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
    const values = Object.values(data);
    return [
      0,
      Math.max.apply(null, values.map(d => d.map(entry => entry.value)).flat())
    ];
  }

  getData() {
    return {
      Forest: [
        { hour: 'Forest', index: 1, value: 170 },
        { hour: 'Wetlands', index: 1, value: 180 },
        { hour: 'Grassland', index: 1, value: 150 },
        { hour: 'Cropland', index: 1, value: 120 },
        { hour: 'Bare', index: 1, value: 200 },
        { hour: 'Settlements', index: 1, value: 300 }
      ],
      Wetlands: [
        { hour: 'Forest', index: 1, value: 200 },
        { hour: 'Wetlands', index: 1, value: 20 },
        { hour: 'Grassland', index: 1, value: 40 },
        { hour: 'Cropland', index: 1, value: 350 },
        { hour: 'Bare', index: 1, value: 10 },
        { hour: 'Settlements', index: 1, value: 170 }
      ],
      Grassland: [
        { hour: 'Forest', index: 1, value: 130 },
        { hour: 'Wetlands', index: 1, value: 60 },
        { hour: 'Grassland', index: 1, value: 210 },
        { hour: 'Cropland', index: 1, value: 140 },
        { hour: 'Bare', index: 1, value: 30 },
        { hour: 'Settlements', index: 1, value: 0 }
      ],
      Cropland: [
        { hour: 'Forest', index: 1, value: 130 },
        { hour: 'Wetlands', index: 1, value: 60 },
        { hour: 'Grassland', index: 1, value: 210 },
        { hour: 'Cropland', index: 1, value: 140 },
        { hour: 'Bare', index: 1, value: 30 },
        { hour: 'Settlements', index: 1, value: 0 }
      ],
      Bare: [
        { hour: 'Forest', index: 1, value: 130 },
        { hour: 'Wetlands', index: 1, value: 60 },
        { hour: 'Grassland', index: 1, value: 210 },
        { hour: 'Cropland', index: 1, value: 140 },
        { hour: 'Bare', index: 1, value: 30 },
        { hour: 'Settlements', index: 1, value: 0 }
      ],
      Settlements: [
        { hour: 'Forest', index: 1, value: 130 },
        { hour: 'Wetlands', index: 1, value: 60 },
        { hour: 'Grassland', index: 1, value: 210 },
        { hour: 'Cropland', index: 1, value: 140 },
        { hour: 'Bare', index: 1, value: 30 },
        { hour: 'Settlements', index: 1, value: 0 }
      ]
    };
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
    const { data, xAxis, length, height, key, label } = props;
    const domain = this.parseDomain();
    const range = [16, 225];

    return (
      <ResponsiveContainer width="99%" height={height / length} key={key}>
        <ScatterChart margin={{ top: 10, right: 0, bottom: 0, left: 0 }}>
          {this.renderYAxis({
            value: xAxis ? '' : label,
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
    const data = this.getData();
    const keys = Object.keys(data);
    const values = Object.values(data);

    return (
      <div className={cx('c-bubble-chart', className)} style={{ height }}>
        {values &&
          values.map((d, i) =>
            this.renderScatterChart({
              data: d,
              xAxis: i === 0,
              length: data.length,
              height,
              key: `scatter-${i}`,
              label: keys[i]
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
