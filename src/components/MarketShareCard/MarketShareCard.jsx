// MarketShareCard.jsx

import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

const MarketShareCard = ({ brandName, currentShare = 0, delta = 0 }) => {
  const isPositive = delta >= 0;
  const deltaIcon = isPositive ? (
    <ArrowUpwardIcon color="success" />
  ) : (
    <ArrowDownwardIcon color="error" />
  );

  return (
    <Card sx={{ minWidth: 200, margin: 1 }}>
      <CardContent>
        <Typography variant="h6" component="div">
          {brandName}
        </Typography>
        <Typography variant="h4" component="div">
          {(currentShare * 100).toFixed(2)}%
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {deltaIcon}
          <Typography color={isPositive ? "green" : "red"}>
            {Math.abs(delta * 100).toFixed(2)}%
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default MarketShareCard;