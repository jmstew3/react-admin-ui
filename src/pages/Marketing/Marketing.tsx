import React from 'react';
import MarketingBudgetTable from '../../components/MarketingBudgetTable/MarketingBudgetTable';
import './marketing.scss';
import { useContext } from "react";
import { DateContext } from "../../contexts/DateContext";

import useGetAnalyticsSummary from "../../hooks/useGetAnalyticsSummary";
import CallsTombstoneBox from "../../components/CallsTombstoneBox/CallsTombstonBox";
import GoogleAnalyticsLineChart from '../../components/GoogleAnalyticsLineChart/GoogleAnalyticsLineChart';

const Marketing: React.FC = () => {
  const { dateRange } = useContext(DateContext);
  const { analyticsSummary, isLoading, error } = useGetAnalyticsSummary(dateRange.fromDate, dateRange.toDate);
  

  const quickStyle = {
    display: 'flex',
    justifyContent: 'space-around',
    margin: '20px 0',
    gap: '20px'
  }


  return (
    <div className="marketing">
      <h1>Marketing</h1>
      <div style={quickStyle}>
        {analyticsSummary && analyticsSummary.length > 0 ? (
          <>
            <CallsTombstoneBox title="Active Users" value={analyticsSummary[0].active_users} />
            <CallsTombstoneBox title="New Users" value={analyticsSummary[0].new_users} />
            <CallsTombstoneBox title="Sessions" value={analyticsSummary[0].sessions} />
            <CallsTombstoneBox title="Engaged Sessions" value={analyticsSummary[0].engaged_sessions} />
            <CallsTombstoneBox title="Avg. Time On Site" value={`${parseInt(analyticsSummary[0].avg_time_on_site_seconds).toFixed(0)} Seconds`} />
          </>
        ) : (
          <p>No data available</p>
        )}
      </div>
      <br />
      <GoogleAnalyticsLineChart />
      
      {/* <MarketingBudgetTable /> */}
    </div>
  );
};

export default Marketing;