import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./competitors.scss";

const Competitors = () => {
  const [competitors, setCompetitors] = useState([]);

  // Fetch data from the backend
  useEffect(() => {
    const fetchCompetitors = async () => {
      try {
        const response = await axios.get('http://localhost:9001/api/competitor-brands');
        setCompetitors(response.data);  // Set the fetched data to state
      } catch (error) {
        console.error('Error fetching competitor brands:', error);
      }
    };

    fetchCompetitors();
  }, []);  // Empty array ensures this effect runs once when the component mounts

  return (
    <div>
      <h1>TurnPoint Competitor Brands</h1>
      <table>
        <thead>
          <tr>
            <th>Brand Name</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody>
          {competitors.map((competitor, index) => (
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

export default Competitors;