import { useState, useEffect } from 'react';

const useGetJobsCompletedByCat = (fromDate, toDate) => {

  const [jobsCompletedCat, setjobsCompletedCat] = useState([]);

  useEffect(()=> {
    fetch(`https://legitrix-api-7de7446c8b7e.herokuapp.com/api/v1/blended/apollo/jobs-completed?startDate=${fromDate}&endDate=${toDate}`)
      .then(response => response.json())
      .then(data => {        
        setjobsCompletedCat(data);
      });
  },[fromDate, toDate]);
  
  useEffect(()=>{
    console.log(jobsCompletedCat)
  },[jobsCompletedCat])
  
  return { jobsCompletedCat };
};

export default useGetJobsCompletedByCat;