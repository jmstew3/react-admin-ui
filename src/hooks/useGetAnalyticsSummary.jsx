import { useState, useEffect } from 'react';

function useGetAnalyticsSummary(fromDate, toDate) {

    const [ analyticsSummary, setAnalyticsSummary ] = useState([]);
    const [ analyticsSummaryError, setAnalyticsSummaryError ] = useState(null);
    const [ analyticsSummaryisLoading, setAnalyticsSummaryisLoading ] = useState(false);

    useEffect(() => {
        const fetchAnalyticsSummary = async () => {
            setAnalyticsSummaryisLoading(true);
            setAnalyticsSummaryError(null);

            try {
                const response = await fetch(`https://legitrix-api-7de7446c8b7e.herokuapp.com/api/v1/analytics/apollo/summary?startDate=${fromDate}&endDate=${toDate}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setAnalyticsSummary(data);
            } catch (error) {
                setAnalyticsSummaryError(error.message);
                setAnalyticsSummary([]);
            } finally {
                setAnalyticsSummaryisLoading(false);
            }
        };

        if (fromDate && toDate) {
            fetchAnalyticsSummary();
        }
    }, [fromDate, toDate])

    return { analyticsSummary, analyticsSummaryError, analyticsSummaryisLoading };

}

export default useGetAnalyticsSummary;