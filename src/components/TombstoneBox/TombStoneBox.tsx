import React, { useContext } from 'react';
import { Link } from "react-router-dom";
import { DateContext } from "../../contexts/DateContext";
import "./tombStoneBox.scss";

const TombStoneBox = () => {
    const { jobDetails, dateRange,setDateRange } = useContext(DateContext);
    const handleDateChange = (newFromDate: string, newToDate: string) => {
        setDateRange({ fromDate: newFromDate, toDate: newToDate});
    };
    
  return (
    <div className="tombStoneBox">
      <div className="tombStone tombStone1">
        <div className="title"></div>
        <h2>Total Revenue</h2>
        <h3>$1,200,000</h3>
      </div>
      <div className="tombStone tombStone2">
        <div className="title"></div>
        <h2>Created Jobs</h2>
        <h3>66,351</h3>
      </div>
      <div className="tombStone tombStone3">
        <div className="title"></div>
        <h2>Completed Jobs</h2>
        <h3>55.3k</h3>
      </div>
      <div className="tombStone tombStone4">
        <div className="title"></div>
        <h2>Booking Rate</h2>
        {jobDetails ? (
            <h3>
                {`${jobDetails.bookingRate}%`}
            </h3>
        ) : (
            <span>Loading...</span>
        )}
      </div>
      <div className="tombStone tombStone5">
        <div className="title"></div>
        <h2>New Customers</h2>
        <h3>14,650</h3>
      </div>
    </div>
  );
};

export default TombStoneBox;
