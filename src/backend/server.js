import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = 9001;

// Use CORS middleware
app.use(cors());

// MySQL Database configuration
const dbConfig = {
  host: process.env.DB_HOST,  // e.g., 'localhost' or your database host
  user: process.env.DB_USER,  // MySQL username
  password: process.env.DB_PASSWORD,  // MySQL password
  database: process.env.DB_DATABASE,  // MySQL database name
};

// Create a connection to MySQL
const connection = mysql.createConnection(dbConfig);

// Connect to MySQL
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.get('/api/competitor-brands', (req, res) => {
  const query = `
    SELECT b.brand_name, t.type_value
    FROM brands b
    JOIN type t ON b.type_id = t.type_id
    WHERE t.type_value = 'TP Competitor';
  `;

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'Error fetching competitor brands' });
    } else {
      res.json(results);
    }
  });
});

app.get('/api/historical-keywords', (req, res) => {
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

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'Error fetching historical keywords' });
    } else {
      res.json(results);
    }
  });
});