import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const BudgetTable = ({ budgetData }) => {
  const filteredData = budgetData.filter((item) => item.budgetItem); // Filter out null budgetItems

  // Helper function to clean the budgetItem string by removing the "GL - XXXX" prefix
  const cleanBudgetItem = (budgetItem) => {
    return budgetItem.replace(/^GL - \d+\s*/, ''); // Remove "GL - XXXX" prefix
  };

  // Currency formatter
  const formatCurrency = (value) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);

  // Calculate the sum for each month across all rows (for the bottom row)
  const columnSums = {
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

  // Add a function to safely parse and sum the values
  const parseValue = (value) => (isNaN(parseFloat(value)) ? 0 : parseFloat(value));

  return (
    <TableContainer component={Paper}>
      <Table aria-label="budget table">
        <TableHead>
          <TableRow>
            <TableCell>Budget Item</TableCell>
            <TableCell>Jan</TableCell>
            <TableCell>Feb</TableCell>
            <TableCell>Mar</TableCell>
            <TableCell>Apr</TableCell>
            <TableCell>May</TableCell>
            <TableCell>June</TableCell>
            <TableCell>July</TableCell>
            <TableCell>Aug</TableCell>
            <TableCell>Sept</TableCell>
            <TableCell>Oct</TableCell>
            <TableCell>Nov</TableCell>
            <TableCell>Dec</TableCell>
            <TableCell>Total</TableCell> {/* New column for row total */}
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredData.map((item, index) => {
            // Calculate the row total
            const rowTotal =
              parseValue(item.january) +
              parseValue(item.february) +
              parseValue(item.march) +
              parseValue(item.april) +
              parseValue(item.may) +
              parseValue(item.june) +
              parseValue(item.july) +
              parseValue(item.august) +
              parseValue(item.september) +
              parseValue(item.october) +
              parseValue(item.november) +
              parseValue(item.december);

            // Update the column sums
            columnSums.january += parseValue(item.january);
            columnSums.february += parseValue(item.february);
            columnSums.march += parseValue(item.march);
            columnSums.april += parseValue(item.april);
            columnSums.may += parseValue(item.may);
            columnSums.june += parseValue(item.june);
            columnSums.july += parseValue(item.july);
            columnSums.august += parseValue(item.august);
            columnSums.september += parseValue(item.september);
            columnSums.october += parseValue(item.october);
            columnSums.november += parseValue(item.november);
            columnSums.december += parseValue(item.december);

            return (
              <TableRow key={index}>
                <TableCell component="th" scope="row">{cleanBudgetItem(item.budgetItem)}</TableCell> {/* Cleaned budget item */}
                <TableCell>{formatCurrency(parseValue(item.january))}</TableCell>
                <TableCell>{formatCurrency(parseValue(item.february))}</TableCell>
                <TableCell>{formatCurrency(parseValue(item.march))}</TableCell>
                <TableCell>{formatCurrency(parseValue(item.april))}</TableCell>
                <TableCell>{formatCurrency(parseValue(item.may))}</TableCell>
                <TableCell>{formatCurrency(parseValue(item.june))}</TableCell>
                <TableCell>{formatCurrency(parseValue(item.july))}</TableCell>
                <TableCell>{formatCurrency(parseValue(item.august))}</TableCell>
                <TableCell>{formatCurrency(parseValue(item.september))}</TableCell>
                <TableCell>{formatCurrency(parseValue(item.october))}</TableCell>
                <TableCell>{formatCurrency(parseValue(item.november))}</TableCell>
                <TableCell>{formatCurrency(parseValue(item.december))}</TableCell>
                <TableCell>{formatCurrency(rowTotal)}</TableCell> {/* Display row total with currency */}
              </TableRow>
            );
          })}
          {/* Row for column totals */}
          <TableRow>
            <TableCell><strong>Total</strong></TableCell>
            <TableCell>{formatCurrency(columnSums.january)}</TableCell>
            <TableCell>{formatCurrency(columnSums.february)}</TableCell>
            <TableCell>{formatCurrency(columnSums.march)}</TableCell>
            <TableCell>{formatCurrency(columnSums.april)}</TableCell>
            <TableCell>{formatCurrency(columnSums.may)}</TableCell>
            <TableCell>{formatCurrency(columnSums.june)}</TableCell>
            <TableCell>{formatCurrency(columnSums.july)}</TableCell>
            <TableCell>{formatCurrency(columnSums.august)}</TableCell>
            <TableCell>{formatCurrency(columnSums.september)}</TableCell>
            <TableCell>{formatCurrency(columnSums.october)}</TableCell>
            <TableCell>{formatCurrency(columnSums.november)}</TableCell>
            <TableCell>{formatCurrency(columnSums.december)}</TableCell>
            <TableCell>
              {/* Sum of all column totals */}
              {formatCurrency(Object.values(columnSums).reduce((acc, sum) => acc + sum, 0))}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default BudgetTable;