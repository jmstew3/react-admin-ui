import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

const data = [
  {
    name: 'Brand A', marketShare: 18.94, avgBrandSearches: 4000, Key: 1
  },
  {
    name: 'Brand B', marketShare: 10.12, avgBrandSearches: 3000,
  },
  // Add more data points here
];

const CustomBarChart = () => (
  <ResponsiveContainer width="100%" height={500}>
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
      <Bar dataKey="marketShare" stackId="a" fill="#8884d8" />
      <Bar dataKey="avgBrandSearches" stackId="a" fill="#82ca9d" />
    </BarChart>
  </ResponsiveContainer>
);

export default CustomBarChart;
