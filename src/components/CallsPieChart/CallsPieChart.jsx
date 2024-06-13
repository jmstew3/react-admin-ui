import React from 'react';
import { PieChart, Pie, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import './callsPieChart.scss';


const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF6384', '#36A2EB', '#FFCE56', '#AFDCEC', '#F7464A', '#4D4D4D'];

const CallsPieChart = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <h2>Calls By City</h2>
      <PieChart>
        <Pie
          data={data}
          dataKey="calls"
          nameKey="city"
          cx="50%"
          cy="50%"
          outerRadius={150}
          fill="#8884d8"
          label
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default CallsPieChart;