import React from 'react';
import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';

const BarChartComposed = ({ data }) => {
  const renderBarTooltip = ({ payload }) => {
    if (payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div
          style={{
            backgroundColor: '#fff',
            padding: '10px',
            border: '1px solid #ccc',
          }}
        >
          <p>
            <strong>{data.brand_name}</strong>
          </p>
          <p>{`Total Search Volume: ${data.total_brand_search_volume.toLocaleString()}`}</p>
          <p>{`Budget Amount: $${data.amount.toLocaleString()}`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <ComposedChart
      width={1200}
      height={400}
      data={data}
      margin={{ top: 20, right: 80, left: 20, bottom: 5 }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="brand_name" />
      <YAxis yAxisId="left" />
      <YAxis yAxisId="right" orientation="right" />
      <Tooltip content={renderBarTooltip} />
      <Legend />
      <Bar
        yAxisId="left"
        dataKey="total_brand_search_volume"
        fill="#8884d8"
      />
      <Line
        yAxisId="right"
        type="monotone"
        dataKey="amount"
        stroke="#ff7300"
        strokeWidth={2}
      />
    </ComposedChart>
  );
};

export default BarChartComposed;