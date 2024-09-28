const express = require('express');
const mysql = require('mysql');
const cors = require('cors'); // Import cors

const app = express();
const port = 5000;

// Use CORS middleware
app.use(cors());

// MySQL Database configuration
const dbConfig = {
  host: 'your-host',  // e.g., 'localhost' or your database host
  user: 'your-username',  // MySQL username
  password: 'your-password',  // MySQL password
  database: 'your-database-name',  // MySQL database name
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