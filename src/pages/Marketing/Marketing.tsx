import React from 'react';
import MarketingBudgetTable from '../../components/MarketingBudgetTable/MarketingBudgetTable';
import './marketing.scss';
import { useContext } from "react";
import { DateContext } from "../../contexts/DateContext";

import useGetAnalyticsSummary from "../../hooks/useGetAnalyticsSummary";
import CallsTombstoneBox from "../../components/CallsTombstoneBox/CallsTombstonBox";
import GoogleAnalyticsLineChart from '../../components/GoogleAnalyticsLineChart/GoogleAnalyticsLineChart';

import GoogleAnalyticsTopTenTable from '../../components/GoogleAnalyticsTopTenTable/GoogleAnalyticsTopTenTable';
import useGetGoogleAdsSummary from '../../hooks/useGetGoogleAdsSummary';
import GoogleAdsCampaignPerformance from '../../components/GoogleAdsCampaignPerformance/GoogleAdsCampaignPerformance';
import GoogleAdsBrandPerformance from '../../components/GoogleAdsBrandPerformance/GoogleAdsBrandPerformance';
import GoogleAdsBrandPerformanceBreakout from '../../components/GoogleAdsBrandPerformanceBreakout/GoogleAdsBrandPerformanceBreakout';
import GoogleAdsConversionByCampaign from '../../components/GoogleAdsConversionsByCampaign/GoogleAdsConversionsByCampaign';
import CustomBarChart from '../../components/ComboChartTest/ComboChartTest';

const Marketing: React.FC = () => {
  const { dateRange } = useContext(DateContext);
  const { analyticsSummary, isLoading, error } = useGetAnalyticsSummary(dateRange.fromDate, dateRange.toDate);

  const { googleAdsSummary, googleAdsSummaryError, googleAdsSummaryisLoading } = useGetGoogleAdsSummary(dateRange.fromDate, dateRange.toDate);
  

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
            <CallsTombstoneBox title="Avg. Time On Site" value={`${parseInt(analyticsSummary[0].avg_time_on_site_seconds).toFixed(0)}`} />
          </>
        ) : (
          <p>No data available</p>
        )}
      </div>
      <br />
      <GoogleAnalyticsLineChart />
      <br />
      <GoogleAnalyticsTopTenTable fromDate={dateRange.fromDate} toDate={dateRange.toDate} />
      <br /><br />
      <div style={quickStyle}>
        {googleAdsSummary && googleAdsSummary.length > 0 ? (
          <>
            <CallsTombstoneBox title="Clicks" value={googleAdsSummary[0].clicks} />
            <CallsTombstoneBox title="Impressions" value={googleAdsSummary[0].impressions} />
            <CallsTombstoneBox title="CTR" value={googleAdsSummary[0].ctr} />
            <CallsTombstoneBox title="Avg. CPC" value={googleAdsSummary[0].avg_cpc} />
            <CallsTombstoneBox title="Cost" value={googleAdsSummary[0].cost} />
          </>
        ) : (
          <p>No data available</p>
        )}
      </div>
      <div style={quickStyle}>
        <GoogleAdsCampaignPerformance fromDate={dateRange.fromDate} toDate={dateRange.toDate} />
      </div>
      
      <div style={quickStyle}>
        <GoogleAdsBrandPerformance fromDate={dateRange.fromDate} toDate={dateRange.toDate} />
      </div>
      
      <div style={quickStyle}>
        <GoogleAdsBrandPerformanceBreakout fromDate={dateRange.fromDate} toDate={dateRange.toDate} />
      </div>
      
      <div style={quickStyle}>
        <GoogleAdsConversionByCampaign fromDate={dateRange.fromDate} toDate={dateRange.toDate} />
      </div>
      
      <div style={quickStyle}>
        <CustomBarChart/>
      </div>
      {/* <MarketingBudgetTable /> */}
    </div>
  );
};

export default Marketing;