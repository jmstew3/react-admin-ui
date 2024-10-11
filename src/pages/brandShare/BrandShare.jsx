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
import BarChartComponentByMonth from "../../components/muix/BarChartComponentByMonth/BarChartComponentByMonth";
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
  const [selectedBrandId, setSelectedBrandId] = useState(null);
  const [viewType, setViewType] = useState("dma"); // "dma" or "brand"

  const [availableMonths, setAvailableMonths] = useState([]);
  const [availableDmas, setAvailableDmas] = useState([]);
  const [availableBrands, setAvailableBrands] = useState([]);

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

  // Fetch available Brands and set selectedBrandId
  useEffect(() => {
    const fetchAvailableBrands = async () => {
      try {
        const response = await axios.get(
          "http://localhost:9001/api/available-brands"
        );
        setAvailableBrands(response.data);

        // Set default Brand ID
        if (response.data.length > 0) {
          setSelectedBrandId(response.data[0].brand_id);
        }
      } catch (err) {
        console.error("Error fetching available brands:", err);
      }
    };

    fetchAvailableBrands();
  }, []);

  // Get selected DMA or Brand name
  const selectedDma = availableDmas.find((dma) => dma.dma_id === selectedDmaId);
  const selectedDmaName = selectedDma ? selectedDma.dma_name : "";
  const selectedBrand = availableBrands.find(
    (brand) => brand.brand_id === selectedBrandId
  );
  const selectedBrandName = selectedBrand ? selectedBrand.brand_name : "";

  // Fetch all data using the unified endpoint
  useEffect(() => {
    if (
      (viewType === "dma" && selectedDmaId === null) ||
      (viewType === "brand" && selectedBrandId === null) ||
      selectedMonth === null
    )
      return;

    const fetchData = async () => {
      setIsLoading(true);
      try {
        let response;
        if (viewType === "dma") {
          response = await axios.get(
            "http://localhost:9001/api/brand-share-data",
            {
              params: { month: selectedMonth, dma_id: selectedDmaId },
            }
          );
        } else if (viewType === "brand") {
          response = await axios.get(
            "http://localhost:9001/api/brand-share-data-by-brand",
            {
              params: { month: selectedMonth, brand_id: selectedBrandId },
            }
          );
        }

        const data = response.data;

        if (viewType === "dma") {
          // Handle DMA-specific data
          setBrandShares(
            data.brandShares.map((item) => ({
              ...item,
              brand_share: parseFloat(item.brand_share),
              total_dma_search_volume: parseFloat(item.total_dma_search_volume),
            }))
          );
          setTotalDmaSearchVolumeData({
            currentTotal: data.totalDmaSearchVolumeData?.current_total_search_volume || 0,
            deltaPercentage: data.totalDmaSearchVolumeData?.deltaPercentage || 0,
          });
          setCompetitorShareData({
            currentShare: data.competitorSearchVolumeData?.current_competitor_search_volume || 0,
            delta: data.competitorSearchVolumeData?.delta || 0,
          });
          setMarketShareData(data.marketShareData);
        } else if (viewType === "brand") {
          // Handle brand-specific data
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
          processCombinedChartData(data.brandSearchVolumes, data.budgetsData);
        }

        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [selectedMonth, selectedDmaId, selectedBrandId, viewType]);

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

  const handleMonthChange = (e) => {
    setSelectedMonth(Number(e.target.value));
  };

  const handleDmaIdChange = (e) => {
    setSelectedDmaId(Number(e.target.value));
  };

  const handleBrandIdChange = (e) => {
    setSelectedBrandId(Number(e.target.value));
  };

  const handleViewChange = (e) => {
    setViewType(e.target.value);
  };

  return (
    <Box sx={{ padding: 2 }}>
      {/* Dropdowns for Month, View Type, and DMA/Brand ID */}
      <Box sx={{ marginBottom: 2, display: "flex", alignItems: "center" }}>
        <label style={{ marginRight: "10px" }}>Select Month:</label>
        <select value={selectedMonth} onChange={handleMonthChange}>
          {availableMonths.map((monthObj) => (
            <option key={monthObj.month} value={monthObj.month}>
              {monthNames[monthObj.month - 1]}
            </option>
          ))}
        </select>

        <label style={{ margin: "0 10px" }}>View Type:</label>
        <select value={viewType} onChange={handleViewChange}>
          <option value="dma">View by DMA</option>
          <option value="brand">View by Brand</option>
        </select>

        {viewType === "dma" && (
          <>
            <label style={{ margin: "0 10px" }}>Select DMA:</label>
            <select value={selectedDmaId || ""} onChange={handleDmaIdChange}>
              {availableDmas.map((dma) => (
                <option key={dma.dma_id} value={dma.dma_id}>
                  {dma.dma_name}
                </option>
              ))}
            </select>
          </>
        )}

        {viewType === "brand" && (
          <>
            <label style={{ margin: "0 10px" }}>Select Brand:</label>
            <select value={selectedBrandId || ""} onChange={handleBrandIdChange}>
              {availableBrands.map((brand) => (
                <option key={brand.brand_id} value={brand.brand_id}>
                  {brand.brand_name}
                </option>
              ))}
            </select>
          </>
        )}
      </Box>

      {/* Conditional rendering based on data state */}
      {isLoading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Error loading data</div>
      ) : viewType === "dma" && brandShares.length > 0 ? (
        <>
          {/* DMA-specific UI */}
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              marginBottom: 2,
            }}
          >
            <TotalMarketCard
              key="total-market"
              title={`Total Google Demand for ${selectedDmaName}`}
              currentValue={totalDmaSearchVolumeData.currentTotal || 0}
              deltaPercentage={totalDmaSearchVolumeData.deltaPercentage || 0}
            />

            <MarketShareCard
              key="competitor-share"
              brandName="Competitor Share"
              currentShare={competitorShareData.currentShare || 0}
              delta={competitorShareData.delta || 0}
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
                          {(row.total_dma_search_volume || 0).toLocaleString()}
                        </TableCell>
                        <TableCell>
                          {(row.brand_share * 100).toFixed(2)}%
                        </TableCell>
                      </TableRow>
                    ))}
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

          <Box sx={{ width: "100%", marginTop: 4 }}>
            <BarChartComponentByMonth data={combinedChartData} />
          </Box>
        </>
      ) : viewType === "brand" && combinedChartData.length > 0 ? (
        <>
          {/* Brand-specific UI */}
          <Box sx={{ width: "100%", marginTop: 4 }}>
            <BarChartComponent data={combinedChartData} />
          </Box>
        </>
      ) : (
        <div>No data available.</div>
      )}
    </Box>
  );
};

export default BrandShare;
