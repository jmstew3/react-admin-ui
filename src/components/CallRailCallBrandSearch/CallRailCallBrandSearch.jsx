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
            key: 'calls'
        }
    ];

    return (
        <div>
            <Table
                dataSource={callRailCallsByBrandSearch}
                columns={columns}
                rowKey={record => record.KEYWORDS}
                pagination={false}
            />
        </div>
    );

}


export default CallRailCallBrandSearch;