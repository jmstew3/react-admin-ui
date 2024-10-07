// BrandShare.jsx
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

import MarketShareCard from "../../components/MarketShareCard/MarketShareCard";
import TotalMarketCard from "../../components/TotalMarketCard/TotalMarketCard";
import BarChartComponent from "../../components/muix/BarChartComponent/BarChartComponent";
import PieChartComponent from "../../components/recharts/PieChartComponent/PieChartComponent";

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
  const [budgetsData, setBudgetsData] = useState([]);
  const [combinedChartData, setCombinedChartData] = useState([]);
  const [marketShareData, setMarketShareData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get the current month number (1-12)
  const currentMonth = new Date().getMonth() + 1;
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [selectedDmaId, setSelectedDmaId] = useState(null);

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

        // Set default DMA ID
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

  // Fetch all data using the unified endpoint
  useEffect(() => {
    if (selectedDmaId === null) return;

    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          "http://localhost:9001/api/brand-share-data",
          {
            params: { month: selectedMonth, dma_id: selectedDmaId },
          }
        );
        const data = response.data;

        // Set the state variables
        setBrandShares(
          data.brandShares.map((item) => ({
            ...item,
            brand_share: parseFloat(item.brand_share),
            total_dma_search_volume: parseFloat(item.total_dma_search_volume),
          }))
        );

        setBrandSearchVolumes(
          data.brandSearchVolumes.map((item) => ({
            ...item,
            total_brand_search_volume: parseFloat(
              item.total_brand_search_volume
            ),
            brand_id: item.brand_id,
          }))
        );

        setBudgetsData(data.budgetsData);

        // Process combined chart data
        processCombinedChartData(data.brandSearchVolumes, data.budgetsData);

        // Compute competitor share and set market share data
        computeCompetitorShare(data.marketShareData);

        // Set total DMA search volume data
        const currentTotal =
          parseFloat(
            data.totalDmaSearchVolumeData.current_total_search_volume
          ) || 0;
        const previousTotal =
          parseFloat(
            data.totalDmaSearchVolumeData.previous_total_search_volume
          ) || 0;

        const deltaPercentage =
          previousTotal !== 0
            ? (currentTotal - previousTotal) / previousTotal
            : 0;

        setTotalDmaSearchVolumeData({
          currentTotal,
          deltaPercentage,
        });

        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [selectedMonth, selectedDmaId]);

  // Function to process combined chart data
  const processCombinedChartData = (brandSearchVolumes, budgetsData) => {
    // Aggregate budget amounts by brand_id
    const aggregatedBudgets = budgetsData.reduce((acc, budget) => {
      if (!acc[budget.brand_id]) {
        acc[budget.brand_id] = 0;
      }
      acc[budget.brand_id] += parseFloat(budget.amount);
      return acc;
    }, {});

    // Merge brandSearchVolumes and aggregatedBudgets
    if (brandSearchVolumes.length > 0) {
      const mergedData = brandSearchVolumes.map((bsv) => {
        const budgetAmount = aggregatedBudgets[bsv.brand_id] || 0;
        return {
          ...bsv,
          amount: budgetAmount,
        };
      });
      setCombinedChartData(mergedData);
    } else {
      setCombinedChartData([]);
    }
  };

  // Function to compute competitor share
  const computeCompetitorShare = (marketShareData) => {
    const data = marketShareData.map((item) => ({
      ...item,
      current_brand_share: parseFloat(item.current_brand_share),
      previous_brand_share: parseFloat(item.previous_brand_share),
      delta: parseFloat(item.delta),
    }));

    setMarketShareData(data);

    const totalTurnPointShare = data.reduce(
      (sum, item) => sum + item.current_brand_share,
      0
    );
    const totalPreviousTurnPointShare = data.reduce(
      (sum, item) => sum + item.previous_brand_share,
      0
    );

    const competitorShare = 1 - totalTurnPointShare;
    const previousCompetitorShare = 1 - totalPreviousTurnPointShare;
    const competitorDelta = competitorShare - previousCompetitorShare;

    setCompetitorShareData({
      currentShare: competitorShare,
      delta: competitorDelta,
    });
  };

  const handleMonthChange = (e) => {
    setSelectedMonth(Number(e.target.value));
  };

  const handleDmaIdChange = (e) => {
    setSelectedDmaId(Number(e.target.value));
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
              <PieChartComponent data={brandShares} />
            </Box>
          </Box>
          {combinedChartData.length > 0 ? (
            <Box sx={{ width: "100%", marginTop: 4 }}>
              <BarChartComponent data={combinedChartData} />
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