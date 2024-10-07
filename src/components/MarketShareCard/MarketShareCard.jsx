import React from "react";
import { Box, ThemeProvider, createTheme } from "@mui/material";
import { Card, CardContent, Typography } from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

// Define a custom theme to apply white text
const theme = createTheme({
  palette: {
    text: {
      primary: "#000000", // Set the primary text to white
    },
  },
});

const MarketShareCard = ({ brandName, currentShare, delta }) => {
  const isPositive = delta >= 0;
  const deltaIcon = isPositive ? (
    <ArrowUpwardIcon color="success" />
  ) : (
    <ArrowDownwardIcon color="error" />
  );

  return (
    <ThemeProvider theme={theme}>
      <Card sx={{ minWidth: 150, margin: 1 }}>
        <CardContent>
          <Typography variant="h8" component="div" color="text.primary">
            {brandName}
          </Typography>
          <Typography variant="h5" component="div" color="text.primary">
            {(currentShare * 100).toFixed(2)}%
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            {deltaIcon}
            <Typography
              sx={{ marginLeft: 0.5 }}
              color={isPositive ? "success.main" : "error.main"}
            >
              {Math.abs(delta * 100).toFixed(2)}% vs previous period
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </ThemeProvider>
  );
};

export default MarketShareCard;