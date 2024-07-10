import React from 'react';
import { Table } from 'antd';
import useGetCallRailSummary from '../../hooks/useGetCallRailSummary';

const CallRailSummaryTable = ({ fromDate, toDate }) => {
  const { callRailSummary, callRailSummaryError, callRailSummaryisLoading } = useGetCallRailSummary(fromDate, toDate);

  if (callRailSummaryisLoading) return <div>Loading...</div>;
  if (callRailSummaryError) return <div>Error fetching data: {callRailSummaryError}</div>;

  const columns = [
    {
      title: 'Year',
      dataIndex: 'year',
      key: 'year'
    },
    {
      title: 'Month',
      dataIndex: 'month',
      key: 'month'
    },
    {
      title: 'Answered Calls',
      dataIndex: 'answered_calls',
      key: 'answered_calls'
    },
    {
      title: 'Missed Calls',
      dataIndex: 'missed_calls',
      key: 'missed_calls'
    },
    {
      title: 'Abandoned Calls',
      dataIndex: 'abandoned_calls',
      key: 'abandoned_calls'
    }
  ];

  return (
    <div>
      <Table
        dataSource={callRailSummary}
        columns={columns}
        rowKey={record => `${record.year}-${record.month}`}
        pagination={false}
      />
    </div>
  );
};

export default CallRailSummaryTable;
