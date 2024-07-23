import React from 'react';
import { Table } from 'antd';
import useGetGoogleAdsBrandPerformance from '../../hooks/useGetGoogleAdsBrandPerformance';

const GoogleAdsBrandPerformance = ({ fromDate, toDate }) => {
    const { googleAdsBrandPerformance, googleAdsBrandPerformanceError, googleAdsBrandPerformanceisLoading } = useGetGoogleAdsBrandPerformance(fromDate, toDate);

    if (googleAdsBrandPerformanceisLoading) return <div>Loading...</div>;
    if (googleAdsBrandPerformanceError) return <div>Error fetching data: {googleAdsBrandPerformanceError}</div>;

    const columns = [
        {
            title: 'Brand Status',
            dataIndex: 'Keyword_Type',
            key: 'Keyword_Type',
            sorter: (a, b) => a.Keyword_Type.localeCompare(b.Keyword_Type)
        },
        {
            title: 'Cost',
            dataIndex: 'cost',
            key: 'cost',
            sorter: (a, b) => b.cost - a.cost
        },        
        {
            title: 'Clicks',
            dataIndex: 'clicks',
            key: 'clicks',
            sorter: (a, b) => b.clicks - a.clicks
        },
        {
            title: 'Conversions',
            dataIndex: 'conversions',
            key: 'conversions',
            sorter: (a, b) => b.conversions - a.conversions
        }
        
    ];

    return (
        <div style={{ width: '100%' }}>
            <Table
                dataSource={googleAdsBrandPerformance}
                columns={columns}
                rowKey={record => record.BRAND}
                pagination={false}
            />
        </div>
    );
}

export default GoogleAdsBrandPerformance;