import React from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import useGetGoogleAdsPerformanceByCampaign from '../../hooks/useGetGoogleAdsPerformanceByCampaign';

const BubbleChartComponent = ({ fromDate, toDate }) => {
    const { googleAdsPerformanceByCampaign, googleAdsPerformanceByCampaignError, googleAdsPerformanceByCampaignisLoading } = useGetGoogleAdsPerformanceByCampaign(fromDate, toDate);

    if (googleAdsPerformanceByCampaignisLoading) return <div>Loading...</div>;
    if (googleAdsPerformanceByCampaignError) return <div>Error fetching data: {googleAdsPerformanceByCampaignError}</div>;

    // Compute conversion rate, prepare data for the chart, and generate unique colors for each campaign
    const processData = googleAdsPerformanceByCampaign.map(item => ({
        ...item,
        conversion_rate: item.clicks ? (item.conversions / item.clicks) * 100 : 0,  // Conversion rate calculation
        size: 1200,  // Adjust size for better visibility
        color: `#${Math.floor(Math.random()*16777215).toString(16)}`  // Generate a random color for each campaign
    }));

    return (
        <div style={{ display: 'flex', width: '100%', height: 400 }}>
            <ResponsiveContainer width="75%" height="100%">
                <ScatterChart margin={{ top: 20, right: 30, bottom: 20, left: 20 }}>
                    <CartesianGrid />
                    <XAxis type="number" dataKey="conversion_rate" name="Conversion Rate" unit="%" />
                    <YAxis type="number" dataKey="conversions" name="Conversions" />
                    <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                    {processData.map((entry, index) => (
                        <Scatter key={index} name={entry.CAMPAIGN_NAME} data={[entry]} fill={entry.color}>
                            <Scatter key={`campaign-${index}`} name={entry.CAMPAIGN_NAME} data={[entry]} fill={entry.color} />
                        </Scatter>
                    ))}
                </ScatterChart>
            </ResponsiveContainer>
            <div style={{ width: '25%', height: '100%', overflowY: 'auto', padding: '10px' }}>
                <h3>Campaign Names</h3>
                <ul>
                    {processData.map((entry, index) => (
                        <li key={index} style={{ listStyleType: 'none', padding: '5px' }}>
                            <span style={{ color: entry.color, fontWeight: 'bold' }}>{entry.CAMPAIGN_NAME}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default BubbleChartComponent;
