import { useContext } from "react";
import { DateContext, DateContextType } from "../../contexts/DateContext";
import "./tombStoneBox.scss";

interface TombStoneData {
    title: string;
    value: string;
}

interface TombStoneBoxProps {
    data: {
        totalRevenue: number;
        totalUniqueContactsCount: number;
        totalCompletedJobs: number;
        bookingRate: string;
    };
}

const TombStoneBox = ({ data } : TombStoneBoxProps) => {

  function formatCurrency(amount) {
    const number = parseFloat(amount);
    if (isNaN(number)) {
      console.error('Invalid amount:', amount); // Debug invalid amounts
      return 'Invalid amount';
    }
    return number.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
    });
  }

  console.log(data.totalRevenue);

  const tombstoneData: TombStoneData[] = [
    {
      title: "Total Revenue",
      value: data && data.totalRevenue !== undefined
        ? `${formatCurrency(data.totalRevenue).slice(0,-3)}`
        : "Loading...",
    },
    {
      title: "New Customers",
      value: data && data.totalUniqueContactsCount !== undefined
        ? `${data.totalUniqueContactsCount}`
        : "Loading...",
    },
    {
      title: "Completed Jobs",
      value: data && data.totalCompletedJobs !== undefined
        ? data.totalCompletedJobs
        : "Loading...",
    },
    {
      title: "Booking Rate",
      value: data && data.bookingRate !== undefined
        ? `${data.bookingRate}%`
        : "Loading...",
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
