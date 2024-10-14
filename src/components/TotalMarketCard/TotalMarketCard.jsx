import React from "react";
import { Box, ThemeProvider, createTheme } from "@mui/material";
import { Card, CardContent, Typography } from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

// Define a custom theme to apply black text (as per your code)
const theme = createTheme({
  palette: {
    text: {
      primary: "#000000",
    },
  },
});

const TotalMarketCard = ({ title, currentValue, deltaPercentage }) => {
  const isPositive = deltaPercentage >= 0;

  // Adjust triangleStyle to point up or down based on isPositive
  const triangleStyle = {
    width: 0,
    height: 0,
    borderLeft: "5px solid transparent",
    borderRight: "5px solid transparent",
    ...(isPositive
      ? { borderBottom: "10px solid green" } // Arrow pointing up
      : { borderTop: "10px solid #d32f2f" }), // Arrow pointing down
  };

  return (
    <ThemeProvider theme={theme}>
      <Card sx={{ minWidth: 150, maxWidth: 350, margin: 1 }}>
        <CardContent>
          <Typography variant="h8" component="div" color="text.primary">
            {title}
          </Typography>
          <Typography variant="h5" component="div" color="text.primary">
            {Number(currentValue).toLocaleString()}
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box sx={triangleStyle} />
            <Typography
              sx={{ marginLeft: 0.5 }}
              color={isPositive ? "success.main" : "error.main"}
            >
              {Math.abs(deltaPercentage).toFixed(2)}% vs previous period
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </ThemeProvider>
  );
};

export default TotalMarketCard;