import { useState, useEffect } from 'react';

function useGetCallDetails(fromDate, toDate) {
    const [ callDetails, setCallDetails ] = useState([]);
    const [ callDetailsError, setCallDetailsError ] = useState(null);
    const [ callDetailsisLoading, setCallDetailsisLoading ] = useState(false);

    useEffect(() => {
        const fetchCallDetails = async () => {
            setCallDetailsisLoading(true);
            setCallDetailsError(null);

            try {
                const response = await fetch(`https://legitrix-api-7de7446c8b7e.herokuapp.com/api/v1/calls/apollo/LEGIT_Calls_Report/details?startDate=${fromDate}&endDate=${toDate}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setCallDetails(data);
            } catch (error) {
                setCallDetailsError(error.message);
                setCallDetails([]);
            } finally {
                setCallDetailsisLoading(false);
            }
        };

        if (fromDate && toDate) {
            fetchCallDetails();
        }
    }, [fromDate, toDate])

    return { callDetails, callDetailsError, callDetailsisLoading };
}


export default useGetCallDetails;