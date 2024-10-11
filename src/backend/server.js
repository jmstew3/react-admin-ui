// server.js
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
if (
  !process.env.DB_HOST ||
  !process.env.DB_USER ||
  !process.env.DB_PASSWORD ||
  !process.env.DB_DATABASE
) {
  console.error(
    "Missing one or more required environment variables: DB_HOST, DB_USER, DB_PASSWORD, DB_DATABASE"
  );
  process.exit(1); // Exit the process with a failure code
}

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Existing endpoints (if any) remain unchanged

// Unified endpoint for BrandShare data
app.get("/api/brand-share-data", async (req, res) => {
  const { month, dma_id } = req.query;

  if (!month || !dma_id) {
    return res
      .status(400)
      .json({ error: "month and dma_id are required query parameters" });
  }

  try {
    // Execute all the necessary queries in parallel
    const [
      brandShares,
      brandSearchVolumes,
      budgetsData,
      marketShareData,
      totalDmaSearchVolumeData,
      competitorSearchVolumeData, // Add this line
    ] = await Promise.all([
      getBrandShares(month, dma_id),
      getBrandSearchVolumes(month, dma_id),
      getBudgetsData(month, dma_id),
      getMarketShareData(month, dma_id),
      getTotalDmaSearchVolumeData(month, dma_id),
      getCompetitorSearchVolumeData(month, dma_id), // And this line
    ]);

    // Send all the data in a single response
    res.json({
      brandShares,
      brandSearchVolumes,
      budgetsData,
      marketShareData,
      totalDmaSearchVolumeData,
      competitorSearchVolumeData, // Include this in the response
    });
  } catch (err) {
    console.error("Error fetching data:", err);
    res.status(500).json({ error: "Error fetching data" });
  }
});

// Helper functions for database queries

// Function to get brand shares
const getBrandShares = (month, dma_id) => {
  return new Promise((resolve, reject) => {
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
        console.error("Error executing getBrandShares query:", err);
        return reject(err);
      }
      resolve(results);
    });
  });
};

// Function to get brand search volumes
const getBrandSearchVolumes = (month, dma_id) => {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT 
        b.brand_name,
        b.brand_id,
        SUM(k.search_volume) AS total_brand_search_volume
      FROM 
        brands b
      JOIN 
        keyword_metrics k ON b.brand_id = k.brand_id
      WHERE 
        k.dma_id = ? AND k.month = ?
      GROUP BY 
        b.brand_name, b.brand_id;
    `;

    const params = [dma_id, month];

    pool.query(query, params, (err, results) => {
      if (err) {
        console.error("Error executing getBrandSearchVolumes query:", err);
        return reject(err);
      }
      resolve(results);
    });
  });
};

// Function to get budgets data
const getBudgetsData = (month, dma_id) => {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT 
        b.brand_name,
        b.brand_id,
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
        console.error("Error executing getBudgetsData query:", err);
        return reject(err);
      }
      resolve(results);
    });
  });
};

// Function to get market share data
const getMarketShareData = (month, dma_id) => {
  return new Promise((resolve, reject) => {
    const currentMonth = parseInt(month, 10);
    let previousMonth = currentMonth - 1;
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
      currentMonth,
      dma_id,
      currentMonth,
      dma_id,
      previousMonth,
      dma_id,
      previousMonth,
    ];

    pool.query(query, params, (err, results) => {
      if (err) {
        console.error("Error executing getMarketShareData query:", err);
        return reject(err);
      }
      resolve(results);
    });
  });
};

// Function to get total DMA search volume data
const getTotalDmaSearchVolumeData = (month, dma_id) => {
  return new Promise((resolve, reject) => {
    const currentMonth = parseInt(month, 10);
    let previousMonth = currentMonth - 1;
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

    const params = [
      currentMonth,
      previousMonth,
      dma_id,
      currentMonth,
      previousMonth,
    ];

    pool.query(query, params, (err, results) => {
      if (err) {
        console.error(
          "Error executing getTotalDmaSearchVolumeData query:",
          err
        );
        return reject(err);
      }
      resolve(results[0]); // results is an array with one object
    });
  });
};

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

// Endpoint to get available DMAs
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

// Function to get competitor search volume data
const getCompetitorSearchVolumeData = (month, dma_id) => {
  return new Promise((resolve, reject) => {
    const currentMonth = parseInt(month, 10);
    let previousMonth = currentMonth - 1;
    if (previousMonth === 0) {
      previousMonth = 12;
    }

    const query = `
      SELECT
        SUM(CASE WHEN k.month = ? THEN k.search_volume ELSE 0 END) AS current_competitor_search_volume,
        SUM(CASE WHEN k.month = ? THEN k.search_volume ELSE 0 END) AS previous_competitor_search_volume
      FROM keyword_metrics k
      JOIN brands b ON k.brand_id = b.brand_id
      WHERE k.dma_id = ? AND (k.month = ? OR k.month = ?) AND b.type_id = 2
    `;

    const params = [currentMonth, previousMonth, dma_id, currentMonth, previousMonth];

    pool.query(query, params, (err, results) => {
      if (err) {
        console.error("Error executing getCompetitorSearchVolumeData query:", err);
        return reject(err);
      }
      resolve(results[0]); // results is an array with one object
    });
  });
};
// Endpoint to get available brands
app.get("/api/available-brands", (req, res) => {
  const query = `
    SELECT 
      b.brand_id, 
      b.brand_name,
      bd.dma_id
    FROM 
      brands b
    JOIN
      brand_dmas bd on b.brand_id = bd.brand_id
    WHERE
      b. type_id = 1
    ORDER BY 
      b. brand_name;
  `;
  
  pool.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching brands:", err);
      res.status(500).json({ error: "Error fetching brands" });
    } else {
      res.json(results);
    }
  });
});
app.get("/api/brand-share-data-by-brand", async (req, res) => {
  const { month, brand_id } = req.query;

  if (!month || !brand_id) {
    return res
      .status(400)
      .json({ error: "month and brand_id are required query parameters" });
  }

  try {
    // Execute all necessary queries in a
    const [
      brandShares,
      brandSearchVolumes,
      budgetsData,
      marketShareData,
      totalBrandSearchVolumeData,
      competitorSearchVolumeData,
    ] = await Promise.all([
      getBrandSharesByBrand(month, brand_id),
      getBrandSearchVolumesByBrand(month, brand_id),
      getBudgetsDataByBrand(month, brand_id),
      getMarketShareDataByBrand(month, brand_id),
      getTotalBrandSearchVolumeData(month, brand_id),
      getCompetitorSearchVolumeData(month, brand_id),
    ]);

    // Send all the data in a single response
    res.json({
      brandShares,
      brandSearchVolumes,
      budgetsData,
      marketShareData,
      totalBrandSearchVolumeData,
      competitorSearchVolumeData,
    });
  } catch (err) {
    console.error("Error fetching data:", err);
    res.status(500).json({ error: "Error fetching data" });
  }
});
// Function to get brand shares by brand
const getBrandSharesByBrand = (month, brand_id) => {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT 
        b.brand_name,
        d.dma_name,
        SUM(k.search_volume) AS total_dma_search_volume,
        SUM(k.search_volume) * 1.0 / (
          SELECT SUM(search_volume) 
          FROM keyword_metrics 
          WHERE brand_id = ? AND month = ?
        ) AS brand_share
      FROM 
        brands b
      JOIN 
        keyword_metrics k ON b.brand_id = k.brand_id
      JOIN 
        dmas d ON k.dma_id = d.dma_id
      WHERE 
        k.brand_id = ? AND k.month = ?
      GROUP BY 
        b.brand_name, d.dma_name;
    `;

    const params = [brand_id, month, brand_id, month];

    pool.query(query, params, (err, results) => {
      if (err) {
        console.error("Error executing getBrandSharesByBrand query:", err);
        return reject(err);
      }
      resolve(results);
    });
  });
};
// Function to get brand search volumes by brand
const getBrandSearchVolumesByBrand = (month, brand_id) => {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT 
        b.brand_name,
        b.brand_id,
        SUM(k.search_volume) AS total_brand_search_volume
      FROM 
        brands b
      JOIN 
        keyword_metrics k ON b.brand_id = k.brand_id
      WHERE 
        k.brand_id = ? AND k.month = ?
      GROUP BY 
        b.brand_name, b.brand_id;
    `;

    const params = [brand_id, month];

    pool.query(query, params, (err, results) => {
      if (err) {
        console.error("Error executing getBrandSearchVolumesByBrand query:", err);
        return reject(err);
      }
      resolve(results);
    });
  });
};

// Function to get budgets data by brand
const getBudgetsDataByBrand = (month, brand_id) => {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT 
        b.brand_name,
        b.brand_id,
        bu.amount
      FROM 
        budgets bu
      JOIN 
        brands b ON bu.brand_id = b.brand_id
      WHERE 
        bu.month = ? AND bu.brand_id = ?;
    `;

    const params = [month, brand_id];

    pool.query(query, params, (err, results) => {
      if (err) {
        console.error("Error executing getBudgetsDataByBrand query:", err);
        return reject(err);
      }
      resolve(results);
    });
  });
};

// Function to get market share data by brand
const getMarketShareDataByBrand = (month, brand_id) => {
  return new Promise((resolve, reject) => {
    const currentMonth = parseInt(month, 10);
    let previousMonth = currentMonth - 1;
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
             WHERE brand_id = ? AND month = ?) total_current
          WHERE
            k.brand_id = ? AND k.month = ?
          GROUP BY
            k.brand_id
        ) AS current_data
      INNER JOIN brands b ON b.brand_id = current_data.brand_id
      LEFT JOIN (
          SELECT
            k.brand_id,
            SUM(k.search_volume) / total_previous.total_search_volume AS previous_brand_share
          FROM
            keyword_metrics k,
            (SELECT SUM(search_volume) AS total_search_volume
             FROM keyword_metrics
             WHERE brand_id = ? AND month = ?) total_previous
          WHERE
            k.brand_id = ? AND k.month = ?
          GROUP BY
            k.brand_id
        ) AS previous_data ON b.brand_id = previous_data.brand_id;
    `;

    const params = [
      brand_id,
      currentMonth,
      brand_id,
      currentMonth,
      brand_id,
      previousMonth,
      brand_id,
      previousMonth,
    ];

    pool.query(query, params, (err, results) => {
      if (err) {
        console.error("Error executing getMarketShareDataByBrand query:", err);
        return reject(err);
      }
      resolve(results);
    });
  });
};

// Function to get total brand search volume data
const getTotalBrandSearchVolumeData = (month, brand_id) => {
  return new Promise((resolve, reject) => {
    const currentMonth = parseInt(month, 10);
    let previousMonth = currentMonth - 1;
    if (previousMonth === 0) {
      previousMonth = 12;
    }

    const query = `
      SELECT
        SUM(CASE WHEN month = ? THEN search_volume ELSE 0 END) AS current_total_search_volume,
        SUM(CASE WHEN month = ? THEN search_volume ELSE 0 END) AS previous_total_search_volume
      FROM keyword_metrics
      WHERE brand_id = ? AND (month = ? OR month = ?)
    `;

    const params = [
      currentMonth,
      previousMonth,
      brand_id,
      currentMonth,
      previousMonth,
    ];

    pool.query(query, params, (err, results) => {
      if (err) {
        console.error("Error executing getTotalBrandSearchVolumeData query:", err);
        return reject(err);
      }
      resolve(results[0]); // results is an array with one object
    });
  });
};
