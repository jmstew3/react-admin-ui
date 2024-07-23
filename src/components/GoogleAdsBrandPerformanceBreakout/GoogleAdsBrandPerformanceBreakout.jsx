import React from 'react';
import { Table } from 'antd';
import useGetGoogleAdsBrandPerformanceBreakout from '../../hooks/useGetGoogleAdsBrandPerformanceBreakout';

const GoogleAdsBrandPerformanceBreakout = ({ fromDate, toDate }) => {
    const { googleAdsBrandPerformanceBreakout, googleAdsBrandPerformanceBreakoutError, googleAdsBrandPerformanceBreakoutisLoading } = useGetGoogleAdsBrandPerformanceBreakout(fromDate, toDate);

    if (googleAdsBrandPerformanceBreakoutisLoading) return <div>Loading...</div>;
    if (googleAdsBrandPerformanceBreakoutError) return <div>Error fetching data: {googleAdsBrandPerformanceBreakoutError}</div>;

    const columns = [
        {
            title: 'Brand',
            dataIndex: 'SEARCH_TERM',
            key: 'SEARCH_TERM',
            sorter: (a, b) => a.SEARCH_TERM.localeCompare(b.SEARCH_TERM)
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
                dataSource={googleAdsBrandPerformanceBreakout}
                columns={columns}
                rowKey={record => record.SEARCH_TERM}
                pagination={false}
            />
        </div>
    );
}

export default GoogleAdsBrandPerformanceBreakout;