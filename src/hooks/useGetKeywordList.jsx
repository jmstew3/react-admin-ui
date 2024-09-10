import { useState, useEffect } from 'react';

function useGetKeywordList() {
    
    const [keywordList, setKeywordList] = useState([]);
    const [keywordListError, setKeywordListError] = useState(null);
    const [keywordListisLoading, setKeywordListisLoading] = useState(false);

    useEffect(() => {
        const fetchKeywordList = async () => {
            setKeywordListisLoading(true);
            setKeywordListError(null);

            try {
                const response = await fetch(`https://legitrix-api-7de7446c8b7e.herokuapp.com/api/v1/keywords/keyword-list`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setKeywordList(data);
            } catch (error) {
                setKeywordListError(error.message);
                setKeywordList([]);
            } finally {
                setKeywordListisLoading(false);
            }
        };

        fetchKeywordList();
    }, []);

    return { keywordList, keywordListError, keywordListisLoading };
}

export default useGetKeywordList;