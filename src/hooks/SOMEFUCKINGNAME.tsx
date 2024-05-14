import { useState, useEffect, useContext } from "react";
import { DateContext } from "../contexts/DateContext";
import {DateRange} from "./../type";


const useGetJobsCompleted = (startDate, endDate) => {

  const [ jobsCompletedDetails, setJobsCompletedDetails ] = useEffect([]);

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    let day = ("0" + date.getDate()).slice(-2); // Adds leading zero if needed
    let month = ("0" + (date.getMonth() + 1)).slice(-2); // Adds leading zero if needed
    let year = date.getFullYear();
    return `${month}-${day}-${year}`; // Formats date as MM-DD-YYYY
  };

  const formattedStartDate = formatDate(startDate); // Assuming the formatDate function is defined somewhere
  const formattedEndDate = formatDate(endDate); // Assuming the formatDate function is defined somewhere

  useEffect(()=> {
    fetch(`https://legitrix-api-7de7446c8b7e.herokuapp.com/api/v1/jobs-completed/apollo/LEGIT_Jobs_Completed?startDate=${formattedStartDate}&endDate=${formattedEndDate}`)
      .then(response => response.json())
      .then(data => {
        setJobsCompletedDetails(data);
      });
  },[startDate, endDate]);
  
  
  return { jobsCompleted };
};

export default useGetJobsCompleted;
