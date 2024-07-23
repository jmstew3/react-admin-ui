import React from 'react';
import { Table } from 'antd';
import useGetAnalyticsTopTen from '../../hooks/useGetAnalyticsTopTen';

const AnalyticsTopTenTable = ({ fromDate, toDate }) => {
    const { analyticsTopTen, analyticsTopTenError, analyticsTopTenisLoading } = useGetAnalyticsTopTen(fromDate, toDate);

    if (analyticsTopTenisLoading) return <div>Loading...</div>;
    if (analyticsTopTenError) return <div>Error fetching data: {analyticsTopTenError}</div>;

    const columns = [
        {
            title: 'Session / Medium',
            key: 'session_medium',
            render: (text, record) => `${record.SESSION_SOURCE} / ${record.SESSION_MEDIUM}`
        },
        {
            title: 'Users',
            dataIndex: 'users',
            key: 'users',
            sorter: (a, b) => b.users - a.users
        },
        {
            title: 'Total Sessions',
            dataIndex: 'total_sessions',
            key: 'total_sessions',
            sorter: (a, b) => b.total_sessions - a.total_sessions
        }
    ];

    return (
        <div style={{ width: '100%' }}>
            <Table
                dataSource={analyticsTopTen}
                columns={columns}
                rowKey={record => `${record.SESSION_SOURCE}-${record.SESSION_MEDIUM}`}
                pagination={false}
            />
        </div>
    );
}

export default AnalyticsTopTenTable;