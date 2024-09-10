import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const BudgetLineChart = ({ budgetData }) => {
  // Summing up the values for each month across all budget items
  const monthlySums = {
    january: 0,
    february: 0,
    march: 0,
    april: 0,
    may: 0,
    june: 0,
    july: 0,
    august: 0,
    september: 0,
    october: 0,
    november: 0,
    december: 0,
  };

  // Helper function to safely parse the values
  const parseValue = (value) => (isNaN(parseFloat(value)) ? 0 : parseFloat(value));

  // Calculate sums per month
  budgetData.forEach((item) => {
    monthlySums.january += parseValue(item.january);
    monthlySums.february += parseValue(item.february);
    monthlySums.march += parseValue(item.march);
    monthlySums.april += parseValue(item.april);
    monthlySums.may += parseValue(item.may);
    monthlySums.june += parseValue(item.june);
    monthlySums.july += parseValue(item.july);
    monthlySums.august += parseValue(item.august);
    monthlySums.september += parseValue(item.september);
    monthlySums.october += parseValue(item.october);
    monthlySums.november += parseValue(item.november);
    monthlySums.december += parseValue(item.december);
  });

  // Prepare data for the line chart
  const data = [
    { name: 'Jan', total: monthlySums.january },
    { name: 'Feb', total: monthlySums.february },
    { name: 'Mar', total: monthlySums.march },
    { name: 'Apr', total: monthlySums.april },
    { name: 'May', total: monthlySums.may },
    { name: 'June', total: monthlySums.june },
    { name: 'July', total: monthlySums.july },
    { name: 'Aug', total: monthlySums.august },
    { name: 'Sept', total: monthlySums.september },
    { name: 'Oct', total: monthlySums.october },
    { name: 'Nov', total: monthlySums.november },
    { name: 'Dec', total: monthlySums.december },
  ];

  // Currency formatter
  const formatCurrency = (value) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis 
          domain={[90000, 'auto']} 
          tickFormatter={formatCurrency} 
          width={100} // Increase width to prevent labels from being cut off
        />
        <Tooltip formatter={formatCurrency} />
        <Legend />
        <Line 
          type="monotone" 
          dataKey="total" 
          stroke="#8884d8" 
          strokeWidth={4} // Thicker line
          activeDot={{ r: 10 }} // Larger active dot
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default BudgetLineChart;