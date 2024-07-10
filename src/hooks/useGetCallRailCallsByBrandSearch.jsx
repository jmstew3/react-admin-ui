import { useState, useEffect } from 'react';

function useGetCallRailCallsByBrandSearch(fromDate, toDate) {

    const [ callRailCallsByBrandSearch, setCallRailCallsByBrandSearch ] = useState([]);
    const [ callRailCallsByBrandSearchError, setCallRailCallsByBrandSearchError ] = useState(null);
    const [ callRailCallsByBrandSearchisLoading, setCallRailCallsByBrandSearchisLoading ] = useState(false);

    useEffect(() => {
        const fetchCallRailCallsByBrandSearch = async () => {
            setCallRailCallsByBrandSearchisLoading(true);
            setCallRailCallsByBrandSearchError(null);

            try {
                const response = await fetch(`https://legitrix-api-7de7446c8b7e.herokuapp.com/api/v1/callrail/apollo/calls-by-brand-search?startDate=${fromDate}&endDate=${toDate}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setCallRailCallsByBrandSearch(data);
            } catch (error) {
                setCallRailCallsByBrandSearchError(error.message);
                setCallRailCallsByBrandSearch([]);
            } finally {
                setCallRailCallsByBrandSearchisLoading(false);
            }
        };

        if (fromDate && toDate) {
            fetchCallRailCallsByBrandSearch();
        }
    }, [fromDate, toDate])

    return { callRailCallsByBrandSearch, callRailCallsByBrandSearchError, callRailCallsByBrandSearchisLoading };

}

export default useGetCallRailCallsByBrandSearch;