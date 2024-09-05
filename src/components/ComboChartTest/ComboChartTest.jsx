import React from 'react';
import { useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

const data = [
  {
    name: 'Jan',
    uv: 4621,
    pv: 7773,
  },
  {
    name: 'Feb',
    uv: 5419,
    pv: 8846,
  },
  {
    name: 'Mar',
    uv: 4801,
    pv: 6108,
  },
  {
    name: 'Apr',
    uv: 7885,
    pv: 4316,
  },
  {
    name: 'May',
    uv: 6543,
    pv: 9141,
  },
  {
    name: 'Jun',
    uv: 4991,
    pv: 8147,
  },
  {
    name: 'Jul',
    uv: 8994,
    pv: 5486,
  },
  {
    name: 'Aug',
    uv: 5211,
    pv: 5038,
  },
  {
    name: 'Sept',
    uv: 9199,
    pv: 7122,
  },
  {
    name: 'Oct',
    uv: 9999,
    pv: 4736,
  },
  {
    name: 'Nov',
    uv: 7892,
    pv: 4034,
  },
  {
    name: 'Dec',
    uv: 6344,
    pv: 5008,
  }
];

const CustomizedBar = (props) => {
  const { x, y, width, height, fill } = props; // 50
  const [hover, setHover] = useState(false);
  const barWidth = 30; // width of the brighter blue bar
  const offset = (width - barWidth) / 2; // calculate the offset to center the bar currently 15
  return <rect 
            x={x - offset - 33}
            y={y}
            width={barWidth}
            height={height}
            fill={hover ? 'rgba(34, 202, 236, 0.6)' : fill}
            onMouseOver={() => setHover(true)}
            onMouseOut={() => setHover(false)} 
          />;
};

const CustomBarChart = () => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart
        data={data}
        margin={{
          top: 20, right: 30, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="pv" fill="rgba(34, 202, 236, 0.3)" barSize={50} />
        <Bar dataKey="uv" fill="rgba(34, 202, 236, 1)" barSize={50} shape={<CustomizedBar />} />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default CustomBarChart;
