import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import "./historicalKeywords.scss";

const HistoricalKeywords = () => {
  const [historicalKeywords, setHistoricalKeywords] = useState([]);

  // Fetch data from the backend
  useEffect(() => {
    const fetchHistoricalKeywords = async () => {
      try {
        const response = await axios.get('http://localhost:9001/api/historical-keywords');
        setHistoricalKeywords(response.data);  // Set the fetched data to state
      } catch (error) {
        console.error('Error fetching historical keywords:', error);
      }
    };

    fetchHistoricalKeywords();
  }, []);  // Empty array ensures this effect runs once when the component mounts

  return (
    <div>
      <h1>Historical Keywords</h1>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Month</TableCell>
              <TableCell>DMA Name</TableCell>
              <TableCell>Total Search Volume</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {historicalKeywords.map((keywordData, index) => (
              <TableRow key={index}>
                <TableCell>{keywordData.month}</TableCell>  {/* Displaying the month */}
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