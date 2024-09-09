import React from 'react';
import { PieChart as RechartsPieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';


// Pie chart colors
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A28ACB', '#FF9999', '#84D9D2'];

// Custom tooltip for the pie chart
const renderCustomPieTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const { name, searchVolume } = payload[0].payload;
    return (
      <div className="custom-tooltip">
        <p>{`${name}: ${searchVolume}`}</p>
      </div>
    );
  }
  return null;
};

// Rename this to avoid conflict with Recharts PieChart
const CustomPieChart = ({ data }) => {
  return (
    <div className="pie-chart">
      <h2>Apollo Market Share & Competitors | August 2024</h2>
      <ResponsiveContainer width="100%" height={400}>
        <RechartsPieChart>
          <Pie
            data={data}
            dataKey="searchVolume"
            nameKey="name"
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
          <Tooltip content={renderCustomPieTooltip} />
          <Legend />
        </RechartsPieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomPieChart;
