import { useState, useEffect } from 'react';

function useGetCallChartData(fromDate, toDate) {
  const [callChartDetails, setCallChartDetails] = useState([]);
  const [callChartError, setCallChartError] = useState(null);
  const [callChartisLoading, setCallChartisLoading] = useState(false);

  useEffect(() => {
    const fetchCallChartDetails = async () => {
      setCallChartisLoading(true);
      setCallChartError(null);

      try {
        const response = await fetch(`https://legitrix-api-7de7446c8b7e.herokuapp.com/api/v1/blended/apollo/calls?startDate=${fromDate}&endDate=${toDate}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('API response:', data);

        if (data.topCities && Array.isArray(data.topCities) && data.topCities[0].cities && Array.isArray(data.topCities[0].cities)) {
          const normalizedData = data.topCities[0].cities.reduce((acc, item) => {
            const cityName = item.city ? item.city.trim().toLowerCase() : 'unknown';
            if (acc[cityName]) {
              acc[cityName].calls += item.calls;
            } else {
              acc[cityName] = { city: item.city || 'Unknown', calls: item.calls };
            }
            return acc;
          }, {});

          let formattedData = Object.values(normalizedData);
          console.log('Normalized and formatted data:', formattedData);

          // Combine smaller slices into "Other"
          const threshold = 100; // Define a threshold for the number of calls
          let otherCalls = 0;
          formattedData = formattedData.filter(item => {
            if (item.calls < threshold) {
              otherCalls += item.calls;
              return false;
            }
            return true;
          });

          if (otherCalls > 0) {
            formattedData.push({ city: 'Other', calls: otherCalls });
          }

          console.log('Final formatted data:', formattedData);
          setCallChartDetails(formattedData);
        } else {
          throw new Error('Invalid data structure: topCities or topCities[0].cities is missing or not an array');
        }
      } catch (error) {
        console.error('Fetch error:', error);
        setCallChartError(error.message);
        setCallChartDetails([]);
      } finally {
        setCallChartisLoading(false);
      }
    };

    if (fromDate && toDate) {
      fetchCallChartDetails();
    }
  }, [fromDate, toDate]);

  return { callChartDetails, callChartError, callChartisLoading };
}

export default useGetCallChartData;