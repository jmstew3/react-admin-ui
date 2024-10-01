import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#8dd1e1", "#d0ed57"];

const BrandShare = () => {
  const [brandShares, setBrandShares] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBrandShares = async () => {
      try {
        const response = await axios.get("http://localhost:9001/api/brand-share", {
          params: { month: 8 },  // Pass Month as query parameter
        });
        console.log("API Response:", response.data);  // Log to check response data
        setBrandShares(response.data.map(item => ({
          ...item,
          brand_share: parseFloat(item.brand_share)
        })));
        setIsLoading(false);
      } catch (err) {
        setError(err);
        setIsLoading(false);
      }
    };

    fetchBrandShares();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading data</div>;
  }

  if (!brandShares.length) {
    return <div>No data available.</div>;
  }

  console.log("Brand Shares Data for Pie Chart:", brandShares); // Debugging

  const renderLabel = ({ name }) => name;

  const renderTooltip = ({ payload }) => {
    if (payload && payload.length) {
      const { name, value } = payload[0];
      return (
        <div>
          <p>{name}</p>
          <p>{`Brand Share: ${(value * 100).toFixed(2)}%`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <Box sx={{ display: 'flex', height: 'auto', width: '100%' }}>
      <Box sx={{ flex: 1, marginRight: 4 }}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Brand Name</TableCell>
                <TableCell>DMA Name</TableCell>
                <TableCell>Total DMA Search Volume</TableCell>
                <TableCell>Brand Share</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {brandShares.map((row) => (
                <TableRow key={row.brand_name + row.dma_name}>
                  <TableCell>{row.brand_name}</TableCell>
                  <TableCell>{row.dma_name}</TableCell>
                  <TableCell>{row.total_dma_search_volume}</TableCell>
                  <TableCell>{(row.brand_share * 100).toFixed(2)}%</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <PieChart width={700} height={400}>
          <Pie
            data={brandShares}
            dataKey="brand_share"
            nameKey="brand_name"
            cx="50%"
            cy="50%"
            outerRadius={150}
            fill="#8884d8"
            label={renderLabel}
          >
            {brandShares.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip content={renderTooltip} />
          <Legend />
        </PieChart>
      </Box>
    </Box>
  );
};

export default BrandShare;