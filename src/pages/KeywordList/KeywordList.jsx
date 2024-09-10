import React from 'react';
import useGetKeywordList from '../../hooks/useGetKeywordList';
import './keywordList.scss';

const KeywordList = () => {
    const { keywordList, keywordListError, keywordListisLoading } = useGetKeywordList();

    // Handle loading and error states
    if (keywordListisLoading) {
        return <p>Loading...</p>;
    }

    if (keywordListError) {
        console.error('Error fetching keyword list:', keywordListError);
        return <p>Error loading keyword list: {keywordListError}</p>;
    }

    // Safeguard to prevent .map() on undefined
    if (!keywordList || keywordList.length === 0) {
        return <p>No keywords available.</p>;
    }

    return (
        <div>
            <h1>Keyword List</h1>
            <ul>
                {keywordList.map(({ id, tenant_name, keyword, tp_brand }) => (
                    <li key={id}>
                        <strong>Tenant:</strong> {tenant_name} | <strong>Keyword:</strong> {keyword} | <strong>Type:</strong> {tp_brand}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default KeywordList;