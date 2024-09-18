import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const BudgetSideBySideBarChart = ({ budgetData }) => {
  // Filter out null budgetItems
  const filteredData = budgetData.filter((item) => item.budgetItem);

  // Helper function to clean the budgetItem string
  const cleanBudgetItem = (budgetItem) => {
    // Remove "GL - XXXX" prefix and "GL" suffix
    return budgetItem
      .replace(/^GL - \d+\s*/, '') // Remove prefix
      .replace(/GL$/, '')          // Remove suffix
      .trim();                     // Remove any extra spaces
  };

  // Helper function to safely parse values
  const parseValue = (value) => (isNaN(parseFloat(value)) ? 0 : parseFloat(value));

  const months = [
    'january', 'february', 'march', 'april', 'may', 'june',
    'july', 'august', 'september', 'october', 'november', 'december',
  ];

  // Prepare the data for the side-by-side bar chart
  const chartData = months.map((month) => {
    const dataPoint = { name: month.charAt(0).toUpperCase() + month.slice(1) };
    filteredData.forEach((item) => {
      const budgetName = cleanBudgetItem(item.budgetItem);
      dataPoint[budgetName] = (dataPoint[budgetName] || 0) + parseValue(item[month]);
    });
    return dataPoint;
  });

  // Get unique budget item names
  const budgetItemNames = [
    ...new Set(filteredData.map((item) => cleanBudgetItem(item.budgetItem))),
  ];

  // Define colors for the bars
  const COLORS = [
    '#8884d8', '#82ca9d', '#ffc658', '#d0ed57',
    '#a4de6c', '#8dd1e1', '#83a6ed', '#ff7f50',
    '#a0522d', '#2e8b57', '#4682b4', '#6a5acd',
  ];

  const getColor = (index) => COLORS[index % COLORS.length];

  // Currency formatter
  const formatCurrency = (value) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={chartData} barCategoryGap="20%" barGap={1}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis tickFormatter={formatCurrency} width={100} />
        <Tooltip formatter={formatCurrency} />
        <Legend />
        {/* Dynamically create a Bar for each budget item */}
        {budgetItemNames.map((budgetName, index) => (
          <Bar
            key={budgetName}
            dataKey={budgetName}
            fill={getColor(index)}
            name={budgetName}
          />
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BudgetSideBySideBarChart;