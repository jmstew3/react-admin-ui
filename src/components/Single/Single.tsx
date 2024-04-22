import "./single.scss";

const Single = () => {
  return (
    <div className="single">
      <div className="view">
        <div className="info">
          <div className="topInfo">
            <img src="../../public/Images/solo-female-1-ai.png" alt="" />
            <h2>Jane Doe</h2>
            <button>Update</button>
          </div>
          <div className="details">
            <span>Username: Janedoe99</span>
            <span>Fullname: Jane Doe</span>
            <span>Email: janedoe@gmail.com</span>
            <span>Phone: 123 456 7890</span>
            <span>Status: Verified</span>
          </div>
        </div>
        <div className="chart">
          <h2>Chart</h2>
        </div>
      </div>
      <div className="activityContainer">
        <h2>Latest Activities</h2>
        <div className="activities">
          <div className="activityBox">
            <h3>Jane Doe completed a purchase</h3>
            <span>1 day ago</span>
            <div className="dot"></div>
          </div>
          <div className="activityBox">
            <h3>Jane Doe added 3 items to her wishlist</h3>
            <span>3 days ago</span>
            <div className="dot"></div>
          </div>
          <div className="activityBox">
            <h3>Jane Doe completed a purchase</h3>
            <span>1 week ago</span>
            <div className="dot"></div>
          </div>
          <div className="activityBox">
            <h3>Jane Doe chatted with customer support</h3>
            <span>1 month ago</span>
            <div className="dot"></div>
          </div>
          <div className="activityBox">
            <h3>Jane Doe reviewed a product</h3>
            <span>2 months ago</span>
            <div className="dot"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Single;
