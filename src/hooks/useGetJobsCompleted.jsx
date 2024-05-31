import { useState, useEffect } from 'react';

function useGetJobsCompleted(fromDate, toDate) {
  const [jobsCompleted, setJobsCompleted] = useState([]);
  const [combinedResults, setCombinedResults] = useState([]);
  const [summaryMetrics, setSummaryMetrics] = useState([]);
  const [cityMetrics, setCityMetrics] = useState([]); // New state for city-based metrics

  useEffect(() => {
    fetch(`https://legitrix-api-7de7446c8b7e.herokuapp.com/api/v1/jobs-completed/apollo/jobs-completed/LEGIT_Jobs_Completed?startDate=${fromDate}&endDate=${toDate}`)
      .then(response => response.json())
      .then(data => {
        
        for(let i=0; i<data.length; i++){
          data[i].CityName = data[i].LocationAddress.split(',')[1].trim();
        }
        
        setJobsCompleted(data);
        processJobsData(data);
      });
  }, [fromDate, toDate]);

  function processJobsData(jobs) {
    const jobsCountPerMonth = new Map();
    const revenuePerMonth = new Map();
    const newCustomersPerMonth = new Map();
    const uniqueContactsPerMonth = new Map();
    const cityAggregation = new Map();

    jobs.forEach(job => {
        const { ScheduledDateYearMonth, TotalRevenue, CustomerId, CityName } = job;

        // Update total jobs per month
        jobsCountPerMonth.set(ScheduledDateYearMonth, (jobsCountPerMonth.get(ScheduledDateYearMonth) || 0) + 1);

        // Update total revenue per month
        revenuePerMonth.set(ScheduledDateYearMonth, (revenuePerMonth.get(ScheduledDateYearMonth) || 0) + parseFloat(TotalRevenue || 0));

        // Update city-based metrics
        if (!cityAggregation.has(CityName)) {
            cityAggregation.set(CityName, { totalRevenue: 0, jobsCompleted: 0 });
        }
        const cityStats = cityAggregation.get(CityName);
        cityStats.totalRevenue += parseFloat(TotalRevenue || 0);
        cityStats.jobsCompleted += 1;

        // Ensure there is a Set for the unique contacts per month
        if (!uniqueContactsPerMonth.has(ScheduledDateYearMonth)) {
            uniqueContactsPerMonth.set(ScheduledDateYearMonth, new Set());
        }
        uniqueContactsPerMonth.get(ScheduledDateYearMonth).add(CustomerId);

        // Update new customers per month using Set to ensure uniqueness
        if (!newCustomersPerMonth.has(ScheduledDateYearMonth)) {
            newCustomersPerMonth.set(ScheduledDateYearMonth, new Set());
        }
        newCustomersPerMonth.get(ScheduledDateYearMonth).add(CustomerId);
    });

    // Update city metrics in state
    const cityResults = Array.from(cityAggregation.entries()).map(([city, metrics]) => ({
      city,
      ...metrics
    }));
    setCityMetrics(cityResults);

    // Combine all metrics into a single sorted array for detailed chart
    const results = Array.from(jobsCountPerMonth.keys()).map(month => ({
        monthYear: month,
        TotalJobsBooked: jobsCountPerMonth.get(month),
        TotalRevenue: revenuePerMonth.get(month),
        NewCustomers: newCustomersPerMonth.get(month).size,
        TotalUniqueContacts: uniqueContactsPerMonth.get(month).size
    }));

    // Sort the results array by monthYear
    results.sort((a, b) => a.monthYear.localeCompare(b.monthYear));
    setCombinedResults(results);

    // Calculate monthly summary metrics
    const monthlySummaries = results.map(item => ({
        monthYear: item.monthYear,
        totalJobs: item.TotalJobsBooked,
        totalRevenue: item.TotalRevenue,
        newCustomers: item.NewCustomers,
        totalUniqueContacts: item.TotalUniqueContacts
    }));

    setSummaryMetrics(monthlySummaries);
  }

  // ** Get total revenue
  let totalRevenue = 0;
  for(let i=0; i<jobsCompleted.length; i++){
      totalRevenue += parseInt(jobsCompleted[i].TotalRevenue);
  }

  const totalJobs = jobsCompleted.length;

  
  const totalUniqueContactsCount = new Set(jobsCompleted.map(job => job.CustomerId)).size;
  const totalJobsBooked = new Set(jobsCompleted.map(job => job.JobId)).size;
  let bookingRate = ((totalUniqueContactsCount / totalJobsBooked) * 100);
  bookingRate = bookingRate.toFixed(2) + '%';

  // Expose the data and metadata
  return {
    jobsCompleted,
    combinedResults,
    summaryMetrics,
    bookingRate,
    cityMetrics,
    totalRevenue,
    totalJobs
  };
}

export default useGetJobsCompleted;
