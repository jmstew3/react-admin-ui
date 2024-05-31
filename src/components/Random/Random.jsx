import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';

const data = [
  { name: 'Jul', value: 4000 },
  { name: 'Aug', value: 3000 },
  { name: 'Sep', value: 2000 },
  { name: 'Oct', value: 2780 },
  { name: 'Nov', value: 1890 },
];

const GradientBarChart = () => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#00C49F" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#0088FE" stopOpacity={0.8} />
          </linearGradient>
        </defs>
        <Bar dataKey="value" fill="url(#colorUv)" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default GradientBarChart;