import React, { useMemo } from 'react';
import { useState, useEffect } from 'react';
import useGetKeywordData from "../../hooks/useGetKeywordData";
import useGetBudgetData from "../../hooks/useGetBudgetData";
import './keywords.scss';
import Card1 from '../../components/Keywords/Cards/Card-1';
import Card2 from '../../components/Keywords/Cards/Card-2';
import Card3 from '../../components/Keywords/Cards/Card-3';
import Card4 from '../../components/Keywords/Cards/Card-4';
import CustomBarChart from '../Keywords/components/BarChart/BarChart';
import CustomPieChart from '../Keywords/components/PieChart/PieChart';

import BudgetPieChart from './components/Budgets/BudgetPieChart';
import BudgetTable from './components/Budgets/BudgetTable';
import BudgetLinChart from './components/Budgets/BudgetLineChart';

import YearSelector from './components/YearSelector/YearSelector';

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

    
  const {
    budgetData, 
    budgetDataError, 
    budgetDataisLoading
  } = useGetBudgetData();



    const apolloBudgetData = budgetData.filter(item => item.brand === "Apollo");

    const apolloData = keywordData.filter(item => item.keyword_title === "Apollo");
    const totalSummedKSV = keywordData.reduce((acc, item) => acc + parseInt(item.month_year_search_volume), 0);

    // const apolloDaytonData = keywordData.filter(item => item.keyword_title === "Apollo - Dayton" && item.budetIem !== null);
    const apolloDaytonData = keywordData.filter(item => item.keyword_title === "Apollo - Dayton");
    
    const [year, setYear] = useState('2024');    



    if (keywordDataisLoading) {
      return <p>Loading...</p>;
    }
    
    if (keywordDataError) {
      return <p>Error loading data: {keywordDataError.message}</p>;
    }

    return (
      <div className="keywords">
        <div className="keyword-container">
          
          <div className="keyword-header">
            <div>
              <h1 style={{ 
                fontWeight: "400",
                fontSize: "25px",
                marginTop: "20px"
              }}>Keyword Search Volume:</h1>
            </div>
            <div>
              <YearSelector year={year} setYear={setYear} />
            </div>
          </div>          
    
          <div className="cards">
            {/* Check if keywordData is loaded before rendering the cards */}
            {keywordData.length > 0 ? (
              <>
                {/* Apollo Search Volume Card */}
                <Card1 title="Apollo Search Volume" data={apolloData} totalKSV={totalSummedKSV} year={year} />
    
                {/* Apollo Market Share Card */}
                <Card2 title="Apollo Market Share" data={apolloData} keywordData={keywordData} year={year} />
    
                {/* Apollo YoY Growth Card */}
                <Card3 title="Apollo YoY Growth" data={apolloData} totalKSV={totalSummedKSV} keywordData={keywordData} year={year}/>
    
                {/* Apollo - Dayton Search Volume Card */}
                <Card4 title="Apollo - Dayton Search Volume" data={apolloDaytonData} totalKSV={totalSummedKSV}  year={year}/>
    
                {/* Apollo - Dayton Market Share Card */}
                <Card2 title="Apollo - Dayton Market Share" data={apolloDaytonData} keywordData={keywordData} year={year} />
              </>
            ) : (
              <p>Loading keyword data...</p>
            )}
          </div>

          <hr className="hr-div"/>
    
          <div className="keywords-flex-container">
            <div className="container-left">
              {/* Bar Chart for Apollo Monthly Search Volume */}
              <CustomBarChart data={apolloData} />
            </div>
    
            <div className="container-right">
              <CustomPieChart data={keywordData} />
            </div>
          </div>
        </div>
    
        <h1 style={{ fontSize: "20px" }}>2024 Budgets</h1>
        <br />
    
        <div className="keywords-flex-container">
          <div className="container-left">
            <BudgetLinChart budgetData={budgetData} />
          </div>
          <div className="container-right">
            {apolloBudgetData.length > 0 ? (
              <BudgetPieChart budgetData={apolloBudgetData} />
            ) : (
              <p>Loading budget data...</p>
            )}
          </div>
        </div>
        <br />
        <BudgetTable budgetData={apolloBudgetData} />
        <br />
    
        <div className="keywords-flex-container">
          <div className="container-left">
            <TrafficTable />
          </div>
          <div className="container-right">
            {/* HTML5 Video Player */}
            <div style={{ marginTop: '20px' }}>
              <video width="640" controls>
                <source src={videoFile} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>
      </div>
    );
    
};

export default Keywords;
