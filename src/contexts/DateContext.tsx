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

  const [jobDetails, setJobDetails] = useState<JobDetails | null>(null);

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    let day = ("0" + date.getDate()).slice(-2); // Adds leading zero if needed
    let month = ("0" + (date.getMonth() + 1)).slice(-2); // Adds leading zero if needed
    let year = date.getFullYear();
    return `${month}-${day}-${year}`; // Formats date as MM-DD-YYYY
  };

  const fetchJobDetails = async (startDate: string, endDate: string) => {
    const formattedStartDate = formatDate(startDate);
    const formattedEndDate = formatDate(endDate);
    const url = `https://legitrix-api-7de7446c8b7e.herokuapp.com/api/v1/jobs-completed/apollo/LEGIT_Jobs_Completed/details?startDate=${formattedStartDate}&endDate=${formattedEndDate}`;
    
    console.log(`Fetching job details from: ${url}`);
  
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }
      const data: JobDetails = await response.json();
      setJobDetails(data);
    } catch (error) {
      console.error("Failed to fetch job details:", error);
    }
  };

  useEffect(() => {
    fetchJobDetails(dateRange.fromDate, dateRange.toDate);
  }, [dateRange]);

  return (
    <DateContext.Provider value={{ dateRange, setDateRange, jobDetails, fetchJobDetails }}>
      {children}
    </DateContext.Provider>
  );
};

export { DateContext, DateProvider };
