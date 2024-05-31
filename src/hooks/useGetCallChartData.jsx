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
        setCallChartDetails(data);
      } catch (error) {
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
