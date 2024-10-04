import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip as RechartsTooltip,
  Legend,
} from 'recharts';

const COLORS = [
  '#F78C6B', // 1 Coral
  '#83D483', // 2 Light Green
  '#9B5DE5', // 3 Purple
  '#FFD166', // 4 Yellow
  '#F15BB5', // 5 Pink
  '#118AB2', // 6 Blue
  '#06D6A0', // 7 Green
  '#EF476F', // 8 Red
  '#00F5D4', // 9 Turquoise
  '#FF006E', // 10 Hot Pink
  '#33A1FD', // 11 Teal Blue
];

const PieChartComponent = ({ data }) => {
  const renderLabel = ({ name }) => name;

  const renderTooltip = ({ payload }) => {
    if (payload && payload.length) {
      const { name, value } = payload[0];
      return (
        <div>
          <p>{name}</p>
          <p>{`Brand Share: ${(value * 100).toFixed(2)}%`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <PieChart width={700} height={500}>
      <Pie
        data={data}
        dataKey="brand_share"
        nameKey="brand_name"
        cx="50%"
        cy="50%"
        outerRadius={150}
        fill="#8884d8"
        label={renderLabel}
      >
        {data.map((entry, index) => (
          <Cell
            key={`cell-${index}`}
            fill={COLORS[index % COLORS.length]}
          />
        ))}
      </Pie>
      <RechartsTooltip content={renderTooltip} />
      <Legend />
    </PieChart>
  );
};

export default PieChartComponent;