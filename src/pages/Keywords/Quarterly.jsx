import { useMemo } from "react";
import useGetKeywordData from "../../hooks/useGetKeywordData";
import './keywords.scss';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Box } from '@mui/material';

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

    let dataByQuarterYear = [];

    years.forEach((year) => {
      quarters.forEach((quarter) => {
        let quarterYear = `${quarter}-${year % 100}`; // Format quarter and year as Q1-22, Q2-22, etc.
        const sumVolume = keywordDataByQuarter[quarter]
          .filter((keyword) => {
            const keywordYear = parseInt(keyword.year, 10);
            return keyword.keyword_title === "Apollo" && keywordYear === year;
          })
          .reduce((acc, curr) => {
            const volume = parseFloat(curr.month_year_search_volume) || 0;
            return acc + volume;
          }, 0);

        dataByQuarterYear.push({
          quarterYear,
          volume: sumVolume,
        });
      });
    });

    return dataByQuarterYear;
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

    // Combine "Cincinnati MKT Data" and "Other"
    const othersVolume = sortedVolumes
      .slice(7)
      .reduce((acc, curr) => acc + curr.volume, 0);

    const cincinnatiIndex = apolloAndTopCompetitors.findIndex(
      (item) => item.keyword_title === "Cincinnati MKT Data"
    );

    if (cincinnatiIndex !== -1) {
      // If "Cincinnati MKT Data" exists, add its volume to others
      const cincinnatiVolume = apolloAndTopCompetitors[cincinnatiIndex].volume;
      apolloAndTopCompetitors.splice(cincinnatiIndex, 1); // Remove Cincinnati MKT Data
      // Combine Cincinnati and other volumes into "Other"
      apolloAndTopCompetitors.push({
        keyword_title: "Other",
        volume: othersVolume + cincinnatiVolume,
      });
    } else {
      // If no Cincinnati MKT Data, just add "Other"
      apolloAndTopCompetitors.push({
        keyword_title: "Other",
        volume: othersVolume,
      });
    }

    return apolloAndTopCompetitors;
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
                barSize={30} // Adjust the size of the bars
                barGap={5} // Adjust the gap between the bars
                barCategoryGap="10%" // Adjust the gap between groups of bars
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="quarterYear" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="volume" fill="#8884d8" />
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
                  label={(entry) =>
                    `${entry.keyword_title} MKT Data: ${entry.volume}`
                  }
                >
                  {pieChartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={pieColors[index % pieColors.length]}
                    />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </Box>
        </div>
      </div>
    </div>
  );
};

export default Keywords;
