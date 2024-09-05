import { useState, useEffect } from 'react';

function useGetKeywordData() {
    const [keywordData, setKeywordData] = useState([]);
    const [keywordDataByQuarter, setKeywordDataByQuarter] = useState({ Q1: [], Q2: [], Q3: [], Q4: [] });
    const [keywordDataError, setKeywordDataError] = useState(null);
    const [keywordDataisLoading, setKeywordDataisLoading] = useState(false);

    useEffect(() => {
        const fetchKeywordData = async () => {
            setKeywordDataisLoading(true);
            setKeywordDataError(null);

            try {
                const response = await fetch(`https://legitrix-api-7de7446c8b7e.herokuapp.com/api/v1/keywords`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setKeywordData(data);

                // Group data by quarter after fetching
                const groupedByQuarter = {
                    Q1: data.filter(row => row.quarter === 1),
                    Q2: data.filter(row => row.quarter === 2),
                    Q3: data.filter(row => row.quarter === 3),
                    Q4: data.filter(row => row.quarter === 4),
                };

                setKeywordDataByQuarter(groupedByQuarter);
            } catch (error) {
                setKeywordDataError(error.message);
                setKeywordData([]);
                setKeywordDataByQuarter({ Q1: [], Q2: [], Q3: [], Q4: [] });
            } finally {
                setKeywordDataisLoading(false);
            }
        };

        fetchKeywordData();
    }, []);

    return { keywordData, keywordDataByQuarter, keywordDataError, keywordDataisLoading };
}

export default useGetKeywordData;
