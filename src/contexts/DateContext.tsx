// DateContext.tsx
import React, { createContext, useState, useEffect, useContext } from 'react';

type JobDetails = {
  totalCompletedJobs: number;
  totalRevenue: number;
  totalUniqueContactsCount: number;
  totalJobsBooked: number;
  bookingRate: string;
};

type DateRange = {
  fromDate: string;
  toDate: string;
};

type DateContextType = {
  dateRange: DateRange;
  setDateRange: React.Dispatch<React.SetStateAction<DateRange>>;
  jobDetails: JobDetails | null;
  fetchJobDetails: (startDate: string, endDate: string) => void;
};

const DateContext = createContext<DateContextType | undefined>(undefined);

const DateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [dateRange, setDateRange] = useState<DateRange>({
    fromDate: '2023-01-01', // Default start date
    toDate: '2023-12-31',   // Default end date
  });

  

  // const formatDate = (dateString: string): string => {
  //   const date = new Date(dateString);
  //   let day = ("0" + date.getDate()).slice(-2); // Adds leading zero if needed
  //   let month = ("0" + (date.getMonth() + 1)).slice(-2); // Adds leading zero if needed
  //   let year = date.getFullYear();
  //   return `${month}-${day}-${year}`; // Formats date as MM-DD-YYYY
  // };

  return (
    <DateContext.Provider value={{ dateRange, setDateRange }}>
      {children}
    </DateContext.Provider>
  );
};

export { DateContext, DateProvider };