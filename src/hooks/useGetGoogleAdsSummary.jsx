// This is the tomestone data.
import { useState, useEffect } from 'react';

function useGetGoogleAdsSummary(fromDate, toDate) {
    
        const [ googleAdsSummary, setGoogleAdsSummary ] = useState([]);
        const [ googleAdsSummaryError, setGoogleAdsSummaryError ] = useState(null);
        const [ googleAdsSummaryisLoading, setGoogleAdsSummaryisLoading ] = useState(false);
    
        useEffect(() => {
            const fetchGoogleAdsSummary = async () => {
                setGoogleAdsSummaryisLoading(true);
                setGoogleAdsSummaryError(null);
    
                try {
                    const response = await fetch(`https://legitrix-api-7de7446c8b7e.herokuapp.com/api/v1/googleads/apollo/summary?startDate=${fromDate}&endDate=${toDate}`);
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    const data = await response.json();
                    setGoogleAdsSummary(data);
                } catch (error) {
                    setGoogleAdsSummaryError(error.message);
                    setGoogleAdsSummary([]);
                } finally {
                    setGoogleAdsSummaryisLoading(false);
                }
            };
    
            if (fromDate && toDate) {
                fetchGoogleAdsSummary();
                console.log(googleAdsSummary)
            }
        }, [fromDate, toDate])
    
        return { googleAdsSummary, googleAdsSummaryError, googleAdsSummaryisLoading };
    
    }

    export default useGetGoogleAdsSummary;