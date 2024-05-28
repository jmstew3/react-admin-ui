import React, { useState, useEffect, useContext } from 'react';
import "./navbar.scss";
import DatePicker from '../../components/DatePicker/DatePicker';
import { DateContext } from '../../contexts/DateContext';


const Navbar = () => {

  const { dateRange, setDateRange } = useContext(DateContext);
      
  // const formatDate = (dateString) => {
  //   const date = new Date(dateString);
  //   let day = ('0' + date.getDate()).slice(-2); // Adds leading zero if needed
  //   let month = ('0' + (date.getMonth() + 1)).slice(-2); // Adds leading zero if needed
  //   let year = date.getFullYear();
  //   return `${month}-${day}-${year}`; // Formats date as MM-DD-YYYY
  // };


  return (
    <div className="navbar">
      <div className="logo">
        <img src="/legit-consulting-logo.png" alt="Legit Conuslting Group logo" />
        <hr className="vertical-line" />
        <span className="title">Legitrix Business Intelligence™</span>
      </div>
      <div className="icons">
        <DatePicker  />
        <img src="/search.svg" alt="" className="icon" />
        <img src="/app.svg" alt="" className="icon" />
        <img src="/expand.svg" alt="" className="icon" />
        <div className="notification">
          <img src="/notifications.svg" alt="" />
          <span>1</span>
        </div>
        <div className="user">
          <img src="/Images/solo-female-1-ai.png" alt="" />
          <span>Jane Doe</span>
        </div>
        <img src="/settings.svg" alt="" className="icon" />
      </div>
    </div>
  );
};

export default Navbar;
