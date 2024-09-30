import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import "./competitors.scss";

const Competitors = () => {
  const [competitors, setCompetitors] = useState([]);

  // Fetch data from the backend
  useEffect(() => {
    const fetchCompetitors = async () => {
      try {
        const response = await axios.get('http://localhost:9001/api/competitor-brands');
        setCompetitors(response.data);  // Set the fetched data to state
      } catch (error) {
        console.error('Error fetching competitor brands:', error);
      }
    };

    fetchCompetitors();
  }, []);  // Empty array ensures this effect runs once when the component mounts

  return (
    <div>
      <h1>Competitor Brands</h1>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Brand Name</TableCell>
              <TableCell>Type Value</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {competitors.map((competitor, index) => (
              <TableRow key={index}>
                <TableCell>{competitor.brand_name}</TableCell>
                <TableCell>{competitor.type_value}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Competitors;