import React, { useContext } from "react";
import { DateContext } from "../../contexts/DateContext";
import "./tombStoneBox.scss";

const TombStoneBox = () => {
  const { jobDetails } = useContext(DateContext);

  const tombstoneData = [
    {
      title: "Total Revenue",
      value: jobDetails
        ? `$${jobDetails.totalRevenue.toLocaleString()}`
        : "Loading...",
    },
    {
      title: "New Customers",
      value: jobDetails
        ? jobDetails.totalUniqueContactsCount.toLocaleString()
        : "Loading...",
    },
    {
      title: "Booked Jobs",
      value: jobDetails
        ? jobDetails.totalJobsBooked.toLocaleString()
        : "Loading...",
    },
    {
      title: "Completed Jobs",
      value: jobDetails
        ? jobDetails.totalCompletedJobs.toLocaleString()
        : "Loading...",
    },
    {
      title: "Booking Rate",
      value: jobDetails ? `${jobDetails.bookingRate}%` : "Loading...",
    },
  ];

  return (
    <div className="tombStoneBox">
      {tombstoneData.map((item, index) => (
        <div key={index} className={`tombStone tombStone${index + 1}`}>
          <div className="title"></div>
          <h2>{item.title}</h2>
          <h3>{item.value}</h3>
        </div>
      ))}
    </div>
  );
};

export default TombStoneBox;
