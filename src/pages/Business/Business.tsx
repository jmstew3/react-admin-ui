import { useState, useEffect, useContext } from "react";
import { GridColDef } from "@mui/x-data-grid";
import { business } from "../../data";
import DataTable from "../../components/DataTable/DataTable";
import "./business.scss"
import { DateContext } from '../../contexts/DateContext';

// JobsCompleted




const columns: GridColDef<(typeof rows)[number]>[] = [
  {
    field: "JobNumber",
    headerName: "Job Number",
    width: 90,
    type: "string"
  },
  {
    field: "JobType",
    headerName: "Job Type",
    width: 240,
    type: "string"
  },
  {
    field: "Campaign",
    headerName: "Campaign",
    width: 360,
    type: "string"
  },
  {
    field: "CampaignCategory",
    headerName: "Campaign Category",
    width: 270,
    type: "string"
  },
  {
    field: "Category",
    headerName: "Category",
    width: 90,
    type: "string"
  }
];

const Business = () => {
  const { dateRange, setDateRange } = useContext(DateContext);
  const [jobsCompleted, setJobsCompleted] = useState([]);

  const [details, setDetails] = useState({});

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    let day = ('0' + date.getDate()).slice(-2); // Adds leading zero if needed
    let month = ('0' + (date.getMonth() + 1)).slice(-2); // Adds leading zero if needed
    let year = date.getFullYear();
    return `${month}-${day}-${year}`; // Formats date as MM-DD-YYYY
  };

  let startDate = formatDate(dateRange.fromDate);
  let endDate = formatDate(dateRange.toDate);

  useEffect(() => {
    const fetchJobsCompleted = async () => {
      const url = `https://legitrix-api-7de7446c8b7e.herokuapp.com/api/v1/jobs-completed/apollo/LEGIT_Jobs_Completed/all-jobs?startDate=${startDate}&endDate=${endDate}`;
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setJobsCompleted(data);
      } catch (error) {
        console.error('Failed to fetch jobs completed:', error);
      }
    };
  
    fetchJobsCompleted();
  }, [startDate, endDate]);
 
  
  useEffect(() => {
    const fetchDetails = async () => {
      const url = `https://legitrix-api-7de7446c8b7e.herokuapp.com/api/v1/jobs-completed/apollo/LEGIT_Jobs_Completed/details?startDate=${startDate}&endDate=${endDate}`;
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setDetails(data);
      } catch (error) {
        console.error('Failed to fetch jobs completed:', error);
      }
    };
  
    fetchDetails();
  }, [startDate, endDate]);
  
  useEffect(()=>{
    console.log(jobsCompleted)
    console.log(jobsCompleted.length)
    console.log(details)
  },[jobsCompleted,details])

  return (
    <div className="business">
      <p>{details.bookingRate}</p>

      <DataTable slug="business" columns={columns} rows={business} />
    </div>
  )
}

export default Business
