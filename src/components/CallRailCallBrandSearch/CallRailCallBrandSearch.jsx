import React from 'react';
import { Table } from 'antd';
import useGetCallRailCallsByBrandSearch from '../../hooks/useGetCallRailCallsByBrandSearch';

const CallRailCallBrandSearch = ({ fromDate, toDate, brandSearch }) => {

    const { callRailCallsByBrandSearch, callRailCallsByBrandSearchError, callRailCallsByBrandSearchisLoading } = useGetCallRailCallsByBrandSearch(fromDate, toDate);
    console.log(callRailCallsByBrandSearch);
    if (callRailCallsByBrandSearchisLoading) return <div>Loading...</div>;
    if (callRailCallsByBrandSearchError) return <div>Error fetching data: {callRailCallsByBrandSearchError}</div>;

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
                dataSource={callRailCallsByBrandSearch}
                columns={columns}
                rowKey={record => record.KEYWORDS}
                pagination={false}
                scroll={{ y: 500 }}
            />
        </div>
    );

}


export default CallRailCallBrandSearch;