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
  const query = `
    SELECT 
    b.brand_name,
    d.dma_name,
    SUM(k.search_volume) AS total_dma_search_volume,
    SUM(k.search_volume) * 1.0 / (SELECT SUM(search_volume) 
                                  FROM keyword_metrics 
                                  WHERE dma_id = 40 
                                  AND month = 8) AS brand_share
FROM 
    brands b
JOIN 
    keyword_metrics k ON b.brand_id = k.brand_id
JOIN 
    dmas d ON k.dma_id = d.dma_id
WHERE 
    k.dma_id = 40 
    AND k.month = 8
GROUP BY 
    b.brand_name, d.dma_name, k.dma_id;
  `;

  if (connection.state === "disconnected") {
    handleDisconnect();
  }

  connection.query(query, (err, results) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).json({ error: "Error fetching keyword share" });
    } else {
      res.json(results);
    }
  });
});
