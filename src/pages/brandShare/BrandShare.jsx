import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const COLORS = [
  "#8884d8",
  "#82ca9d",
  "#ffc658",
  "#ff8042",
  "#8dd1e1",
  "#d0ed57",
];

// Month names array
const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const BrandShare = () => {
  const [brandShares, setBrandShares] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get the current month number (1-12)
  const currentMonth = new Date().getMonth() + 1;
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [selectedDmaId, setSelectedDmaId] = useState(40); // Default DMA ID

  const [availableMonths, setAvailableMonths] = useState([]);
  const [availableDmas, setAvailableDmas] = useState([]);

  // Fetch available months
  useEffect(() => {
    axios.get("http://localhost:9001/api/available-months").then((response) => {
      const sortedMonths = response.data.sort((a, b) => a.month - b.month);
      setAvailableMonths(sortedMonths);
      // Optionally set default month to the first available month
      // setSelectedMonth(sortedMonths[0]?.month);
    });
  }, []);

  // Fetch available DMAs
  useEffect(() => {
    axios.get("http://localhost:9001/api/available-dmas").then((response) => {
      setAvailableDmas(response.data);
    });
  }, []);

  useEffect(() => {
    const fetchBrandShares = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          "http://localhost:9001/api/brand-share",
          {
            params: { month: selectedMonth, dma_id: selectedDmaId },
          }
        );
        console.log("API Response:", response.data);
        setBrandShares(
          response.data.map((item) => ({
            ...item,
            brand_share: parseFloat(item.brand_share),
            total_dma_search_volume: parseFloat(item.total_dma_search_volume),
          }))
        );
        setIsLoading(false);
      } catch (err) {
        setError(err);
        setIsLoading(false);
      }
    };

    fetchBrandShares();
  }, [selectedMonth, selectedDmaId]);

  const handleMonthChange = (e) => {
    setSelectedMonth(Number(e.target.value));
  };

  const handleDmaIdChange = (e) => {
    setSelectedDmaId(Number(e.target.value));
  };

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

  // Calculate totals based on the displayed data
  const totalSearchVolume = brandShares.reduce(
    (sum, row) => sum + row.total_dma_search_volume,
    0
  );
  const totalBrandShare = brandShares.reduce(
    (sum, row) => sum + row.brand_share,
    0
  );

  return (
    <Box sx={{ padding: 2 }}>
      {/* Dropdowns for Month and DMA ID */}
      <Box sx={{ marginBottom: 2 }}>
        <label style={{ marginRight: "10px" }}>Select Month:</label>
        <select value={selectedMonth} onChange={handleMonthChange}>
          {availableMonths.map((monthObj) => (
            <option key={monthObj.month} value={monthObj.month}>
              {monthNames[monthObj.month - 1]}
            </option>
          ))}
        </select>

        <label style={{ margin: "0 10px" }}>Select DMA:</label>
        <select value={selectedDmaId} onChange={handleDmaIdChange}>
          {availableDmas.map((dma) => (
            <option key={dma.dma_id} value={dma.dma_id}>
              {dma.dma_name}
            </option>
          ))}
        </select>
      </Box>

      {/* Conditional rendering based on data state */}
      {isLoading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Error loading data</div>
      ) : !brandShares.length ? (
        <div>No data available.</div>
      ) : (
        // Render the table and pie chart only if data is available
        <Box sx={{ display: "flex", height: "auto", width: "100%" }}>
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
                      <TableCell>{row.total_dma_search_volume.toLocaleString()}</TableCell>
                      <TableCell>{(row.brand_share * 100).toFixed(2)}%</TableCell>
                    </TableRow>
                  ))}
                  <TableRow>
                    <TableCell colSpan={2}>
                      <strong>Total</strong>
                    </TableCell>
                    <TableCell>
                      <strong>{totalSearchVolume.toLocaleString()}</strong>
                    </TableCell>
                    <TableCell>
                      <strong>{(totalBrandShare * 100).toFixed(2)}%</strong>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
          <Box
            sx={{
              flex: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
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
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip content={renderTooltip} />
              <Legend />
            </PieChart>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default BrandShare;