import React from 'react';
import { Table } from 'antd';
import useGetCallRailCallsByKeyword from '../../hooks/useGetCallRailCallsByKeyword';

const CallRailCallKeywordTable = ({ fromDate, toDate }) => {
    const { callRailCallsByKeyword, callRailCallsByKeywordError, callRailCallsByKeywordisLoading } = useGetCallRailCallsByKeyword(fromDate, toDate);
    
    if (callRailCallsByKeywordisLoading) return <div>Loading...</div>;
    if (callRailCallsByKeywordError) return <div>Error fetching data: {callRailCallsByKeywordError}</div>;
    
    const columns = [
        {
            title: 'Keyword',
            dataIndex: 'KEYWORDS',
            key: 'KEYWORDS'
        },
        {
            title: 'Calls',
            dataIndex: 'calls',
            key: 'calls'
        }
    ];
    
    return (
        <div>
            <Table
                dataSource={callRailCallsByKeyword}
                columns={columns}
                rowKey={record => record.KEYWORDS}
                pagination={false}
            />
        </div>
    );
}

export default CallRailCallKeywordTable;
