import React, { useState, useContext } from 'react';
import { DateContext } from '../../Contexts/DateContext';

const FromToDatePicker = () => {
  const { fromDate, toDate, setDateRange } = useContext(DateContext);

  const handleFromDateChange = (event) => {
    const newFromDate = event.target.value;
    setDateRange(prev => ({ ...prev, fromDate: newFromDate }));
  };

  const handleToDateChange = (event) => {
    const newToDate = event.target.value;
    setDateRange(prev => ({ ...prev, toDate: newToDate }));
  };

  return (
    <div className="date-picker">
      <label htmlFor="from-date">From: </label>
      <input
        type="date"
        id="from-date"
        value={fromDate}
        onChange={handleFromDateChange}
      /> &nbsp;&nbsp;
      <label htmlFor="to-date">To: </label>
      <input
        type="date"
        id="to-date"
        value={toDate}
        onChange={handleToDateChange}
        min={fromDate} // Ensure the "To" date cannot be before the "From" date
      />
      &nbsp;&nbsp;<input type="submit" id="date-submit" value="Go" />
    </div>
  );
};

export default FromToDatePicker;