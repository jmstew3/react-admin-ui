import React from 'react';
import { ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { callData } from '../../data';
import './callsComboChart.scss';

const CallsComboChart = () => {
  return (
    <div className="callsComboChart">
      <h2>Total Inbound vs Unique Inbound Calls</h2>
      <ResponsiveContainer width="100%" height={500}>
        <ComposedChart
          data={callData}
          margin={{
            top: 20, right: 30, left: 20, bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="monthYear" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="totalInboundCalls" barSize={70} fill="#8884D8" name="Total Inbound Calls" />
          <Line type="monotone" dataKey="totalUniqueInboundCalls" stroke="#82ca9d" name="Unique Inbound Calls" />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CallsComboChart;