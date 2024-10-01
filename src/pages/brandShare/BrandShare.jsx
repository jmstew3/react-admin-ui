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
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import MarketShareCard from "../../components/MarketShareCard/MarketShareCard";

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
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const BrandShare = () => {
  const [brandShares, setBrandShares] = useState([]);
  const [brandSearchVolumes, setBrandSearchVolumes] = useState([]);
  const [marketShareData, setMarketShareData] = useState([]);
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

  // Fetch brand shares data
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
        console.log("API Response (Brand Shares):", response.data);
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

  // Fetch data for the bar chart
  useEffect(() => {
    const fetchBrandSearchVolumes = async () => {
      try {
        const response = await axios.get(
          "http://localhost:9001/api/brand-search-volume",
          {
            params: { month: selectedMonth, dma_id: selectedDmaId },
          }
        );
        console.log("API Response (Brand Search Volumes):", response.data);
        setBrandSearchVolumes(
          response.data.map((item) => ({
            ...item,
            total_brand_search_volume: parseFloat(
              item.total_brand_search_volume
            ),
          }))
        );
      } catch (err) {
        console.error("Error fetching brand search volumes:", err);
      }
    };

    fetchBrandSearchVolumes();
  }, [selectedMonth, selectedDmaId]);

  // Fetch market share data for tombstones
  useEffect(() => {
    const fetchMarketShareData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:9001/api/brand-market-share",
          {
            params: { month: selectedMonth, dma_id: selectedDmaId },
          }
        );
        console.log("Market Share Data Response:", response.data); // Added console.log
        setMarketShareData(
          response.data.map((item) => ({
            ...item,
            current_brand_share: parseFloat(item.current_brand_share),
            previous_brand_share: parseFloat(item.previous_brand_share),
            delta: parseFloat(item.delta),
          }))
        );
      } catch (err) {
        console.error("Error fetching market share data:", err);
      }
    };

    fetchMarketShareData();
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

  // Debugging: Log marketShareData before rendering
  console.log("MarketShareData in Render:", marketShareData);

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

      {/* Tombstone Cards */}
      {marketShareData.length > 0 ? (
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            marginBottom: 2,
          }}
        >
          {marketShareData.map((item) => (
            <MarketShareCard
              key={item.brand_id}
              brandName={item.brand_name}
              currentShare={item.current_brand_share}
              delta={item.delta}
            />
          ))}
        </Box>
      ) : (
        <div>No market share data available.</div>
      )}

      {/* Conditional rendering based on data state */}
      {isLoading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Error loading data</div>
      ) : !brandShares.length ? (
        <div>No data available.</div>
      ) : (
        // Render the table and pie chart only if data is available
        <>
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
                        <TableCell>
                          {row.total_dma_search_volume.toLocaleString()}
                        </TableCell>
                        <TableCell>
                          {(row.brand_share * 100).toFixed(2)}%
                        </TableCell>
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

          {/* Bar Chart */}
          {brandSearchVolumes.length > 0 ? (
            <Box sx={{ width: "100%", marginTop: 4 }}>
              <BarChart
                width={800}
                height={400}
                data={brandSearchVolumes}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="brand_name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="total_brand_search_volume" fill="#8884d8" />
              </BarChart>
            </Box>
          ) : (
            <div>No data available for the bar chart.</div>
          )}
        </>
      )}
    </Box>
  );
};

export default BrandShare;