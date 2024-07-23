import React from 'react';
import { Table } from 'antd';
import useGetGoogleAdsPerformanceByCampaign from '../../hooks/useGetGoogleAdsPerformanceByCampaign';

const GoogleAdsCampaignPerformance = ({ fromDate, toDate }) => {
    const { googleAdsPerformanceByCampaign, googleAdsPerformanceByCampaignError, googleAdsPerformanceByCampaignisLoading } = useGetGoogleAdsPerformanceByCampaign(fromDate, toDate);

    if (googleAdsPerformanceByCampaignisLoading) return <div>Loading...</div>;
    if (googleAdsPerformanceByCampaignError) return <div>Error fetching data: {googleAdsPerformanceByCampaignError}</div>;

    const columns = [
        {
            title: 'Campaign Name',
            dataIndex: 'CAMPAIGN_NAME',
            key: 'CAMPAIGN_NAME',
            sorter: (a, b) => a.campaign_name.localeCompare(b.CAMPAIGN_NAME)
        },
        {
            title: 'Clicks',
            dataIndex: 'clicks',
            key: 'clicks',
            sorter: (a, b) => b.clicks - a.clicks
        },
        {
            title: 'Impressions',
            dataIndex: 'impressions',
            key: 'impressions',
            sorter: (a, b) => b.impressions - a.impressions
        },
        {
            title: 'Cost',
            dataIndex: 'cost',
            key: 'cost',
            sorter: (a, b) => b.cost - a.cost
        }        
    ];

    return (
        <div style={{ width: '100%' }}>
            <Table
                dataSource={googleAdsPerformanceByCampaign}
                columns={columns}
                rowKey={record => record.CAMPAIGN_NAME}
                pagination={false}
            />
        </div>
    );
}

export default GoogleAdsCampaignPerformance;