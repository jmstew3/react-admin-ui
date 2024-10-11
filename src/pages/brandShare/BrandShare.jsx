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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
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
  const [selectedBrandIds, setSelectedBrandIds] = useState(["ALL"]);

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

  // Fetch available Brands and set selectedBrandIds
  useEffect(() => {
    const fetchAvailableBrands = async () => {
      try {
        const response = await axios.get(
          "http://localhost:9001/api/available-brands",
          { params: { dma_id: selectedDmaId } }
        );
        setAvailableBrands(response.data);

        // Reset selectedBrandIds to ["ALL"] whenever the DMA changes
        setSelectedBrandIds(["ALL"]);
      } catch (err) {
        console.error("Error fetching available brands:", err);
      }
    };

    if (selectedDmaId) {
      fetchAvailableBrands();
    }
  }, [selectedDmaId]);

  // Get selected DMA or Brand name
  const selectedDma = availableDmas.find((dma) => dma.dma_id === selectedDmaId);
  const selectedDmaName = selectedDma ? selectedDma.dma_name : "";
  const selectedBrands = availableBrands.filter((brand) =>
    selectedBrandIds.includes(brand.brand_id)
  );
  const selectedBrandNames = selectedBrands
    .map((brand) => brand.brand_name)
    .join(", ");

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

  const handleBrandIdsChange = (event) => {
  const {
    target: { value },
  } = event;

  setSelectedBrandIds((prevSelectedBrandIds) => {
    const selected = typeof value === "string" ? value.split(",") : value;

    if (selected.includes("ALL")) {
      if (selected.length === 1) {
        // Only "ALL" is selected
        return ["ALL"];
      } else {
        // "ALL" and other brands are selected
        if (!prevSelectedBrandIds.includes("ALL")) {
          // "ALL" was just selected, select only "ALL"
          return ["ALL"];
        } else {
          // "ALL" was deselected, remove "ALL" from selection
          const newSelection = selected.filter((val) => val !== "ALL");
          return newSelection;
        }
      }
    }

    // If selection is empty, default to ["ALL"]
    if (selected.length === 0) {
      return ["ALL"];
    }

    // Set selected brands
    return selected;
  });
};

  useEffect(() => {
    if (selectedDmaId === null || selectedMonth === null) return;

    const fetchData = async () => {
      setIsLoading(true);
      try {
        const params = {
          month: selectedMonth,
          dma_id: selectedDmaId,
        };

        if (!selectedBrandIds.includes("ALL")) {
          params.brand_ids = selectedBrandIds.join(",");
        }

        const response = await axios.get(
          "http://localhost:9001/api/brand-share-data",
          { params }
        );

        const data = response.data;

        // Process data as needed
        setBrandShares(
          data.brandShares.map((item) => ({
            ...item,
            brand_share: parseFloat(item.brand_share),
            total_dma_search_volume: parseFloat(item.total_dma_search_volume),
          }))
        );
        setTotalDmaSearchVolumeData({
          currentTotal:
            data.totalDmaSearchVolumeData?.current_total_search_volume || 0,
          deltaPercentage: data.totalDmaSearchVolumeData?.deltaPercentage || 0,
        });
        setCompetitorShareData({
          currentShare:
            data.competitorSearchVolumeData?.current_competitor_search_volume ||
            0,
          delta: data.competitorSearchVolumeData?.delta || 0,
        });
        setMarketShareData(data.marketShareData);

        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [selectedMonth, selectedDmaId, selectedBrandIds]);

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
        <FormControl sx={{ m: 1, width: 300 }}>
          <InputLabel id="brand-select-label">Select Brand</InputLabel>
          <Select
            labelId="brand-select-label"
            id="brand-select"
            multiple
            value={selectedBrandIds}
            onChange={handleBrandIdsChange}
            renderValue={(selected) => {
              if (selected.includes("ALL")) {
                return "ALL";
              }
              return availableBrands
                .filter((brand) => selected.includes(brand.brand_id))
                .map((brand) => brand.brand_name)
                .join(", ");
            }}
          >
            <MenuItem key="ALL" value="ALL">
              <Checkbox checked={selectedBrandIds.includes("ALL")} />
              <ListItemText primary="ALL" />
            </MenuItem>
            {availableBrands.map((brand) => (
              <MenuItem key={brand.brand_id} value={brand.brand_id}>
                <Checkbox checked={selectedBrandIds.includes(brand.brand_id)} />
                <ListItemText primary={brand.brand_name} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {isLoading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Error loading data</div>
      ) : brandShares.length > 0 ? (
        <>
          {/* UI Components */}
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
      ) : (
        <div>No data available.</div>
      )}
    </Box>
  );
};

export default BrandShare;
