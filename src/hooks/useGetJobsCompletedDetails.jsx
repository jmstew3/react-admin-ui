import { useState, useEffect } from 'react';

const useGetJobsCompletedDetails = (fromDate, toDate) => {

  const [jobsCompletedDetails, setJobsCompletedDetails] = useState([]);
    
  useEffect(()=> {
    fetch(`https://legitrix-api-7de7446c8b7e.herokuapp.com/api/v1/jobs-completed/apollo/LEGIT_Jobs_Completed/details?startDate=${fromDate}&endDate=${toDate}`)
      .then(response => response.json())
      .then(data => {        
        setJobsCompletedDetails(data);
      });
  },[fromDate, toDate]);
  
//   useEffect(()=>{
//     console.log(jobsCompletedDetails)
//   },[jobsCompletedDetails])
  
  return { jobsCompletedDetails };
};

export default useGetJobsCompletedDetails;