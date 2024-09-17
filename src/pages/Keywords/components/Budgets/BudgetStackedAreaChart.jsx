import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const BudgetStackedAreaChart = ({ budgetData }) => {
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

  // List of months with abbreviations
  const months = [
    { full: 'january', abbrev: 'JAN' },
    { full: 'february', abbrev: 'FEB' },
    { full: 'march', abbrev: 'MAR' },
    { full: 'april', abbrev: 'APR' },
    { full: 'may', abbrev: 'MAY' },
    { full: 'june', abbrev: 'JUN' },
    { full: 'july', abbrev: 'JUL' },
    { full: 'august', abbrev: 'AUG' },
    { full: 'september', abbrev: 'SEP' },
    { full: 'october', abbrev: 'OCT' },
    { full: 'november', abbrev: 'NOV' },
    { full: 'december', abbrev: 'DEC' },
  ];

  // Prepare the data for the stacked area chart with abbreviated months
  const chartData = months.map((month) => {
    const dataPoint = { name: month.abbrev }; // Use abbreviated month names
    filteredData.forEach((item) => {
      const budgetName = cleanBudgetItem(item.budgetItem);
      dataPoint[budgetName] = (dataPoint[budgetName] || 0) + parseValue(item[month.full]);
    });
    return dataPoint;
  });

  // Get unique budget item names
  const budgetItemNames = [
    ...new Set(filteredData.map((item) => cleanBudgetItem(item.budgetItem))),
  ];

  // Define custom colors to match the pie chart
  const COLORS = {
    "Amazon": "#8884d8",        // Blue
    "Audience Targeting": "#82ca9d",  // Green
    "MadHive": "#ff7f50",       // Orange
    "Shoppers Suite": "#6a5acd",  // Purple
    "Broadcast": "#ffc658",     // Yellow
    "Radio": "#8dd1e1",         // Light Blue
    "Billboards": "#a4de6c",    // Light Green
    "OTT": "#83a6ed",           // Light Blue
    "Cable": "#d0ed57",         // Light Yellow
    "Email Conquest": "#ffc658" // Orange (or customize as needed)
  };

  // Currency formatter
  const formatCurrency = (value) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);

  return (
    <ResponsiveContainer width="100%" height={400}>
      <AreaChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis tickFormatter={formatCurrency} width={100} />
        <Tooltip formatter={formatCurrency} />
        <Legend />
        {/* Dynamically create an Area for each budget item */}
        {budgetItemNames.map((budgetName) => (
          <Area
            key={budgetName}
            type="monotone"
            dataKey={budgetName}
            stackId="a"
            stroke={COLORS[budgetName] || '#8884d8'}
            fill={COLORS[budgetName] || '#8884d8'}
            name={budgetName}
          />
        ))}
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default BudgetStackedAreaChart;