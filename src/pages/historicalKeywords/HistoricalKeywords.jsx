import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TableSortLabel, Select, MenuItem, FormControl, InputLabel, Box } from '@mui/material';
import { BarChart } from '@mui/x-charts/BarChart';
import "./historicalKeywords.scss";

const HistoricalKeywords = () => {
  const [historicalKeywords, setHistoricalKeywords] = useState([]);
  const [order, setOrder] = useState('asc');  // State for sort order
  const [orderBy, setOrderBy] = useState('month');  // State for sort column
  const [filterMonth, setFilterMonth] = useState('');  // State for month filter

  // Month mapping from number to name
  const monthNames = {
    1: "January",
    2: "February",
    3: "March",
    4: "April",
    5: "May",
    6: "June",
    7: "July",
    8: "August",
    9: "September",
    10: "October",
    11: "November",
    12: "December",
  };

  // Fetch data from the backend
  useEffect(() => {
    const fetchHistoricalKeywords = async () => {
      try {
        const response = await axios.get(
          "http://localhost:9001/api/historical-keywords"
        );
        setHistoricalKeywords(response.data); // Set the fetched data to state
      } catch (error) {
        console.error("Error fetching historical keywords:", error);
      }
    };

    fetchHistoricalKeywords();
  }, []); // Empty array ensures this effect runs once when the component mounts

  // Sort handling
  const handleRequestSort = (property) => {
    const isAscending = orderBy === property && order === "asc";
    setOrder(isAscending ? "desc" : "asc");
    setOrderBy(property);
  };

  // Handle month filter change
  const handleFilterChange = (event) => {
    setFilterMonth(event.target.value);
  };

  // Filtering the data
  const filteredKeywords = filterMonth
    ? historicalKeywords.filter(
        (keyword) => keyword.month === parseInt(filterMonth)
      )
    : historicalKeywords;

  // Sorting the data
  const sortedKeywords = [...filteredKeywords].sort((a, b) => {
    if (orderBy === "month") {
      return order === "asc" ? a.month - b.month : b.month - a.month;
    }
    if (orderBy === "dma_name") {
      return order === "asc"
        ? a.dma_name.localeCompare(b.dma_name)
        : b.dma_name.localeCompare(a.dma_name);
    }
    if (orderBy === "total_search_volume") {
      return order === "asc"
        ? a.total_search_volume - b.total_search_volume
        : b.total_search_volume - a.total_search_volume;
    }
    return 0;
  });

  // Prepare data for the bar chart
  const chartData = sortedKeywords.map((keywordData) => ({
    month: monthNames[keywordData.month],
    dma_name: keywordData.dma_name,
    total_search_volume: keywordData.total_search_volume,
  }));

  return (
    <div>
      <h1>Historical Keywords</h1>
      <FormControl variant="outlined" style={{ minWidth: 120, marginBottom: 20 }}>
        <InputLabel>Month</InputLabel>
        <Select
          value={filterMonth}
          onChange={handleFilterChange}
          label="Month"
          sx={{ backgroundColor: 'white' }}  // Set background color to white
        >
          <MenuItem value="">
            <em>All</em>
          </MenuItem>
          {Object.entries(monthNames).map(([monthNumber, monthName]) => (
            <MenuItem key={monthNumber} value={monthNumber}>
              {monthName}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Box sx={{ height: 400, marginBottom: 4 }}>
        <BarChart
          series={[
            {
              data: chartData.map(item => item.total_search_volume),
              label: 'Total Search Volume',
            },
          ]}
          xAxis={[
            {
              data: chartData.map(item => item.dma_name),
              label: 'DMA Name',
              scaleType: 'band',  // Set scaleType to 'band'
            },
          ]}
          yAxis={[
            {
              label: 'Total Search Volume',
            },
          ]}
        />
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'month'}
                  direction={orderBy === 'month' ? order : 'asc'}
                  onClick={() => handleRequestSort('month')}
                >
                  Month
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'dma_name'}
                  direction={orderBy === 'dma_name' ? order : 'asc'}
                  onClick={() => handleRequestSort('dma_name')}
                >
                  DMA Name
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'total_search_volume'}
                  direction={orderBy === 'total_search_volume' ? order : 'asc'}
                  onClick={() => handleRequestSort('total_search_volume')}
                >
                  Total Search Volume
                </TableSortLabel>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedKeywords.map((keywordData, index) => (
              <TableRow key={index}>
                <TableCell>{monthNames[keywordData.month]}</TableCell>  {/* Displaying the month */}
                <TableCell>{keywordData.dma_name}</TableCell>  {/* Displaying the DMA name */}
                <TableCell>{keywordData.total_search_volume}</TableCell>  {/* Displaying the total search volume */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default HistoricalKeywords;