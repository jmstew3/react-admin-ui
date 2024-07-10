import { useState, useEffect } from 'react';

function useGetCallRailCallsByKeyword(fromDate, toDate) {

    const [ callRailCallsByKeyword, setCallRailCallsByKeyword ] = useState([]);
    const [ callRailCallsByKeywordError, setCallRailCallsByKeywordError ] = useState(null);
    const [ callRailCallsByKeywordisLoading, setCallRailCallsByKeywordisLoading ] = useState(false);

    useEffect(() => {
        const fetchCallRailCallsByKeyword = async () => {
            setCallRailCallsByKeywordisLoading(true);
            setCallRailCallsByKeywordError(null);

            try {
                const response = await fetch(`https://legitrix-api-7de7446c8b7e.herokuapp.com/api/v1/callrail/apollo/calls-by-keyword?startDate=${fromDate}&endDate=${toDate}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setCallRailCallsByKeyword(data);
            } catch (error) {
                setCallRailCallsByKeywordError(error.message);
                setCallRailCallsByKeyword([]);
            } finally {
                setCallRailCallsByKeywordisLoading(false);
            }
        };

        if (fromDate && toDate) {
            fetchCallRailCallsByKeyword();
        }
    }, [fromDate, toDate])

    return { callRailCallsByKeyword, callRailCallsByKeywordError, callRailCallsByKeywordisLoading };

}

export default useGetCallRailCallsByKeyword;