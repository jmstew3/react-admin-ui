import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Custom Tooltip for Bar Chart
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p className="label">{`Month/Year: ${label}`}</p>
        <p className="intro">{`Total Search Volume: ${payload[0].value}`}</p>
      </div>
    );
  }
  return null;
};

const aggregateData = (data) => {
  const aggregated = {};

  data.forEach(item => {
    const key = `${item.month}/${item.year}`;  // Ensure these are the correct property names
    if (aggregated[key]) {
      aggregated[key].searchVolume += parseInt(item.month_year_search_volume, 10);
    } else {
      aggregated[key] = {
        monthYear: key,
        searchVolume: parseInt(item.month_year_search_volume, 10)
      };
    }
  });

  return Object.values(aggregated);
};

const CustomBarChart = ({ data }) => {
  const processedData = aggregateData(data);
  
  return (
    <div className="bar-chart">
      <h1 style={{ fontSize:"20px" }}>Apollo Monthly Search Volume (Jan 2020 - Aug 2024)</h1>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={processedData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="monthYear"
            tick={{ fontSize: 12, angle: -45, textAnchor: 'end' }}
          />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="searchVolume" fill="#8884d8" />
          {/* <Bar dataKey="searchVolume" fill="#0c5cd4" /> */}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomBarChart;
