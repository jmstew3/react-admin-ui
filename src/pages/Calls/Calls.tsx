import "./calls.scss"
import { useContext } from 'react';
import { DateContext } from "../../contexts/DateContext";
import useGetCallDetails from '../../hooks/useGetCallDetails';
import useGetCallChartData from '../../hooks/useGetCallChartData';
import CallsTombstoneBox from "../../components/CallsTombstoneBox/CallsTombstonBox";


const Calls = () => {
  const { dateRange } = useContext(DateContext);
  const { callChartDetails, callChartisLoading, callChartError } = useGetCallChartData(dateRange.fromDate, dateRange.toDate);
  const { callDetails, callDetailsError, callDetailsisLoading } = useGetCallDetails(dateRange.fromDate, dateRange.toDate);

  
  function formatCurrency(amount) {
    const number = parseFloat(amount);
    if (isNaN(number)) {
      console.error('Invalid amount:', amount); // Debug invalid amounts
      return 'Invalid amount';
    }
    return number.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
    });
  }

  // console.log(callChartDetails)
  // console.log(callDetails)

  return (
    <div className="calls">
      
      <div className="box box0"></div>
      {callDetailsisLoading ? (
        
        <p>Loading...</p>
      ) : callDetailsError ? (  
        <p>Error: {callDetailsError}</p>
      ) : (
        <>
        <div className="box box0">
          <CallsTombstoneBox title="Total Calls" value={callDetails.totalCalls} />
          <CallsTombstoneBox title="Total Unique Calls" value={callDetails.totalUniqueCalls} />
          <CallsTombstoneBox 
            title="Total Revenue From Calls" 
            value={formatCurrency(callDetails.totalRevenue)} 
          />          
        </div>
        <p>Success! Call details fetched.</p>
          <pre>{JSON.stringify(callDetails, null, 2)}</pre> {/* Optional: display fetched data */}
        </>
      )}
      
      <hr />
      
      {callChartisLoading ? (
        <p>Loading...</p>
      ) : callChartError ? (
        <p>Error: {callChartError}</p>
      ) : (
        <div>
          <p>Success! Call details fetched.</p>
          <pre>{JSON.stringify(callChartDetails, null, 2)}</pre> {/* Optional: display fetched data */}
        </div>
      )}
    </div>
  )
}



export default Calls