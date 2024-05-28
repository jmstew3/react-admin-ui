import fetch from 'node-fetch';
import fs from 'fs';
import dotenv from 'dotenv';
dotenv.config(); // Ensure you load environment variables

const API_KEY = process.env.REACT_APP_RAPID_API_KEY; // Ensure this key is correct and has access
const TEAM_ABV = 'TEN';
const SEASON = 2024;
const API_URL = `https://tank01-nfl-live-in-game-real-time-statistics-nfl.p.rapidapi.com/getNFLTeamSchedule?teamAbv=${TEAM_ABV}&season=${SEASON}`;

const fetchAndStoreSchedule = async () => {
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': API_KEY,
      'X-RapidAPI-Host': 'tank01-nfl-live-in-game-real-time-statistics-nfl.p.rapidapi.com',
    },
  };

  try {
    const response = await fetch(API_URL, options);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    fs.writeFileSync('./public/nfl_schedule.json', JSON.stringify(data, null, 2));
    console.log('Schedule data saved.');
  } catch (error) {
    console.error('Error fetching schedule:', error.message);
  }
};

fetchAndStoreSchedule();
