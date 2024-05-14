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

  type JobsCompleted = {
    // Define the shape of the JobsCompleted data according to your API response
    // For example:
    totalJobs: number;
    // Add other relevant fields here
  };
  

  module.exports = {
    JobDetails,
    DateRange,
    JobsCompleted
  }