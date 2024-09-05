import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Typography } from '@mui/material';

const ApolloBudgetChart: React.FC = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://legitrix-api-7de7446c8b7e.herokuapp.com/api/v1/budgets/brand/budgets/apollohome');
        setData(response.data.budget);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch data', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  const aggregateMonthlyData = () => {
    const months = [
      'january', 'february', 'march', 'april', 'may', 'june', 
      'july', 'august', 'september', 'october', 'november', 'december'
    ];

    const aggregatedData = months.map(month => {
      const monthSum = data.reduce((sum, item) => sum + parseInt(item[month] || '0', 10), 0);
      return { month: month.charAt(0).toUpperCase() + month.slice(1), amount: monthSum };
    });

    return aggregatedData;
  };

  const chartData = aggregateMonthlyData();

  return (
    <div style={{ width: '100%', height: 500 }}>
      <Typography variant="h4" component="h2" style={{ textAlign: 'center', marginBottom: '20px' }}>
        2024 Marketing Budget
      </Typography>
      <ResponsiveContainer>
        <LineChart
          data={chartData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis domain={[90000, 111500]} />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="amount" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ApolloBudgetChart;