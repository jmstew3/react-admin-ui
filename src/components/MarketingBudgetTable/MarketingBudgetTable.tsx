import React, { useEffect, useState } from 'react';
import { Table, message } from 'antd';
import axios from 'axios';

const MarketingBudgetTable: React.FC = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://legitrix-api-7de7446c8b7e.herokuapp.com/api/v1/budgets/all/budgets');
        setData(response.data.budgets);
        setLoading(false);
      } catch (error) {
        message.error('Failed to fetch data');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const columns = [
    {
      title: 'Brand',
      dataIndex: 'brand',
      key: 'brand',
    },
    {
      title: 'Budget Item',
      dataIndex: 'budgetItem',
      key: 'budgetItem',
    },
    {
      title: 'January',
      dataIndex: 'january',
      key: 'january',
    },
    {
      title: 'February',
      dataIndex: 'february',
      key: 'february',
    },
    {
      title: 'March',
      dataIndex: 'march',
      key: 'march',
    },
    {
      title: 'April',
      dataIndex: 'april',
      key: 'april',
    },
    {
      title: 'May',
      dataIndex: 'may',
      key: 'may',
    },
    {
      title: 'June',
      dataIndex: 'june',
      key: 'june',
    },
    {
      title: 'July',
      dataIndex: 'july',
      key: 'july',
    },
    {
      title: 'August',
      dataIndex: 'august',
      key: 'august',
    },
    {
      title: 'September',
      dataIndex: 'september',
      key: 'september',
    },
    {
      title: 'October',
      dataIndex: 'october',
      key: 'october',
    },
    {
      title: 'November',
      dataIndex: 'november',
      key: 'november',
    },
    {
      title: 'December',
      dataIndex: 'december',
      key: 'december',
    },
  ];

  return (
    <Table
      dataSource={data}
      columns={columns}
      rowKey="budgetItem"
      loading={loading}
      pagination={false}
    />
  );
};

export default MarketingBudgetTable;