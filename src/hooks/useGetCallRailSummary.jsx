import { useState, useEffect } from 'react';

function useGetCallRailSummary(fromDate, toDate) {

    const [ callRailSummary, setCallRailSummary ] = useState([]);
    const [ callRailSummaryError, setCallRailSummaryError ] = useState(null);
    const [ callRailSummaryisLoading, setCallRailSummaryisLoading ] = useState(false);

    useEffect(() => {
        const fetchCallRailSummary = async () => {
            setCallRailSummaryisLoading(true);
            setCallRailSummaryError(null);

            try {
                const response = await fetch(`https://legitrix-api-7de7446c8b7e.herokuapp.com/api/v1/callrail/apollo/summary?startDate=${fromDate}&endDate=${toDate}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setCallRailSummary(data);
            } catch (error) {
                setCallRailSummaryError(error.message);
                setCallRailSummary([]);
            } finally {
                setCallRailSummaryisLoading(false);
            }
        };

        if (fromDate && toDate) {
            fetchCallRailSummary();
        }
    }, [fromDate, toDate])

    return { callRailSummary, callRailSummaryError, callRailSummaryisLoading };

}

export default useGetCallRailSummary;