import React from 'react';
import { ComposedChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const CallsBarChart = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <h2>Calls By City</h2>
      <ComposedChart
        data={data}
        margin={{
          top: 20, right: 30, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="city" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="calls" barSize={70} fill="#8884D8" name="Calls" />
      </ComposedChart>
    </ResponsiveContainer>
  );
};

export default CallsBarChart;