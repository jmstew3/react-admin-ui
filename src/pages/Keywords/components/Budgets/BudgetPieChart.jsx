import React, { useEffect } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const BudgetPieChart = ({ budgetData }) => {
  // Guard clause to ensure budgetData exists
  if (!budgetData || budgetData.length === 0) {
    return <p>No budget data available</p>;
  }

  // Helper function to clean the budgetItem string
  const cleanBudgetItem = (budgetItem) => {
    // Remove "GL - XXXX" prefix and "GL" suffix
    return budgetItem
      .replace(/^GL - \d+\s*/, '') // Remove prefix
      .replace(/GL$/, '')          // Remove suffix
      .trim();                     // Remove any extra spaces
  };

  // Filter out invalid budget items (null or undefined) and items with a $0 total
  const filteredData = budgetData
    .filter(item => item.budgetItem) // Filter out null or undefined budgetItem
    .map(item => ({
      name: cleanBudgetItem(item.budgetItem), // Use the same cleanBudgetItem function
      total: Object.keys(item).reduce((sum, month) => {
        if ([
          'january', 'february', 'march', 'april', 'may', 'june',
          'july', 'august', 'september', 'october', 'november', 'december'
        ].includes(month)) {
          return sum + parseFloat(item[month] || 0); // Handle empty or invalid values
        }
        return sum;
      }, 0),
    }))
    .filter(item => item.total > 0); // Filter out items with total equal to or less than zero

  // Debugging: Log filtered data to check if it's being computed correctly
  useEffect(() => {
    console.log('Filtered Data:', filteredData);
  }, [filteredData]);

  // Define colors for the pie chart
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A28EFF', '#FF6384', '#36A2EB', '#FFCE56'];

  // Currency formatter
  const formatCurrency = (value) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);

  return (
    <ResponsiveContainer width="100%" height={400}>
      <PieChart>
        <Pie
          data={filteredData}
          dataKey="total"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={150}
          innerRadius={80} // Add some inner radius for a donut chart style
          fill="#8884d8"
          paddingAngle={5} // Add padding between slices
          label={({ name, total }) => `${name}: ${formatCurrency(total)}`} // Use cleaned name for the label
        >
          {filteredData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip formatter={value => formatCurrency(value)} />
        <Legend 
          layout="horizontal" // Move legend below the chart
          verticalAlign="bottom"
          align="center"
          formatter={(value) => cleanBudgetItem(value)} // Use cleaned name for the legend
        />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default BudgetPieChart;