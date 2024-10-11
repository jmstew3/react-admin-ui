import { Box, ThemeProvider, createTheme } from "@mui/material";
import { ResponsiveChartContainer } from "@mui/x-charts/ResponsiveChartContainer";
import { LinePlot } from "@mui/x-charts/LineChart";
import { BarPlot } from "@mui/x-charts/BarChart";
import { ChartsXAxis } from "@mui/x-charts/ChartsXAxis";
import { ChartsYAxis } from "@mui/x-charts/ChartsYAxis";
import { axisClasses } from "@mui/x-charts/ChartsAxis";

// Define a custom theme to apply white text
const theme = createTheme({
  palette: {
    text: {
      primary: "#FFFFFF", // Set the primary text to white
    },
  },
});

const BarChartComponent = ({ data, maxSearchVolume, yAxisInterval }) => {
  console.log("Data received by BarChartComponent:", data);

  // Extract brands, search volumes, and budgets
  const brands = data.map((item) => item.brand_name);
  const searchVolumes = data.map((item) => item.total_brand_search_volume);
  const budgets = data.map((item) => item.amount);

  // Use default values if props are not provided
  const effectiveMaxSearchVolume =
    maxSearchVolume && maxSearchVolume > 0 ? maxSearchVolume : 15000;
  const yAxisTickInterval = yAxisInterval || 2500;

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ width: "100%", maxWidth: 1400 }}>
        <ResponsiveChartContainer
          xAxis={[
            {
              scaleType: "band",
              data: brands,
              id: "brands",
              label: "Brands",
            },
          ]}
          yAxis={[
            {
              id: "searchVolume",
              min: 0,
              max: effectiveMaxSearchVolume,
              tickInterval: yAxisTickInterval,
            },
            {
              id: "amount",
              position: "right",
              // You can set min and max for amount if needed
            },
          ]}
          series={[
            {
              type: "bar",
              id: "searchVolume",
              yAxisId: "searchVolume",
              xAxisId: "brands",
              data: searchVolumes,
              tooltip: {
                formatter: (value) => `Total Search Volume: ${value.toLocaleString()}`,
              },
            },
            {
              type: "line",
              id: "amount",
              yAxisId: "amount",
              xAxisId: "brands",
              data: budgets,
              tooltip: {
                formatter: (value) => `Marketing Budget: ${value.toLocaleString()}`,
              },
            },
          ]}
          height={400}
          margin={{ left: 70, right: 70 }}
          sx={{
            [`.${axisClasses.left} .${axisClasses.label}`]: {
              transform: "translate(-25px, 0)",
              fill: "white",
              color: "white",
            },
            [`.${axisClasses.right} .${axisClasses.label}`]: {
              transform: "translate(30px, 0)",
              fill: "white",
              color: "white",
            },
            [`.${axisClasses.bottom} .${axisClasses.label}`]: {
              fill: "white",
              color: "white",
            },
          }}
        >
          <BarPlot />
          <LinePlot />
          <ChartsXAxis axisId="brands" label="Brands" />
          <ChartsYAxis
            axisId="searchVolume"
            label="Total Search Volume"
            tickInterval={yAxisTickInterval}
          />
          <ChartsYAxis
            axisId="amount"
            position="right"
            label="Marketing Budget"
          />
        </ResponsiveChartContainer>
      </Box>
    </ThemeProvider>
  );
};

export default BarChartComponent;