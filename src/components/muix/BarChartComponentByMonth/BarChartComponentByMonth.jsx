// BarChartComponentByMonth.jsx
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

const BarChartComponentByMonth = ({ data }) => {
  // Add a console log to verify data
  console.log("Data received by BarChartComponentByMonth:", data);

  const brands = data.map((item) => item.brand_name);
  const searchVolumes = data.map((item) =>
    parseFloat(item.total_brand_search_volume)
  );
  const budgets = data.map((item) => parseFloat(item.amount));

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
          yAxis={[{ id: "searchVolume" }, { id: "amount" }]}
          series={[
            {
              type: "bar",
              id: "searchVolume",
              yAxisId: "searchVolume",
              xAxisId: "brands",
              data: searchVolumes,
            },
            {
              type: "line",
              id: "amount",
              yAxisId: "amount",
              xAxisId: "brands",
              data: budgets,
            },
          ]}
          height={400}
          margin={{ left: 70, right: 70 }}
          sx={{
            [`.${axisClasses.left} .${axisClasses.label}`]: {
              transform: "translate(-25px, 0)",
              fill: "white", // Left Y axis label color
              color: "white", // Left Y axis ticks color
            },
            [`.${axisClasses.right} .${axisClasses.label}`]: {
              transform: "translate(30px, 0)",
              fill: "white", // Right Y axis label color
              color: "white", // Right Y axis ticks color
            },
            [`.${axisClasses.bottom} .${axisClasses.label}`]: {
              fill: "white", // X axis label color
              color: "white", // X axis ticks color
            },
          }}
        >
          <BarPlot />
          <LinePlot />
          <ChartsXAxis axisId="brands" label="Brands" />
          <ChartsYAxis axisId="searchVolume" label="Total Search Volume" />
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

export default BarChartComponentByMonth;
