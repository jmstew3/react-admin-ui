// Andrew 2
import React, { useMemo } from 'react';
import useGetKeywordData from "../../hooks/useGetKeywordData";
import './keywords.scss';
import Card from '../../components/Keywords/Cards/Card';
import CustomBarChart from '../Keywords/components/BarChart/BarChart';
import CustomPieChart from '../Keywords/components/PieChart/PieChart';

import TrafficTable from '../Keywords/components/Traffic/Traffic';
import { Typography } from '@mui/material'; 

// Import the video file
import videoFile from '../../media/apollo-video.mp4';

const Keywords = () => {
  
  const {
    keywordData,
    keywordDataError,
    keywordDataisLoading,
  } = useGetKeywordData();

  // Filter data for "Apollo" keyword_title
  const apolloData = keywordData.filter(item => item.keyword_title === "Apollo");

  // Filter data for "Apollo - Dayton"
  const apolloDaytonData = keywordData.filter(item => item.keyword_title === "Apollo - Dayton");

  // Filter data for "Cincinnati MKT Data"
  const cincinnatiData = keywordData.filter(item => item.keyword_title === "Cincinnati MKT Data");

  // Filter out Apollo, Apollo - Dayton, and Cincinnati MKT Data for competitors
  const competitorData = keywordData.filter(
    item => item.keyword_title !== "Apollo" && item.keyword_title !== "Apollo - Dayton" && item.keyword_title !== "Cincinnati MKT Data"
  );

  // Sum up the Cincinnati search volume
  const cincinnatiSearchVolume = cincinnatiData.reduce((total, item) => total + parseInt(item.month_year_search_volume, 10), 0);

  // Sum up Apollo search volume across all years
  // Sum up Apollo search volume for July 2024
const apolloSearchVolume = apolloData
.filter(item => item.year === "2024" && parseInt(item.month, 10) === 7)
.reduce((total, item) => total + parseInt(item.month_year_search_volume, 10), 0);

  // Sum up Apollo - Dayton search volume across all years
  const apolloDaytonSearchVolume = apolloDaytonData.reduce((total, item) => total + parseInt(item.month_year_search_volume, 10), 0);

  // Sum up Apollo search volume for 2024 (first 8 months)
  const apollo2024SearchVolume = apolloData.filter(item => item.year === "2024" && parseInt(item.month, 10) <= 8)
    .reduce((total, item) => total + parseInt(item.month_year_search_volume, 10), 0);

  // Sum up Apollo search volume for 2023 (first 8 months)
  const apollo2023SearchVolume = apolloData.filter(item => item.year === "2023" && parseInt(item.month, 10) <= 8)
    .reduce((total, item) => total + parseInt(item.month_year_search_volume, 10), 0);

  // Calculate Apollo YoY growth
  const apolloYoYGrowth = apollo2023SearchVolume > 0
    ? (((apollo2024SearchVolume - apollo2023SearchVolume) / apollo2023SearchVolume) * 100).toFixed(2)
    : 0;

  // Calculate total search volume (including Apollo, Apollo - Dayton, Cincinnati, and competitors)
  const totalSearchVolume = keywordData.reduce((total, item) => total + parseInt(item.month_year_search_volume, 10), 0);

  // Calculate Cincinnati market share
  const cincinnatiMarketShare = totalSearchVolume > 0
    ? ((cincinnatiSearchVolume / totalSearchVolume) * 100).toFixed(2)
    : 0;

  // Calculate Apollo - Dayton market share
  const apolloDaytonMarketShare = totalSearchVolume > 0
    ? ((apolloDaytonSearchVolume / totalSearchVolume) * 100).toFixed(2)
    : 0;

  // Group Apollo data by month and year for Jan 2022 to Aug 2024 for BarChart
  const barChartData = useMemo(() => {
    const dataMap = {};

    apolloData.forEach(item => {
      const year = parseInt(item.year, 10);
      const month = parseInt(item.month, 10);
      const monthYear = `${year}-${month < 10 ? `0${month}` : month}`; // Format month-year (e.g., "2022-01")

      if (year >= 2022 && (year < 2024 || (year === 2024 && month <= 8))) {
        if (!dataMap[monthYear]) {
          dataMap[monthYear] = 0;
        }
        dataMap[monthYear] += parseInt(item.month_year_search_volume, 10);
      }
    });

    // Convert dataMap to array format for Recharts
    return Object.keys(dataMap).map(monthYear => ({
      monthYear,
      searchVolume: dataMap[monthYear],
    }));
  }, [apolloData]);

  const competitorsSearchVolumes = useMemo(() => {
    const volumeMap = {};
  
    // Filter data to include only July 2024
    competitorData.forEach(item => {
      if (item.year === "2024" && parseInt(item.month, 10) === 7) {
        if (!volumeMap[item.keyword_title]) {
          volumeMap[item.keyword_title] = 0;
        }
        volumeMap[item.keyword_title] += parseInt(item.month_year_search_volume, 10);
      }
    });
  
    // Sort by search volume and get the top 5 competitors
    const sortedCompetitors = Object.keys(volumeMap)
      .sort((a, b) => volumeMap[b] - volumeMap[a])
      .slice(0, 5)
      .map(title => ({ name: title, searchVolume: volumeMap[title] }));
  
    // Calculate search volume for "Other" competitors
    // This includes competitors not in the top 5
    const otherSearchVolume = Object.keys(volumeMap)
      .filter(title => !sortedCompetitors.map(comp => comp.name).includes(title))
      .reduce((total, title) => total + volumeMap[title], 0);
  
    return { sortedCompetitors, otherSearchVolume };
  }, [competitorData]);
  

  // Create data array for the Pie chart
  const pieChartData = [
    { name: 'Apollo', searchVolume: apolloSearchVolume },
    ...competitorsSearchVolumes.sortedCompetitors,
    { name: 'Other', searchVolume: competitorsSearchVolumes.otherSearchVolume }
  ];

  if (keywordDataisLoading) {
    return <p>Loading...</p>;
  }

  if (keywordDataError) {
    return <p>Error loading data: {keywordDataError.message}</p>;
  }

  return (
    <div className="keywords">
      <div className="cards">
        {/* Cincinnati Search Volume Card */}
        <Card title="Cincinnati Search Volume" volume={cincinnatiSearchVolume} />

        {/* Cincinnati Market Share Card */}
        <Card title="Cincinnati Market Share" volume={`${cincinnatiMarketShare}%`} />

        {/* Apollo YoY Growth Card */}
        <Card title="Apollo YoY Growth" volume={`${apolloYoYGrowth}%`} />

        {/* Apollo - Dayton Search Volume Card */}
        <Card title="Apollo - Dayton Search Volume" volume={apolloDaytonSearchVolume} />

        {/* Apollo - Dayton Market Share Card */}
        <Card title="Apollo - Dayton Market Share" volume={`${apolloDaytonMarketShare}%`} />
      </div>

      <div className="keywords-flex-container">
        <div className="container-left">
          {/* Bar Chart for Apollo Monthly Search Volume */}
          <CustomBarChart data={barChartData} />
        </div>

        <div className="container-right">
          <CustomPieChart data={pieChartData} />
        </div>
      </div>

      <div className="keywords-flex-container">
        <div className="container-left">
          <TrafficTable />
        </div>
        <div className="container-right">
          {/* HTML5 Video Player */}
          <div style={{ marginTop: '20px' }}>
            {/* <Typography style={{ marginLeft: '40px', marginBottom: '20px' }} variant="h6">Current Creative</Typography> */}
            <video width="640" controls>
              <source src={videoFile} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </div>

      
      <br />      
    </div>
  );
};

export default Keywords;
