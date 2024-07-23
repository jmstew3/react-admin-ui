import { useState, useEffect } from 'react';

function useGetGoogleAdsPerformanceByCampaign(fromDate, toDate) {
    
        const [ googleAdsPerformanceByCampaign, setGoogleAdsPerformanceByCampaign ] = useState([]);
        const [ googleAdsPerformanceByCampaignError, setGoogleAdsPerformanceByCampaignError ] = useState(null);
        const [ googleAdsPerformanceByCampaignisLoading, setGoogleAdsPerformanceByCampaignisLoading ] = useState(false);
    
        useEffect(() => {
            const fetchGoogleAdsPerformanceByCampaign = async () => {
                setGoogleAdsPerformanceByCampaignisLoading(true);
                setGoogleAdsPerformanceByCampaignError(null);
    
                try {
                    const response = await fetch(`https://legitrix-api-7de7446c8b7e.herokuapp.com/api/v1/googleads/apollo/performance-by-campaign?startDate=${fromDate}&endDate=${toDate}`);
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    const data = await response.json();
                    setGoogleAdsPerformanceByCampaign(data);
                } catch (error) {
                    setGoogleAdsPerformanceByCampaignError(error.message);
                    setGoogleAdsPerformanceByCampaign([]);
                } finally {
                    setGoogleAdsPerformanceByCampaignisLoading(false);
                }
            };
    
            if (fromDate && toDate) {
                fetchGoogleAdsPerformanceByCampaign();
            }
        }, [fromDate, toDate])
    
        return { googleAdsPerformanceByCampaign, googleAdsPerformanceByCampaignError, googleAdsPerformanceByCampaignisLoading };
    
    }

export default useGetGoogleAdsPerformanceByCampaign;
