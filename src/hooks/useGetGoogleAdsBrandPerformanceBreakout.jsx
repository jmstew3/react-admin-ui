import { useState, useEffect } from 'react';

function useGetGoogleAdsBrandPerformanceBreakout(fromDate, toDate) {

    const [ googleAdsBrandPerformanceBreakout, setGoogleAdsBrandPerformanceBreakout ] = useState([]);
    const [ googleAdsBrandPerformanceBreakoutError, setGoogleAdsBrandPerformanceBreakoutError ] = useState(null);
    const [ googleAdsBrandPerformanceBreakoutisLoading, setGoogleAdsBrandPerformanceBreakoutisLoading ] = useState(false);

    useEffect(() => {
        const fetchGoogleAdsBrandPerformanceBreakout = async () => {
            setGoogleAdsBrandPerformanceBreakoutisLoading(true);
            setGoogleAdsBrandPerformanceBreakoutError(null);

            try {
                const response = await fetch(`https://legitrix-api-7de7446c8b7e.herokuapp.com/api/v1/googleads/apollo/brand-performance-breakout?startDate=${fromDate}&endDate=${toDate}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setGoogleAdsBrandPerformanceBreakout(data);
            } catch (error) {
                setGoogleAdsBrandPerformanceBreakoutError(error.message);
                setGoogleAdsBrandPerformanceBreakout([]);
            } finally {
                setGoogleAdsBrandPerformanceBreakoutisLoading(false);
            }
        };

        if (fromDate && toDate) {
            fetchGoogleAdsBrandPerformanceBreakout();
        }
    }, [fromDate, toDate])

    return { googleAdsBrandPerformanceBreakout, googleAdsBrandPerformanceBreakoutError, googleAdsBrandPerformanceBreakoutisLoading };

}

export default useGetGoogleAdsBrandPerformanceBreakout;