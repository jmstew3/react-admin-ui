// useGetCallRailMissedCalls
import { useState, useEffect } from 'react';

function useGetCallRailMissedCalls(fromDate, toDate) {

    const [ callRailMissedCalls, setCallRailMissedCalls ] = useState([]);
    const [ callRailMissedCallsError, setCallRailMissedCallsError ] = useState(null);
    const [ callRailMissedCallsisLoading, setCallRailMissedCallsisLoading ] = useState(false);

    useEffect(() => {
        const fetchCallRailMissedCalls = async () => {
            setCallRailMissedCallsisLoading(true);
            setCallRailMissedCallsError(null);

            try {
                const response = await fetch(`https://legitrix-api-7de7446c8b7e.herokuapp.com/api/v1/callrail/apollo/missed-calls?startDate=${fromDate}&endDate=${toDate}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setCallRailMissedCalls(data);
            } catch (error) {
                setCallRailMissedCallsError(error.message);
                setCallRailMissedCalls([]);
            } finally {
                setCallRailMissedCallsisLoading(false);
            }
        };

        if (fromDate && toDate) {
            fetchCallRailMissedCalls();
        }
    }, [fromDate, toDate])

    return { callRailMissedCalls, callRailMissedCallsError, callRailMissedCallsisLoading };

}

export default useGetCallRailMissedCalls;