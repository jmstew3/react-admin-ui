import React, { useContext, useEffect } from 'react';
import { DateContext } from '../../contexts/DateContext';

const FromToDatePicker = () => {
  const { dateRange, setDateRange } = useContext(DateContext);

  

  const handleFromDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newFromDate = event.target.value;
    setDateRange(prev => ({ ...prev, fromDate: newFromDate }));
  };

  const handleToDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newToDate = event.target.value;
    setDateRange(prev => ({ ...prev, toDate: newToDate }));
  };

  return (
    <div className="date-picker">
      <label htmlFor="from-date">From: </label>
      <input
        type="date"
        id="from-date"
        value={dateRange.fromDate}
        onChange={handleFromDateChange}
      />
      &nbsp;&nbsp;
      <label htmlFor="to-date">To: </label>
      <input
        type="date"
        id="to-date"
        value={dateRange.toDate}
        onChange={handleToDateChange}
        min={dateRange.fromDate} // Ensure the "To" date cannot be before the "From" date
      />
      &nbsp;&nbsp;<input type="submit" id="date-submit" value="Go" />
    </div>
  );
};

export default FromToDatePicker;
