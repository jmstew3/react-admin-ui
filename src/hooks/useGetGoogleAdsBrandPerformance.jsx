import { useState, useEffect } from 'react';

function useGetGoogleAdsBrandPerformance(fromDate, toDate) {
    
        const [ googleAdsBrandPerformance, setGoogleAdsBrandPerformance ] = useState([]);
        const [ googleAdsBrandPerformanceError, setGoogleAdsBrandPerformanceError ] = useState(null);
        const [ googleAdsBrandPerformanceisLoading, setGoogleAdsBrandPerformanceisLoading ] = useState(false);
    
        useEffect(() => {
            const fetchGoogleAdsBrandPerformance = async () => {
                setGoogleAdsBrandPerformanceisLoading(true);
                setGoogleAdsBrandPerformanceError(null);
    
                try {
                    const response = await fetch(`https://legitrix-api-7de7446c8b7e.herokuapp.com/api/v1/googleads/apollo/brand-performance?startDate=${fromDate}&endDate=${toDate}`);
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    const data = await response.json();
                    setGoogleAdsBrandPerformance(data);
                } catch (error) {
                    setGoogleAdsBrandPerformanceError(error.message);
                    setGoogleAdsBrandPerformance([]);
                } finally {
                    setGoogleAdsBrandPerformanceisLoading(false);
                }
            };
    
            if (fromDate && toDate) {
                fetchGoogleAdsBrandPerformance();
            }
        }, [fromDate, toDate])
    
        return { googleAdsBrandPerformance, googleAdsBrandPerformanceError, googleAdsBrandPerformanceisLoading };
    
    }

export default useGetGoogleAdsBrandPerformance;