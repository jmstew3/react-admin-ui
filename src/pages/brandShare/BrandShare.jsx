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
  Tooltip as RechartsTooltip,
  Legend,
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

import MarketShareCard from "../../components/MarketShareCard/MarketShareCard";
import TotalMarketCard from "../../components/TotalMarketCard/TotalMarketCard";
import BarChartComposed from "../../components/BarChartComposed/BarChartComposed";

const COLORS = [
  "#F78C6B", // 1 Coral
  "#83D483", // 2 Light Green
  "#9B5DE5", // 3 Purple
  "#FFD166", // 4 Yellow
  "#F15BB5", // 5 Pink
  "#118AB2", // 6 Blue
  "#06D6A0", // 7 Green
  "#EF476F", // 8 Red
  "#00F5D4", // 9 Turquoise
  "#FF006E", // 10 Hot Pink
  "#33A1FD", // 11 Teal Blue
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
  const [budgetsData, setBudgetsData] = useState([]); // Added state for budgets data
  const [combinedChartData, setCombinedChartData] = useState([]); // Added state for combined data
  const [marketShareData, setMarketShareData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get the current month number (1-12)
  const currentMonth = new Date().getMonth() + 1;
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [selectedDmaId, setSelectedDmaId] = useState(null); // Initialize as null

  const [availableMonths, setAvailableMonths] = useState([]);
  const [availableDmas, setAvailableDmas] = useState([]);

  const [competitorShareData, setCompetitorShareData] = useState({
    currentShare: 0,
    delta: 0,
  });

  const [totalDmaSearchVolumeData, setTotalDmaSearchVolumeData] = useState({
    currentTotal: 0,
    deltaPercentage: 0,
  });

  // Fetch available months
  useEffect(() => {
    const fetchAvailableMonths = async () => {
      try {
        const response = await axios.get(
          "http://localhost:9001/api/available-months"
        );
        const sortedMonths = response.data.sort((a, b) => a.month - b.month);
        setAvailableMonths(sortedMonths);
        // Optionally set default month to the first available month
        // setSelectedMonth(sortedMonths[0]?.month);
      } catch (err) {
        console.error("Error fetching available months:", err);
      }
    };

    fetchAvailableMonths();
  }, []);

  // Fetch available DMAs and set selectedDmaId
  useEffect(() => {
    const fetchAvailableDmas = async () => {
      try {
        const response = await axios.get(
          "http://localhost:9001/api/available-dmas"
        );
        setAvailableDmas(response.data);

        // After fetching DMAs, set selectedDmaId
        // Preferably set to 40 if it exists, else first DMA's ID
        const defaultDma = response.data.find((dma) => dma.dma_id === 40);
        if (defaultDma) {
          setSelectedDmaId(defaultDma.dma_id);
        } else if (response.data.length > 0) {
          setSelectedDmaId(response.data[0].dma_id);
        }
      } catch (err) {
        console.error("Error fetching available DMAs:", err);
      }
    };

    fetchAvailableDmas();
  }, []);

  // Get selected DMA name
  const selectedDma = availableDmas.find((dma) => dma.dma_id === selectedDmaId);
  const selectedDmaName = selectedDma ? selectedDma.dma_name : "";

  // Fetch brand shares data
  useEffect(() => {
    if (selectedDmaId === null) return; // Don't fetch if DMA ID is not set

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
        console.error("Error fetching brand shares:", err);
      }
    };

    fetchBrandShares();
  }, [selectedMonth, selectedDmaId]);

  // Fetch data for the bar chart
  useEffect(() => {
    if (selectedDmaId === null) return; // Don't fetch if DMA ID is not set

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
            brand_id: item.brand_id, // Ensure brand_id is included
          }))
        );
      } catch (err) {
        console.error("Error fetching brand search volumes:", err);
      }
    };

    fetchBrandSearchVolumes();
  }, [selectedMonth, selectedDmaId]);

  // Fetch budget data
  useEffect(() => {
    const fetchBudgetsData = async () => {
      try {
        const response = await axios.get("http://localhost:9001/api/budgets", {
          params: { month: selectedMonth, dma_id: selectedDmaId },
        });
        setBudgetsData(response.data);
      } catch (err) {
        console.error("Error fetching budgets data:", err);
      }
    };

    if (selectedDmaId) {
      fetchBudgetsData();
    }
  }, [selectedMonth, selectedDmaId]);

  // Merge brandSearchVolumes and budgetsData
  useEffect(() => {
    if (brandSearchVolumes.length > 0) {
      const mergedData = brandSearchVolumes.map((bsv) => {
        const budget = budgetsData.find((b) => b.brand_id === bsv.brand_id);
        return {
          ...bsv,
          amount: budget ? budget.amount : 0,
        };
      });
      setCombinedChartData(mergedData);
    } else {
      setCombinedChartData([]);
    }
  }, [brandSearchVolumes, budgetsData]);

  // Fetch market share data and compute competitor share
  useEffect(() => {
    if (selectedDmaId === null) return; // Don't fetch if DMA ID is not set

    const fetchMarketShareData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:9001/api/brand-market-share",
          {
            params: { month: selectedMonth, dma_id: selectedDmaId },
          }
        );
        console.log("Market Share Data Response:", response.data);

        const data = response.data.map((item) => ({
          ...item,
          current_brand_share: parseFloat(item.current_brand_share),
          previous_brand_share: parseFloat(item.previous_brand_share),
          delta: parseFloat(item.delta),
        }));

        setMarketShareData(data);

        // Compute total TurnPoint share
        const totalTurnPointShare = data.reduce(
          (sum, item) => sum + item.current_brand_share,
          0
        );
        const totalPreviousTurnPointShare = data.reduce(
          (sum, item) => sum + item.previous_brand_share,
          0
        );

        // Compute competitor share
        const competitorShare = 1 - totalTurnPointShare;
        const previousCompetitorShare = 1 - totalPreviousTurnPointShare;
        const competitorDelta = competitorShare - previousCompetitorShare;

        // Set competitor share data
        setCompetitorShareData({
          currentShare: competitorShare,
          delta: competitorDelta,
        });
      } catch (err) {
        console.error("Error fetching market share data:", err);
      }
    };

    fetchMarketShareData();
  }, [selectedMonth, selectedDmaId]);

  // Fetch total DMA search volume data
  useEffect(() => {
    if (selectedDmaId === null) return; // Don't fetch if DMA ID is not set

    const fetchTotalDmaSearchVolume = async () => {
      try {
        const response = await axios.get(
          "http://localhost:9001/api/total-dma-search-volume",
          {
            params: { month: selectedMonth, dma_id: selectedDmaId },
          }
        );

        const currentTotal =
          parseFloat(response.data.current_total_search_volume) || 0;
        const previousTotal =
          parseFloat(response.data.previous_total_search_volume) || 0;

        // Calculate delta percentage
        const deltaPercentage =
          previousTotal !== 0
            ? (currentTotal - previousTotal) / previousTotal
            : 0;

        setTotalDmaSearchVolumeData({
          currentTotal,
          deltaPercentage,
        });
      } catch (err) {
        console.error("Error fetching total DMA search volume data:", err);
      }
    };

    fetchTotalDmaSearchVolume();
  }, [selectedMonth, selectedDmaId]);

  const handleMonthChange = (e) => {
    setSelectedMonth(Number(e.target.value));
  };

  const handleDmaIdChange = (e) => {
    setSelectedDmaId(Number(e.target.value));
  };

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

  const renderBarTooltip = ({ payload }) => {
    if (payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div
          style={{
            backgroundColor: "#fff",
            padding: "10px",
            border: "1px solid #ccc",
          }}
        >
          <p>
            <strong>{data.brand_name}</strong>
          </p>
          <p>{`Total Search Volume: ${data.total_brand_search_volume.toLocaleString()}`}</p>
          <p>{`Budget Amount: $${data.amount.toLocaleString()}`}</p>
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
      <Box sx={{ marginBottom: 2, display: "flex", alignItems: "center" }}>
        <label style={{ marginRight: "10px" }}>Select Month:</label>
        <select value={selectedMonth} onChange={handleMonthChange}>
          {availableMonths.map((monthObj) => (
            <option key={monthObj.month} value={monthObj.month}>
              {monthNames[monthObj.month - 1]}
            </option>
          ))}
        </select>

        <label style={{ margin: "0 10px" }}>Select DMA:</label>
        <select value={selectedDmaId || ""} onChange={handleDmaIdChange}>
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
          {/* Total Market Card */}
          <TotalMarketCard
            key="total-market"
            title={`Total Market Google Demand for ${selectedDmaName}`}
            currentValue={totalDmaSearchVolumeData.currentTotal}
            deltaPercentage={totalDmaSearchVolumeData.deltaPercentage}
          />

          {/* Competitor Share Card */}
          <MarketShareCard
            key="competitor-share"
            brandName="Competitor Share"
            currentShare={competitorShareData.currentShare}
            delta={competitorShareData.delta}
          />

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
              <PieChart width={700} height={500}>
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
                <RechartsTooltip content={renderTooltip} />
                <Legend />
              </PieChart>
            </Box>
          </Box>
          {/* Use the BarChartComposed */}
          {combinedChartData.length > 0 ? (
            <Box sx={{ width: "100%", marginTop: 4 }}>
              <BarChartComposed data={combinedChartData} />
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
