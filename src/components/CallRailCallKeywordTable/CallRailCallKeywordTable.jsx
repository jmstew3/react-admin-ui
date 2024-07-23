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
            key: 'calls',
            sorter: (a, b) => b.calls - a.calls
        }
    ];
    
    return (
        <div style={{width: '100%'}}>
            <Table
                dataSource={callRailCallsByKeyword}
                columns={columns}
                rowKey={record => record.KEYWORDS}
                pagination={false}
                scroll={{ y: 500 }}
            />
        </div>
    );
}

export default CallRailCallKeywordTable;
