import useGetCallRailMissedCalls from "../../hooks/useGetCallRailMissedCalls";

const CallRailMissedCallTombstone = ({ fromDate, toDate }) => {
    const { callRailMissedCalls, callRailMissedCallsError, callRailMissedCallsisLoading } = useGetCallRailMissedCalls(fromDate, toDate);
    
    if (callRailMissedCallsisLoading) return <div>Loading...</div>;
    if (callRailMissedCallsError) return <div>Error fetching data: {callRailMissedCallsError}</div>;
    
    if (!callRailMissedCalls || callRailMissedCalls.length === 0) {
        return <div>No missed calls data available.</div>;
    }

    console.log('🔥');
    console.log(callRailMissedCalls);

    return (
        <div className="tombStoneBox">
            <div className={`tombStone tombStone`}>
                <div className="title"></div>
                <h2>Missed Calls</h2>
                <h3>{callRailMissedCalls[0].missed_calls}</h3>
            </div>
        </div>
    );
};

export default CallRailMissedCallTombstone;
