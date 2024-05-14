import { useState, useEffect } from 'react';

const useGetJobsCompletedDetails = (fromDate, toDate) => {

  const [jobsCompletedDetails, setJobsCompletedDetails] = useState([]);
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    let day = ("0" + date.getDate()).slice(-2); // Adds leading zero if needed
    let month = ("0" + (date.getMonth() + 1)).slice(-2); // Adds leading zero if needed
    let year = date.getFullYear();
    return `${month}-${day}-${year}`; // Formats date as MM-DD-YYYY
  };

  let startDate = formatDate(fromDate);
  let endDate = formatDate(toDate)

  useEffect(()=> {
    fetch(`https://legitrix-api-7de7446c8b7e.herokuapp.com/api/v1/jobs-completed/apollo/LEGIT_Jobs_Completed/details?startDate=${startDate}&endDate=${endDate}`)
      .then(response => response.json())
      .then(data => {        
        setJobsCompletedDetails(data);
      });
  },[startDate, endDate]);
  
  useEffect(()=>{
    console.log(jobsCompletedDetails)
  },[jobsCompletedDetails])
  
  return { jobsCompletedDetails };
};

export default useGetJobsCompletedDetails;