import {
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import { Tooltip } from "@mui/material";
import "./single.scss";



const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

const Single = () => {
  return (
    <div className="single">
      <div className="view">
        <div className="info">
          <div className="topInfo">
            <img src="../../public/Images/solo-female-1-ai.png" alt="" />
            <h1>Jane Doe</h1>
            <button>Update</button>
          </div>
          <div className="details">
            <div className="item">
              <span className="itemTitle">Full Name: </span>
              <span className="itemValue">Jane Doe</span>
            </div>
            <div className="item">
              <span className="itemTitle">Email: </span>
              <span className="itemValue">janedoe@gmail.com</span>
            </div>
            <div className="item">
              <span className="itemTitle">Phone: </span>
              <span className="itemValue">123 456 7890</span>
            </div>
            <div className="item">
              <span className="itemTitle">Status: </span>
              <span className="itemValue">Verified</span>
            </div>
            <div className="item">
              <span className="itemTitle">User Name: </span>
              <span className="itemValue">Jane Doe</span>
            </div>
          </div>
        </div>
        <hr />
        <div className="chart">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              width={500}
              height={300}
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="pv"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
              />
              <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="activityContainer">
        <h2>Latest Activities</h2>
        <ul>
          <li>
            <div className="activity">
              <p>Jane Doe completed a purchase</p>
              <time>1 day ago</time>
            </div>
          </li>
          <li>
            <div className="activity">
              <p>Jane Doe completed a review of the Logitech MX Master mouse</p>
              <time>12 days ago</time>
            </div>
          </li>
          <li>
            <div className="activity">
              <p>Jane Doe joined the rewards programt</p>
              <time>1 month ago</time>
            </div>
          </li>
          <li>
            <div className="activity">
              <p>Jane Doe complete a purchase of the iPhone 15</p>
              <time>2 months ago</time>
            </div>
          </li>
          <li>
            <div className="activity">
              <p>Jane Doe joined the mailing list</p>
              <time>1 year ago</time>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Single;
