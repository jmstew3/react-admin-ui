import { useMemo } from "react";
import useGetKeywordData from "../../hooks/useGetKeywordData";
import './keywords.scss';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';


const Keywords = () => {
  // Hook to get the keyword data
  const {
    keywordData,
    keywordDataByQuarter,
    keywordDataError,
    keywordDataisLoading,
  } = useGetKeywordData();

  // Data for the bar chart
  const barChartData = useMemo(() => {
    const years = [2022, 2023, 2024]; // Define the years you want to display
    const quarters = ["Q1", "Q2", "Q3", "Q4"];

    let dataByYear = [];

    years.forEach((year) => {
      let yearData = { year: `${year}` }; // Create an object for each year
      quarters.forEach((quarter) => {
        const sumVolume = keywordDataByQuarter[quarter]
          .filter((keyword) => {
            const keywordYear = parseInt(keyword.year, 10);
            return keyword.keyword_title === "Apollo" && keywordYear === year;
          })
          .reduce((acc, curr) => {
            const volume = parseFloat(curr.month_year_search_volume) || 0;
            return acc + volume;
          }, 0);

        // Add the summed volume for the quarter to the current year object
        yearData[`volume_${quarter}`] = sumVolume;
      });
      dataByYear.push(yearData);
    });

    return dataByYear;
  }, [keywordDataByQuarter]);

  // Data for the pie chart
  const pieChartData = useMemo(() => {
    const data2024 = keywordData.filter((keyword) => {
      const keywordYear = parseInt(keyword.year, 10);
      return keywordYear === 2024;
    });

    const summedVolumes = data2024.reduce((acc, curr) => {
      const title = curr.keyword_title;
      const volume = parseFloat(curr.month_year_search_volume) || 0;

      if (!acc[title]) {
        acc[title] = 0;
      }
      acc[title] += volume;

      return acc;
    }, {});

    const sortedVolumes = Object.entries(summedVolumes)
      .map(([keyword_title, volume]) => ({ keyword_title, volume }))
      .sort((a, b) => b.volume - a.volume);

    const apolloAndTopCompetitors = sortedVolumes.slice(0, 7);

    const othersVolume = sortedVolumes
      .slice(7)
      .reduce((acc, curr) => acc + curr.volume, 0);

    const finalPieData = [
      ...apolloAndTopCompetitors,
      { keyword_title: "Other", volume: othersVolume },
    ];

    return finalPieData;
  }, [keywordData]);

  const yearColors = {
    2022: "#8884d8",
    2023: "#82ca9d",
    2024: "#ffc658",
  };

  const pieColors = [
    "#8884d8",
    "#82ca9d",
    "#ffc658",
    "#d84a8b",
    "#4da8d8",
    "#a84d58",
    "#d8a84d",
    "#cccccc",
  ];

  if (keywordDataisLoading) {
    return <p>Loading...</p>;
  }

  if (keywordDataError) {
    return <p>Error loading data: {keywordDataError.message}</p>;
  }

  return (
    <div className="keywords">
      <h1>Apollo Q1 2024 Snapshot</h1>
      <div className="keywords-flex-container">
        <div className="container-left">
          {/* Bar Chart */}
          <Box sx={{ width: "100%", height: 400, marginBottom: 4 }}>
            {/* Bar Chart - Apollo Search Volume by Year and Quarter */}
            <h2>Apollo Brand Searches by Quarter</h2>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={barChartData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="volume_Q1" fill={yearColors[2022]} name="Q1" />
                <Bar dataKey="volume_Q2" fill={yearColors[2023]} name="Q2" />
                <Bar dataKey="volume_Q3" fill={yearColors[2024]} name="Q3" />
                <Bar dataKey="volume_Q4" fill={yearColors[2022]} name="Q4" />
              </BarChart>
            </ResponsiveContainer>
          </Box>
        </div>

        <div className="container-right">
          {/* Pie Chart */}
          <Box sx={{ width: "100%", height: 400, marginBottom: 4 }}>
            {/* Pie Chart - Keyword Share (2024) */}
            <h2>2024 Brand Search Mkt Share | Apollo</h2>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieChartData}
                  dataKey="volume"
                  nameKey="keyword_title"
                  cx="50%"
                  cy="50%"
                  outerRadius={150}
                  label
                >
                  {pieChartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={pieColors[index % pieColors.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Box>
        </div>
      </div>

      {/* Table for Pie Chart Data */}
      <TableContainer component={Paper}>
        <Table aria-label="keyword data table">
          <TableHead>
            <TableRow>
              <TableCell>Keyword Title</TableCell>
              <TableCell align="right">Search Volume</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pieChartData.map((row, index) => (
              <TableRow key={index}>
                <TableCell component="th" scope="row">
                  {row.keyword_title}
                </TableCell>
                <TableCell align="right">{row.volume}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Keywords;
