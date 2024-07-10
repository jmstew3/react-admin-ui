import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';

const data = [
    { "Date": "2024-06-01", "Users": 1371, "Sessions": 1413 },
    { "Date": "2024-06-02", "Users": 1133, "Sessions": 1174 },
    { "Date": "2024-06-03", "Users": 1535, "Sessions": 1607 },
    { "Date": "2024-06-04", "Users": 1703, "Sessions": 1789 },
    { "Date": "2024-06-05", "Users": 1545, "Sessions": 1614 },
    { "Date": "2024-06-06", "Users": 1505, "Sessions": 1567 },
    { "Date": "2024-06-07", "Users": 1377, "Sessions": 1422 },
    { "Date": "2024-06-08", "Users": 1164, "Sessions": 1230 },
    { "Date": "2024-06-09", "Users": 1276, "Sessions": 1330 },
    { "Date": "2024-06-10", "Users": 1564, "Sessions": 1623 },
    { "Date": "2024-06-11", "Users": 1303, "Sessions": 1386 },
    { "Date": "2024-06-12", "Users": 1299, "Sessions": 1361 },
    { "Date": "2024-06-13", "Users": 1188, "Sessions": 1268 },
    { "Date": "2024-06-14", "Users": 1119, "Sessions": 1187 },
    { "Date": "2024-06-15", "Users": 916, "Sessions": 965 },
    { "Date": "2024-06-16", "Users": 1083, "Sessions": 1160 },
    { "Date": "2024-06-17", "Users": 1634, "Sessions": 1753 },
    { "Date": "2024-06-18", "Users": 1595, "Sessions": 1693 },
    { "Date": "2024-06-19", "Users": 1486, "Sessions": 1558 },
    { "Date": "2024-06-20", "Users": 1401, "Sessions": 1492 },
    { "Date": "2024-06-21", "Users": 1412, "Sessions": 1513 },
    { "Date": "2024-06-22", "Users": 1269, "Sessions": 1370 },
    { "Date": "2024-06-23", "Users": 1211, "Sessions": 1271 },
    { "Date": "2024-06-24", "Users": 1339, "Sessions": 1397 },
    { "Date": "2024-06-25", "Users": 1430, "Sessions": 1506 },
    { "Date": "2024-06-26", "Users": 1356, "Sessions": 1435 },
    { "Date": "2024-06-27", "Users": 1284, "Sessions": 1357 },
    { "Date": "2024-06-28", "Users": 1324, "Sessions": 1377 },
    { "Date": "2024-06-29", "Users": 1573, "Sessions": 1677 },
    { "Date": "2024-06-30", "Users": 1348, "Sessions": 1456 }
];

const GoogleAnalyticsLineChart = () => (
  <ResponsiveContainer width="100%" height={400}>
    <LineChart
      data={data}
      margin={{
        top: 5, right: 30, left: 20, bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="Date" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="Users" stroke="#8884d8" />
      <Line type="monotone" dataKey="Sessions" stroke="#82ca9d" />
    </LineChart>
  </ResponsiveContainer>
);

export default GoogleAnalyticsLineChart;
