// TotalMarketCard.jsx

import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

const TotalMarketCard = ({ title, currentValue, deltaPercentage }) => {
  const isPositive = deltaPercentage >= 0;
  const deltaIcon = isPositive ? (
    <ArrowUpwardIcon color="success" />
  ) : (
    <ArrowDownwardIcon color="error" />
  );

  return (
    <Card sx={{ minWidth: 250, margin: 1 }}>
      <CardContent>
        <Typography variant="h6" component="div" gutterBottom>
          {title}
        </Typography>
        <Typography variant="h4" component="div">
          {currentValue.toLocaleString()}
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", marginTop: 1 }}>
          {deltaIcon}
          <Typography color={isPositive ? "green" : "red"} sx={{ marginLeft: 0.5 }}>
            {(Math.abs(deltaPercentage) * 100).toFixed(2)}% vs previous period
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default TotalMarketCard;