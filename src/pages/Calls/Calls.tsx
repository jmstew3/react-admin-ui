import { useContext } from "react";
import { DateContext } from "../../contexts/DateContext";
import useGetCallDetails from "../../hooks/useGetCallDetails";
import useGetCallChartData from "../../hooks/useGetCallChartData";
import CallsTombstoneBox from "../../components/CallsTombstoneBox/CallsTombstonBox";
import CallsBarChart from "../../components/CallsBarChart/CallsBarChart";
import CallsPieChart from "../../components/CallsPieChart/CallsPieChart";
import CallsComboChart from "../../components/CallsComboChart/CallsComboChart";
import "./calls.scss";


import CallRailSummaryTable from "../../components/CallRailSummaryTable/CallRailSummaryTable";
import CallRailMissedCallTombstone from "../../components/CallRailMissedCallTombstone/CallRailMissedCallTombstone";
import CallRailFirstTimeCaller from "../../components/CallRailFirstTimeCaller/CallRailFirstTimeCaller";

import CallRailCallKeywordTable from "../../components/CallRailCallKeywordTable/CallRailCallKeywordTable";
import CallRailCallBrandSearch from "../../components/CallRailCallBrandSearch/CallRailCallBrandSearch";

interface CallDetails {
  totalCalls: number;
  totalUniqueCalls: number;
  totalRevenue: number;
  city: string;
  calls: number;
}

interface CallChartData {
  // Define the properties of the call chart data
}

interface DateRange {
  fromDate: string;
  toDate: string;
}

interface DateContextType {
  dateRange: DateRange;
}

const Calls = () => {
  const { dateRange } = useContext(DateContext) as DateContextType;

  const { callChartDetails, callChartisLoading, callChartError, unknownCalls } =
    useGetCallChartData(dateRange.fromDate, dateRange.toDate) as {
      callChartDetails: CallChartData[];
      callChartisLoading: boolean;
      callChartError: string | null;
      unknownCalls: number;
    };
  const { callDetails, callDetailsError, callDetailsisLoading } =
    useGetCallDetails(dateRange.fromDate, dateRange.toDate) as {
      callDetails: CallDetails;
      callDetailsError: string | null;
      callDetailsisLoading: boolean;
    };

  function formatCurrency(amount: string) {
    const number = parseFloat(amount);
    if (isNaN(number)) {
      console.error("Invalid amount:", amount); // Debug invalid amounts
      return "Invalid amount";
    }
    return number.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  }

  if (callDetailsisLoading || callChartisLoading) {
    return <p>Loading...</p>;
  }

  if (callDetailsError || callChartError) {
    return <p>Error: {callDetailsError || callChartError}</p>;
  }

  return (
    <div className="calls">
      <div className="box box0">
        <CallsTombstoneBox title="Total Calls" value={callDetails.totalCalls} />
        <CallsTombstoneBox
          title="Total Unique Calls"
          value={callDetails.totalUniqueCalls}
        />
        <CallsTombstoneBox
          title="Total Revenue From Calls"
          value={formatCurrency(callDetails.totalRevenue)}
        />
      </div>
      <div className="box box1">
        <CallsBarChart data={callChartDetails} title="Calls by City"
         />
      </div>
      <div className="box box2">
        <CallsPieChart data={callChartDetails} />
      </div>
      {unknownCalls > 0 && (
        <div className="box box11">
          <h3>Unknown Calls</h3>
          <p>{unknownCalls} calls</p>
        </div>
      )}
      <div className="box box3">
        <CallsComboChart data={callChartDetails} />
      </div>

      <div className="box summaryTable">
        <CallRailSummaryTable fromDate={dateRange.fromDate} toDate={dateRange.toDate}/>
      </div>
      
      <div className="box callRailTombstones">
        <CallRailMissedCallTombstone fromDate={dateRange.fromDate} toDate={dateRange.toDate} />
        <CallRailFirstTimeCaller fromDate={dateRange.fromDate} toDate={dateRange.toDate} />
      </div>

      <div className="box keywordTable">
        <CallRailCallKeywordTable fromDate={dateRange.fromDate} toDate={dateRange.toDate} />
      </div>

      <div className="box brandSearchTable">
        <CallRailCallBrandSearch fromDate={dateRange.fromDate} toDate={dateRange.toDate} />
      </div>
    

    </div>
  );
};

export default Calls;