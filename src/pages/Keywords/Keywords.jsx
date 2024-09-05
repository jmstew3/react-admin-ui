// !! Hey Justin: add up month_year_search_volume and look for keyword_title.  keyword_title is basically the brand breakout per dma and month_year_search_volume is the volume per month that needs to be summed.

import { useMemo } from "react";
import useGetKeywordData from "../../hooks/useGetKeywordData";
import './Keywords.scss';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Box } from '@mui/material';

const Keywords = () => {
    // Hook to get the keyword data
    const { keywordData, keywordDataByQuarter, keywordDataError, keywordDataisLoading } = useGetKeywordData();
    // console.log('Keyword Data by Quarter:', keywordDataByQuarter);
    // Process the data to group by year and quarter
    const chartData = useMemo(() => {
        const years = [2022, 2023, 2024]; // Define the years you want to display
        const quarters = ['Q1', 'Q2', 'Q3', 'Q4'];
        
        let dataByQuarter = [];
    
        quarters.forEach(quarter => {
            let quarterData = { quarter }; // Object to hold data for each quarter
            years.forEach(year => {
                const sumVolume = keywordDataByQuarter[quarter]
                    .filter(keyword => {
                        const isApollo = keyword.keyword_title === "Apollo";
                        const isCorrectYear = keyword.year == year;
                        // console.log(`Filtering for quarter: ${quarter}, year: ${year}, isApollo: ${isApollo}, isCorrectYear: ${isCorrectYear}`);
                        return isApollo && isCorrectYear;
                    })
                    .reduce((acc, curr) => {
                        const volume = parseFloat(curr.month_year_search_volume) || 0;
                        return acc + volume;
                    }, 0);
    
                // Add the summed volume for the year to the current quarter object
                quarterData[`volume_${year}`] = sumVolume;
            });
            dataByQuarter.push(quarterData);
        });
    
        // console.log('Chart Data:', dataByQuarter); // Log the chart data
    
        return dataByQuarter;
    }, [keywordDataByQuarter]);

    // Assign colors to each year
    const yearColors = {
        2022: '#8884d8',
        2023: '#82ca9d',
        2024: '#ffc658'
    };

    // Check loading state
    if (keywordDataisLoading) {
        return <p>Loading...</p>;
    }

    // Check error state
    if (keywordDataError) {
        return <p>Error loading data: {keywordDataError.message}</p>;
    }

    // Render the Bar Chart
    return (
        <div className="keywords-container">
            <h1>Keywords Data - Apollo (2022+)</h1>

            {chartData.length > 0 ? (
                <Box sx={{ width: '100%', height: 400 }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            data={chartData}
                            margin={{
                                top: 5, right: 30, left: 20, bottom: 5,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="quarter" />
                            <YAxis />
                            <Tooltip />
                            {/* Render a Bar for each year with a different dataKey */}
                            <Bar dataKey="volume_2022" fill={yearColors[2022]} name="2022" />
                            <Bar dataKey="volume_2023" fill={yearColors[2023]} name="2023" />
                            <Bar dataKey="volume_2024" fill={yearColors[2024]} name="2024" />
                        </BarChart>
                    </ResponsiveContainer>
                </Box>
            ) : (
                <p>No keyword data available for "Apollo".</p>
            )}
        </div>
    );
};

export default Keywords;
