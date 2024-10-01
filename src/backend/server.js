import express from "express";
import mysql from "mysql2";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = 9001;

// Use CORS middleware
app.use(cors());

// MySQL Database configuration
const dbConfig = {
  host: process.env.DB_HOST, // e.g., 'localhost' or your database host
  user: process.env.DB_USER, // MySQL username
  password: process.env.DB_PASSWORD, // MySQL password
  database: process.env.DB_DATABASE, // MySQL database name
};

let connection;

function handleDisconnect() {
  connection = mysql.createConnection(dbConfig);

  connection.connect((err) => {
    if (err) {
      console.error("Error connecting to MySQL:", err);
      setTimeout(handleDisconnect, 2000); // Retry connection after 2 seconds
    } else {
      console.log("Connected to MySQL");
    }
  });

  connection.on("error", (err) => {
    console.error("Database error:", err);
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
      handleDisconnect(); // Reconnect if connection is lost
    } else {
      throw err;
    }
  });
}

handleDisconnect();

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.get("/api/competitor-brands", (req, res) => {
  const query = `
    SELECT b.brand_name, t.type_value
    FROM brands b
    JOIN type t ON b.type_id = t.type_id
    WHERE t.type_value = 'TP Competitor';
  `;

  if (connection.state === "disconnected") {
    handleDisconnect();
  }

  connection.query(query, (err, results) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).json({ error: "Error fetching competitor brands" });
    } else {
      res.json(results);
    }
  });
});

app.get("/api/historical-keywords", (_, res) => {
  const query = `
    SELECT 
        km.month,
        d.dma_name,
        SUM(km.search_volume) AS total_search_volume
    FROM 
        keyword_metrics km
    JOIN 
        dmas d ON km.dma_id = d.dma_id
    GROUP BY 
        km.month, d.dma_name
    ORDER BY 
        km.month, d.dma_name;
  `;

  if (connection.state === "disconnected") {
    handleDisconnect();
  }

  connection.query(query, (err, results) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).json({ error: "Error fetching historical keywords" });
    } else {
      res.json(results);
    }
  });
});

app.get("/api/brand-share", (req, res) => {
  // Extract month and dma_id from query parameters
  const month = req.query.month;
  const dma_id = req.query.dma_id;

  // Check if month and dma_id are provided
  if (!month || !dma_id) {
    return res.status(400).json({ error: "month and dma_id are required query parameters" });
  }

  // Update your SQL query to use placeholders
  const query = `
    SELECT 
      b.brand_name,
      d.dma_name,
      SUM(k.search_volume) AS total_dma_search_volume,
      SUM(k.search_volume) * 1.0 / (
        SELECT SUM(search_volume) 
        FROM keyword_metrics 
        WHERE dma_id = ? AND month = ?
      ) AS brand_share
    FROM 
      brands b
    JOIN 
      keyword_metrics k ON b.brand_id = k.brand_id
    JOIN 
      dmas d ON k.dma_id = d.dma_id
    WHERE 
      k.dma_id = ? AND k.month = ?
    GROUP BY 
      b.brand_name, d.dma_name, k.dma_id;
  `;

  // Parameters for the SQL query
  const params = [dma_id, month, dma_id, month];

  if (connection.state === "disconnected") {
    handleDisconnect();
  }

  // Execute the query with parameters to prevent SQL injection
  connection.query(query, params, (err, results) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).json({ error: "Error fetching keyword share" });
    } else {
      res.json(results);
    }
  });
});

// Move these endpoint definitions outside of the /api/brand-share endpoint
// Endpoint to get available months
app.get("/api/available-months", (req, res) => {
  const query = "SELECT DISTINCT month FROM keyword_metrics ORDER BY month;";
  connection.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching months:", err);
      res.status(500).json({ error: "Error fetching months" });
    } else {
      res.json(results);
    }
  });
});

// Endpoint to get available DMA IDs
app.get("/api/available-dmas", (req, res) => {
  const query = `
    SELECT DISTINCT d.dma_id, d.dma_name
    FROM dmas d
    JOIN keyword_metrics k ON d.dma_id = k.dma_id
    JOIN brands b ON k.brand_id = b.brand_id
    WHERE b.type_id = 1
    ORDER BY d.dma_name;
  `;
  connection.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching DMAs:", err);
      res.status(500).json({ error: "Error fetching DMAs" });
    } else {
      res.json(results);
    }
  });
});

// Endpoint to get brand searche volumne by brand
app.get("/api/brand-search-volume", (req, res) => {
  const month = req.query.month;
  const dma_id = req.query.dma_id;

  if (!month || !dma_id) {
    return res.status(400).json({ error: "month and dma_id are required query parameters" });
  }

  const query = `
    SELECT 
      b.brand_name,
      SUM(k.search_volume) AS total_brand_search_volume
    FROM 
      brands b
    JOIN 
      keyword_metrics k ON b.brand_id = k.brand_id
    WHERE 
      k.dma_id = ? AND k.month = ?
    GROUP BY 
      b.brand_name;
  `;

  const params = [dma_id, month];

  connection.query(query, params, (err, results) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).json({ error: "Error fetching brand search volume" });
    } else {
      res.json(results);
    }
  });
});

// Endpoint to get brand market share data for tombstones
app.get("/api/brand-market-share", (req, res) => {
  const month = parseInt(req.query.month, 10);
  const dma_id = parseInt(req.query.dma_id, 10);

  if (isNaN(month) || isNaN(dma_id)) {
    return res.status(400).json({ error: "month and dma_id must be valid numbers" });
  }

  // Calculate previous month
  let previousMonth = month - 1;
  let previousMonthYearAdjustment = 0;
  if (previousMonth === 0) {
    previousMonth = 12;
    previousMonthYearAdjustment = -1; // Adjust year if needed
  }

  const query = `
    SELECT
  b.brand_id,
  b.brand_name,
  current_data.current_brand_share,
  IFNULL(previous_data.previous_brand_share, 0) AS previous_brand_share,
  (current_data.current_brand_share - IFNULL(previous_data.previous_brand_share, 0)) AS delta
FROM
  (
    SELECT
      k.brand_id,
      SUM(k.search_volume) / total_current.total_search_volume AS current_brand_share
    FROM
      keyword_metrics k,
      (SELECT SUM(search_volume) AS total_search_volume
       FROM keyword_metrics
       WHERE dma_id = ? AND month = ?) total_current
    WHERE
      k.dma_id = ? AND k.month = ?
    GROUP BY
      k.brand_id
  ) AS current_data
INNER JOIN brands b ON b.brand_id = current_data.brand_id AND b.type_id = 1
LEFT JOIN (
    SELECT
      k.brand_id,
      SUM(k.search_volume) / total_previous.total_search_volume AS previous_brand_share
    FROM
      keyword_metrics k,
      (SELECT SUM(search_volume) AS total_search_volume
       FROM keyword_metrics
       WHERE dma_id = ? AND month = ?) total_previous
    WHERE
      k.dma_id = ? AND k.month = ?
    GROUP BY
      k.brand_id
  ) AS previous_data ON b.brand_id = previous_data.brand_id;
  `;

  const params = [
    dma_id, month,
    dma_id, month,
    dma_id, previousMonth,
    dma_id, previousMonth
  ];

  connection.query(query, params, (err, results) => {
    if (err) {
      console.error("Error executing brand market share query:", err);
      res.status(500).json({ error: "Error fetching brand market share" });
    } else {
      res.json(results);
    }
  });
});

// Endpoint to get total DMA search volume for current and previous months
app.get("/api/total-dma-search-volume", (req, res) => {
  const month = parseInt(req.query.month, 10);
  const dma_id = parseInt(req.query.dma_id, 10);

  if (isNaN(month) || isNaN(dma_id)) {
    return res.status(400).json({ error: "month and dma_id must be valid numbers" });
  }

  // Calculate previous month
  let previousMonth = month - 1;
  if (previousMonth === 0) {
    previousMonth = 12;
    // Handle year adjustment if necessary
  }

  const query = `
    SELECT
      SUM(CASE WHEN month = ? THEN search_volume ELSE 0 END) AS current_total_search_volume,
      SUM(CASE WHEN month = ? THEN search_volume ELSE 0 END) AS previous_total_search_volume
    FROM keyword_metrics
    WHERE dma_id = ? AND (month = ? OR month = ?)
  `;

  const params = [month, previousMonth, dma_id, month, previousMonth];

  connection.query(query, params, (err, results) => {
    if (err) {
      console.error("Error executing total DMA search volume query:", err);
      res.status(500).json({ error: "Error fetching total DMA search volume" });
    } else {
      res.json(results[0]);
    }
  });
});