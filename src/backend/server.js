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
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Ensure environment variables are set
if (!process.env.DB_HOST || !process.env.DB_USER || !process.env.DB_PASSWORD || !process.env.DB_DATABASE) {
  console.error('Missing one or more required environment variables: DB_HOST, DB_USER, DB_PASSWORD, DB_DATABASE');
  process.exit(1); // Exit the process with a failure code
}

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Route for /api/competitor-brands
app.get("/api/competitor-brands", (req, res) => {
  const query = `
    SELECT b.brand_name, t.type_value
    FROM brands b
    JOIN type t ON b.type_id = t.type_id
    WHERE t.type_value = 'TP Competitor';
  `;

  pool.query(query, (err, results) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).json({ error: "Error fetching competitor brands" });
    } else {
      res.json(results);
    }
  });
});

// Route for /api/historical-keywords
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

  pool.query(query, (err, results) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).json({ error: "Error fetching historical keywords" });
    } else {
      res.json(results);
    }
  });
});

// Route for /api/brand-share
app.get("/api/brand-share", (req, res) => {
  const { month, dma_id } = req.query;

  if (!month || !dma_id) {
    return res.status(400).json({ error: "month and dma_id are required query parameters" });
  }

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
      b.brand_name, d.dma_name;
  `;

  const params = [dma_id, month, dma_id, month];

  pool.query(query, params, (err, results) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).json({ error: "Error fetching keyword share" });
    } else {
      res.json(results);
    }
  });
});

// Endpoint to get available months
app.get("/api/available-months", (req, res) => {
  const query = "SELECT DISTINCT month FROM keyword_metrics ORDER BY month;";
  pool.query(query, (err, results) => {
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
  pool.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching DMAs:", err);
      res.status(500).json({ error: "Error fetching DMAs" });
    } else {
      res.json(results);
    }
  });
});

// Endpoint to get brand search volume by brand
app.get("/api/brand-search-volume", (req, res) => {
  const { month, dma_id } = req.query;

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

  pool.query(query, params, (err, results) => {
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

  let previousMonth = month - 1;
  if (previousMonth === 0) {
    previousMonth = 12;
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
    dma_id,
    month,
    dma_id,
    month,
    dma_id,
    previousMonth,
    dma_id,
    previousMonth,
  ];

  pool.query(query, params, (err, results) => {
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

  let previousMonth = month - 1;
  if (previousMonth === 0) {
    previousMonth = 12;
  }

  const query = `
    SELECT
      SUM(CASE WHEN month = ? THEN search_volume ELSE 0 END) AS current_total_search_volume,
      SUM(CASE WHEN month = ? THEN search_volume ELSE 0 END) AS previous_total_search_volume
    FROM keyword_metrics
    WHERE dma_id = ? AND (month = ? OR month = ?)
  `;

  const params = [month, previousMonth, dma_id, month, previousMonth];

  pool.query(query, params, (err, results) => {
    if (err) {
      console.error("Error executing total DMA search volume query:", err);
      res.status(500).json({ error: "Error fetching total DMA search volume" });
    } else {
      res.json(results[0]);
    }
  });
});

// Define the getBudgetsData function
const getBudgetsData = (month, dma_id) => {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT 
        b.brand_name,
        bu.amount
      FROM 
        budgets bu
      JOIN 
        brands b ON bu.brand_id = b.brand_id
      WHERE 
        bu.month = ? AND bu.dma_id = ?;
    `;

    const params = [month, dma_id];

    pool.query(query, params, (err, results) => {
      if (err) {
        return reject(err);
      }
      resolve(results);
    });
  });
};
// Endpoint to get budgets data
app.get('/api/budgets', async (req, res) => {
  const { month, dma_id } = req.query;

  // Validate query parameters
  if (!month || !dma_id) {
    return res.status(400).json({ error: 'Missing month or dma_id parameter' });
  }

  try {
    // Fetch budgets data from the database
    const budgets = await getBudgetsData(month, dma_id);
    res.json(budgets);
  } catch (error) {
    console.error('Error fetching budgets data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

const getCombinedData = (month, dma_id) => {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT 
        b.brand_name,
        SUM(km.search_volume) AS total_search_volume,
        bu.amount
      FROM 
        brands b
      JOIN 
        keyword_metrics km ON b.brand_id = km.brand_id
      LEFT JOIN 
        budgets bu ON b.brand_id = bu.brand_id AND bu.month = km.month
      WHERE 
        km.month = ? AND km.dma_id = ?
      GROUP BY 
        b.brand_name, bu.amount;
    `;

    const params = [month, dma_id];

    pool.query(query, params, (err, results) => {
      if (err) {
        return reject(err);
      }
      resolve(results);
    });
  });
};

app.get('/api/combined-data', async (req, res) => {
  const { month, dma_id } = req.query;

  if (!month || !dma_id) {
    return res.status(400).json({ error: 'Missing month or dma_id parameter' });
  }

  try {
    const data = await getCombinedData(month, dma_id);
    res.json(data);
  } catch (error) {
    console.error('Error fetching combined data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});