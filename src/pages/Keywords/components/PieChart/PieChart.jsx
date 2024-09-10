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

const processData = (data) => {
  const filteredData = data.filter(item => item.month == 7 && item.year == 2024);
  const groupedByTitle = {};

  filteredData.forEach(item => {
    const key = item.keyword_title;
    if (groupedByTitle[key]) {
      groupedByTitle[key].searchVolume += parseInt(item.month_year_search_volume, 10);
    } else {
      groupedByTitle[key] = {
        name: key,
        searchVolume: parseInt(item.month_year_search_volume, 10)
      };
    }
  });

  const sortedBrands = Object.values(groupedByTitle).sort((a, b) => b.searchVolume - a.searchVolume);
  const topBrands = sortedBrands.slice(0, 6);
  const otherBrands = sortedBrands.slice(6);
  const othersTotal = otherBrands.reduce((sum, brand) => sum + brand.searchVolume, 0);

  if (othersTotal > 0) {
    topBrands.push({
      name: 'Other',
      searchVolume: othersTotal
    });
  }

  return topBrands;
};

// Rename this to avoid conflict with Recharts PieChart
const CustomPieChart = ({ data }) => {
  const preparedData = processData(data);
  
  return (
    <div className="pie-chart">
      <h2>Apollo Market Share & Competitors | August 2024</h2>
      <ResponsiveContainer width="100%" height={400}>
        <RechartsPieChart>
          <Pie
            data={preparedData}
            dataKey="searchVolume"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={150}
            fill="#8884d8"
            label
          >
            {preparedData.map((entry, index) => (
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
