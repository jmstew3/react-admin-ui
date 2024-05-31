import { useState, useEffect } from 'react';

function useGetJobsCompletedZipCodes(fromDate, toDate) {
    const [ zipCodeData, setZipCodeData ] = useState([]);
    const [ zipCodeDataError, setZipCodeDataError ] = useState(null);
    const [ zipCodeDataisLoading, setZipCodeDataisLoading ] = useState(false);

    useEffect(() => {
        const fetchZipCodes = async () => {
            setZipCodeDataisLoading(true);
            setZipCodeDataError(null);

            try {
                const response = await fetch(`https://legitrix-api-7de7446c8b7e.herokuapp.com/api/v1/jobs-completed/apollo/LEGIT_Jobs_Completed/zipcodes?startDate=${fromDate}&endDate=${toDate}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setZipCodeData(data);
            } catch (error) {
                setZipCodeDataError(error.message);
                setZipCodeData([]);
            } finally {
                setZipCodeDataisLoading(false);
            }
        };

        if (fromDate && toDate) {
            fetchZipCodes();
        }
    }, [fromDate, toDate])

    return { zipCodeData, zipCodeDataError, zipCodeDataisLoading };
}


export default useGetJobsCompletedZipCodes;