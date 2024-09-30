import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./historicalKeywords.scss";

const HistoricalKeywords = () => {
  const [historicalKeywords, setHistoricalKeywords] = useState([]);

  // Fetch data from the backend
  useEffect(() => {
    const fetchhistoricalKeywords = async () => {
      try {
        const response = await axios.get('http://localhost:9001/api/competitor-brands');
        setHistoricalKeywords(response.data);  // Set the fetched data to state
      } catch (error) {
        console.error('Error fetching competitor brands:', error);
      }
    };

    fetchhistoricalKeywords();
  }, []);  // Empty array ensures this effect runs once when the component mounts

  return (
    <div>
      <h1>Historical Keywords</h1>
      <table>
        <thead>
          <tr>
            <th>Month</th>
            <th>Total Search Volume</th>
          </tr>
        </thead>
        <tbody>
          {historicalKeywords.map((competitor, index) => (
            <tr key={index}>
              <td>{competitor.brand_name}</td>
              <td>{competitor.type_value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HistoricalKeywords;