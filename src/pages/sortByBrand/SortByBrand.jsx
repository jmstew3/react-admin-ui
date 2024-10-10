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

const SortByBrand = () => {
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
  const [selectedBrandId, setSelectedBrandId] = useState(null);

  const [availableMonths, setAvailableMonths] = useState([]);
  const [availableBrands, setAvailableBrands] = useState([]);

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

  // Fetch available brands and set selectedBrandId
  useEffect(() => {
    const fetchAvailableBrands = async () => {
      try {
        const response = await axios.get(
          "http://localhost:9001/api/available-brands"
        );
        if (response.data && response.data.length > 0) {
          setAvailableBrands(response.data);

          // Set default Brand ID
          setSelectedBrandId(response.data[0].brand_id);
        }
      } catch (err) {
        console.error("Error fetching available brands:", err);
      }
    };

    fetchAvailableBrands();
  }, []);

  // Get selected Brand name
  const selectedBrand = availableBrands.find(
    (brand) => brand.brand_id === selectedBrandId
  );
  const selectedBrandName = selectedBrand ? selectedBrand.brand_name : "";

  // Fetch all data using the unified endpoint
  useEffect(() => {
    if (selectedBrandId === null || selectedMonth === null) return;

    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          "http://localhost:9001/api/brand-share-data-by-brand",
          {
            params: { month: selectedMonth, brand_id: selectedBrandId },
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
            total_brand_search_volume: parseFloat(item.total_brand_search_volume),
            brand_id: item.brand_id,
          }))
        );

        setBudgetsData(data.budgetsData);

        // Process combined chart data
        processCombinedChartData(data.brandSearchVolumes, data.budgetsData);

        setMarketShareData(data.marketShareData);

        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [selectedMonth, selectedBrandId]);

  // Function to process combined chart data
  const processCombinedChartData = (brandSearchVolumes, budgetsData) => {
    // Aggregate budget amounts by month for the selected brand
    const monthlyData = monthNames.map((month, index) => {
      const searchVolume = brandSearchVolumes.find(
        (item) => item.month === index + 1
      )?.total_brand_search_volume || 0;
      const budgetAmount = budgetsData.find(
        (budget) => budget.month === index + 1
      )?.amount || 0;

      return {
        month,
        total_brand_search_volume: searchVolume,
        amount: budgetAmount,
      };
    });

    setCombinedChartData(monthlyData);
  };

  const handleMonthChange = (e) => {
    setSelectedMonth(Number(e.target.value));
  };

  const handleBrandIdChange = (e) => {
    setSelectedBrandId(Number(e.target.value));
  };

  return (
    <Box sx={{ padding: 2 }}>
      {/* Dropdowns for Month and Brand ID */}
      <Box sx={{ marginBottom: 2, display: "flex", alignItems: "center" }}>
        <label style={{ marginRight: "10px" }}>Select Month:</label>
        <select value={selectedMonth} onChange={handleMonthChange}>
          {availableMonths.map((monthObj) => (
            <option key={monthObj.month} value={monthObj.month}>
              {monthNames[monthObj.month - 1]}
            </option>
          ))}
        </select>

        <label style={{ margin: "0 10px" }}>Select Brand:</label>
        <select value={selectedBrandId || ""} onChange={handleBrandIdChange}>
          {availableBrands.length > 0 ? (
            availableBrands.map((brand) => (
              <option key={brand.brand_id} value={brand.brand_id}>
                {brand.brand_name}
              </option>
            ))
          ) : (
            <option value="" disabled>
              No brands available
            </option>
          )}
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
            title={`Total Google Demand for ${selectedBrandName}`}
            currentValue={brandShares.reduce(
              (sum, row) => sum + row.total_dma_search_volume,
              0
            )}
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
                      <TableCell>Total DMA Search Volume</TableCell>
                      <TableCell>Brand Share</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {brandShares.map((row) => (
                      <TableRow key={row.brand_name}>
                        <TableCell>{row.brand_name}</TableCell>
                        <TableCell>
                          {row.total_dma_search_volume.toLocaleString()}
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
          {combinedChartData.length > 0 ? (
            <Box sx={{ width: "100%", marginTop: 4 }}>
              <BarChartComponentByMonth data={combinedChartData} />
            </Box>
          ) : (
            <div>No data available for the bar chart.</div>
          )}
        </>
      )}
    </Box>
  );
};

export default SortByBrand;