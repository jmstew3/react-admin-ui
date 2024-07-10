import useGetFirstTimeCaller from "../../hooks/useGetFirstTimeCaller";

const CallRailFirstTimeCaller = ({ fromDate, toDate }) => {

    const { firstTimeCaller, firstTimeCallerError, firstTimeCallerisLoading } = useGetFirstTimeCaller(fromDate, toDate);

    if (firstTimeCallerisLoading) return <div>Loading...</div>;
    if (firstTimeCallerError) return <div>Error fetching data: {firstTimeCallerError}</div>;

    if (!firstTimeCaller || firstTimeCaller.length === 0) {
        return <div>No first time caller data available.</div>;
    }

    console.log('🔥');
    console.log(firstTimeCaller);

    return (
        <div className="tombStoneBox">
            <div className={`tombStone tombStone`}>
                <div className="title"></div>
                <h2>First Time Callers</h2>
                <h3>{firstTimeCaller[0].first_time_callers}</h3>
            </div>
        </div>
    );
}

export default CallRailFirstTimeCaller;