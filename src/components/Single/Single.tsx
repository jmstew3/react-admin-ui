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

/* Why TS instead of JS? In JavaScript, which is a dynamically typed language, you can pass any type of data to a function or component without any restrictions. 
  This flexibility can lead to bugs that are hard to track down, because a function or component might be expecting a certain type of data, but receives something different. 
  TypeScript, on the other hand, is a statically typed superset of JavaScript. 
  This means that you can specify the types of data that a function or component should receive. 
  If you try to pass data of the wrong type, TypeScript will give you a compile-time error, making it easier to catch and fix bugs. 
  In the context of React components, defining the structure of the properties (props) that a component is expected to receive can be very helpful. 
  It makes it clear what data the component needs to function correctly, and ensures that the component is used correctly throughout your application. 
  For example, if a component is expecting a prop named `title` of type `string`, but you accidentally pass a number, TypeScript will give you an error. 
  This can help prevent bugs that might be caused by passing the wrong type of data to a component. */

type Props = {
  id: number;
  img?: string;
  title: string;
  info: object;
  chart?: {
    dataKeys: { name: string; color: string }[];
    data: object[];
  };
  activities?: { time: string; text: string };
};

// Single will take props as an argument from User component in User.tsx

const Single = (props: Props) => {
  return (
    <div className="single">
      <div className="view">
        <div className="info">
          <div className="topInfo">
            {props.img && <img src={props.img} alt="" />}
            <h1>{props.title}</h1>
            <button>Update</button>
          </div>
          <div className="details">
            {Object.entries(props.info).map((item) => (
              <div className="item" key={item[0]}>
                <span className="itemTitle">{item[0]}</span>
                <span className="itemValue">{item[1]}</span>
              </div>
            ))}
          </div>
        </div>
        <hr />
        {props.chart && (
          <div className="chart">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                width={500}
                height={300}
                // is props.chart.data because data is nested in chart object as per Props chart > data > object[]
                data={props.chart.data}
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
                {props.chart.dataKeys.map((dataKey) => (
                  <Line
                    type="monotone"
                    dataKey={dataKey.name}
                    stroke={dataKey.color}
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
      <div className="activities">
        <h2>Latest Activities</h2>
        {props.activities && (
          <ul>
            {props.activities.map((activity) => (
              <li key={activity.text}>
                <div>
                  <p>{activity.text}</p>
                  <time>{activity.time}</time>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

/* the <Single /> component is exported to be used in User component and will accept props as an argument 
  from {...singleUser} object within data.ts, resulting in <Single {...singleUser} /> in User component */

export default Single;
