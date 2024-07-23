import { useState, useEffect } from 'react';

function useGetAnalyticsTopTen(fromDate, toDate) {

    const [ analyticsTopTen, setAnalyticsTopTen ] = useState([]);
    const [ analyticsTopTenError, setAnalyticsTopTenError ] = useState(null);
    const [ analyticsTopTenisLoading, setAnalyticsTopTenisLoading ] = useState(false);

    useEffect(() => {
        const fetchAnalyticsTopTen = async () => {
            setAnalyticsTopTenisLoading(true);
            setAnalyticsTopTenError(null);

            try {
                const response = await fetch(`https://legitrix-api-7de7446c8b7e.herokuapp.com/api/v1/analytics/apollo/top-ten-source-medium?startDate=${fromDate}&endDate=${toDate}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setAnalyticsTopTen(data);
            } catch (error) {
                setAnalyticsTopTenError(error.message);
                setAnalyticsTopTen([]);
            } finally {
                setAnalyticsTopTenisLoading(false);
            }
        };

        if (fromDate && toDate) {
            fetchAnalyticsTopTen();
        }
    }, [fromDate, toDate])

    return { analyticsTopTen, analyticsTopTenError, analyticsTopTenisLoading };

}

export default useGetAnalyticsTopTen;