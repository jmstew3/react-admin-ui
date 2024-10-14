import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TableSortLabel,
} from '@mui/material';

const BrandShareTable = ({ brandShares, totalSearchVolume, totalBrandShare }) => {
  const [order, setOrder] = useState('desc'); // Default sorting order set to 'desc'
  const [orderBy, setOrderBy] = useState('brand_share'); // Default sorting by "Brand Share" column

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  // Comparator function for sorting
  const comparator = (a, b) => {
    let valueA = a[orderBy];
    let valueB = b[orderBy];

    // Handle percentage values for "Brand Share"
    if (orderBy === 'brand_share') {
      valueA = parseFloat(valueA);
      valueB = parseFloat(valueB);
    }

    // Convert strings to uppercase for case-insensitive comparison
    if (typeof valueA === 'string') {
      valueA = valueA.toUpperCase();
    }
    if (typeof valueB === 'string') {
      valueB = valueB.toUpperCase();
    }

    if (valueA < valueB) {
      return order === 'asc' ? -1 : 1;
    }
    if (valueA > valueB) {
      return order === 'asc' ? 1 : -1;
    }
    return 0;
  };

  // Sort the data
  const sortedBrandShares = [...brandShares].sort(comparator);

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {/* Table Headers with sorting functionality */}
            <TableCell>
              <TableSortLabel
                active={orderBy === 'brand_name'}
                direction={orderBy === 'brand_name' ? order : 'desc'}
                onClick={() => handleRequestSort('brand_name')}
              >
                Brand Name
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={orderBy === 'dma_name'}
                direction={orderBy === 'dma_name' ? order : 'desc'}
                onClick={() => handleRequestSort('dma_name')}
              >
                DMA Name
              </TableSortLabel>
            </TableCell>
            <TableCell align="right">
              <TableSortLabel
                active={orderBy === 'total_dma_search_volume'}
                direction={orderBy === 'total_dma_search_volume' ? order : 'desc'}
                onClick={() => handleRequestSort('total_dma_search_volume')}
              >
                Total DMA Search Volume
              </TableSortLabel>
            </TableCell>
            <TableCell align="right">
              <TableSortLabel
                active={orderBy === 'brand_share'}
                direction={orderBy === 'brand_share' ? order : 'desc'}
                onClick={() => handleRequestSort('brand_share')}
              >
                Brand Share
              </TableSortLabel>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedBrandShares.map((row) => (
            <TableRow key={`${row.brand_name}-${row.dma_name}`}>
              <TableCell>{row.brand_name}</TableCell>
              <TableCell>{row.dma_name}</TableCell>
              <TableCell align="right">
                {(row.total_dma_search_volume || 0).toLocaleString()}
              </TableCell>
              <TableCell align="right">
                {(row.brand_share * 100).toFixed(2)}%
              </TableCell>
            </TableRow>
          ))}

          {/* Totals Row */}
          <TableRow>
            <TableCell colSpan={2} sx={{ fontWeight: 'bold' }}>
              Totals
            </TableCell>
            <TableCell align="right" sx={{ fontWeight: 'bold' }}>
              {totalSearchVolume.toLocaleString()}
            </TableCell>
            <TableCell align="right" sx={{ fontWeight: 'bold' }}>
              {(totalBrandShare * 100).toFixed(2)}%
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default BrandShareTable;