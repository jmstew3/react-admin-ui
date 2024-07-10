import { useState, useEffect } from 'react';

function useGetFirstTimeCaller(fromDate, toDate) {

    const [ firstTimeCaller, setFirstTimeCaller ] = useState([]);
    const [ firstTimeCallerError, setFirstTimeCallerError ] = useState(null);
    const [ firstTimeCallerisLoading, setFirstTimeCallerisLoading ] = useState(false);

    useEffect(() => {
        const fetchFirstTimeCaller = async () => {
            setFirstTimeCallerisLoading(true);
            setFirstTimeCallerError(null);

            try {
                const response = await fetch(`https://legitrix-api-7de7446c8b7e.herokuapp.com/api/v1/callrail/apollo/first-time-caller?startDate=${fromDate}&endDate=${toDate}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setFirstTimeCaller(data);
            } catch (error) {
                setFirstTimeCallerError(error.message);
                setFirstTimeCaller([]);
            } finally {
                setFirstTimeCallerisLoading(false);
            }
        };

        if (fromDate && toDate) {
            fetchFirstTimeCaller();
        }
    }, [fromDate, toDate])

    return { firstTimeCaller, firstTimeCallerError, firstTimeCallerisLoading };

}

export default useGetFirstTimeCaller;