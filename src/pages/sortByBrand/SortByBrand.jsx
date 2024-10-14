import React, { useState, useEffect } from 'react';
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
} from '@mui/material';

import MarketShareCard from '../../components/MarketShareCard/MarketShareCard';
import TotalMarketCard from '../../components/TotalMarketCard/TotalMarketCard';
import BarChartComponent from '../../components/muix/BarChartComponent/BarChartComponent';
import PieChartComponent from '../../components/recharts/PieChartComponent/PieChartComponent';
import BrandShareTable from '../../components/BrandShareTable/BrandShareTable'; // Import the new component

// Month names array
const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const BrandShare = () => {
  // ... (rest of your state and useEffect hooks remain unchanged)

  // Calculate the total DMA Search Volume
  const totalSearchVolume = brandShares.reduce(
    (sum, row) => sum + (row.total_dma_search_volume || 0),
    0
  );

  // Calculate the total Brand Share
  const totalBrandShare = brandShares.reduce(
    (sum, row) => sum + (row.brand_share || 0),
    0
  );

  // ... (rest of your functions and useEffects remain unchanged)

  return (
    <Box sx={{ padding: 2 }}>
      {/* Dropdowns for Month, DMA, and Brand ID */}
      <Box sx={{ marginBottom: 4, display: 'flex', alignItems: 'center' }}>
        {/* Select Month */}
        <FormControl sx={{ m: 1, width: 300 }}>
          <InputLabel id="month-select-label">Select Month</InputLabel>
          <Select
            labelId="month-select-label"
            id="month-select"
            value={selectedMonth}
            onChange={handleMonthChange}
            label="Select Month"
            sx={{
              backgroundColor: '#f5f5f5',
              '& .MuiSelect-select': {
                padding: '10px',
              },
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: '#007BFF',
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: '#0056b3',
              },
            }}
          >
            {availableMonths.map((monthObj) => (
              <MenuItem key={monthObj.month} value={monthObj.month}>
                {monthNames[monthObj.month - 1]}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Select DMA */}
        <FormControl sx={{ m: 1, width: 300 }}>
          <InputLabel id="dma-select-label">Select DMA</InputLabel>
          <Select
            labelId="dma-select-label"
            id="dma-select"
            value={selectedDmaId || ''}
            onChange={handleDmaIdChange}
            label="Select DMA"
            sx={{
              backgroundColor: '#f5f5f5',
              '& .MuiSelect-select': {
                padding: '10px',
              },
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: '#007BFF',
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: '#0056b3',
              },
            }}
          >
            {availableDmas.map((dma) => (
              <MenuItem key={dma.dma_id} value={dma.dma_id}>
                {dma.dma_name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Select Brand */}
        <FormControl sx={{ m: 1, width: 300 }}>
          <InputLabel id="brand-select-label">Select Brand</InputLabel>
          <Select
            labelId="brand-select-label"
            id="brand-select"
            multiple
            value={selectedBrandIds}
            onChange={handleBrandIdsChange}
            renderValue={(selected) => {
              if (selected.includes('ALL')) {
                return 'ALL';
              }
              return availableBrands
                .filter((brand) => selected.includes(brand.brand_id))
                .map((brand) => brand.brand_name)
                .join(', ');
            }}
            sx={{
              backgroundColor: '#f5f5f5',
              '& .MuiSelect-select': {
                padding: '10px',
              },
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: '#007BFF',
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: '#0056b3',
              },
            }}
          >
            <MenuItem key="ALL" value="ALL">
              <Checkbox checked={selectedBrandIds.includes('ALL')} />
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
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              marginBottom: 2,
            }}
          >
            <TotalMarketCard
              key="total-market"
              title={`Total Google Demand for ${selectedDmaName}`}
              currentValue={totalDmaSearchVolumeData.currentTotal}
              deltaPercentage={totalDmaSearchVolumeData.deltaPercentage}
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

          <Box sx={{ display: 'flex', height: 'auto', width: '100%' }}>
            <Box sx={{ flex: 1, marginRight: 4 }}>
              {/* Use the new BrandShareTable component */}
              <BrandShareTable
                brandShares={brandShares}
                totalSearchVolume={totalSearchVolume}
                totalBrandShare={totalBrandShare}
              />
            </Box>
            <Box
              sx={{
                flex: 1,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <PieChartComponent data={brandShares} />
            </Box>
          </Box>

          <Box sx={{ width: '100%', marginTop: 4 }}>
            <BarChartComponent
              data={combinedChartData}
              maxSearchVolume={effectiveMaxSearchVolume}
              yAxisInterval={2500}
            />
          </Box>
        </>
      ) : (
        <div>No data available.</div>
      )}
    </Box>
  );
};

export default BrandShare;