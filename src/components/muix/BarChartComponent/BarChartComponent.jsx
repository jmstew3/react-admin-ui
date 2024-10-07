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

const BarChartComponent = ({ data }) => {
  const brandNames = data.map((item) => item.brand_name);
  const searchVolumes = data.map((item) => item.total_brand_search_volume);
  const amounts = data.map((item) => item.amount);

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ width: "100%", maxWidth: 1400 }}>
        <ResponsiveChartContainer
          xAxis={[
            {
              scaleType: "band",
              data: brandNames,
              id: "brands",
              label: "Brands",
            },
          ]}
          yAxis={[{ id: "searchVolume" }, { id: "amount" }]}
          series={[
            {
              type: "line",
              id: "amount",
              yAxisId: "amount",
              data: amounts,
            },
            {
              type: "bar",
              id: "searchVolume",
              yAxisId: "searchVolume",
              data: searchVolumes,
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
          <ChartsXAxis axisId="brands" label="Market Brands" />
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

export default BarChartComponent;
