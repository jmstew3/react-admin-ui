import { ComposedChart, Bar, Line, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import "./tempChart.scss";

const TempChart = () => {
  const data = [
    { monthYear: "2023-11", totalJobs: 4894, totalRevenue: 3058320.60, newCustomers: 3385 },
    { monthYear: "2023-12", totalJobs: 4728, totalRevenue: 2744957.89, newCustomers: 3296 },
    { monthYear: "2023-07", totalJobs: 4768, totalRevenue: 3450401.63, newCustomers: 3259 },
    { monthYear: "2023-08", totalJobs: 4955, totalRevenue: 2859969.21, newCustomers: 3465 },
    { monthYear: "2023-09", totalJobs: 4109, totalRevenue: 2371571.14, newCustomers: 2936 },
    { monthYear: "2023-06", totalJobs: 4623, totalRevenue: 3578763.72, newCustomers: 3065 },
    { monthYear: "2023-10", totalJobs: 4569, totalRevenue: 3112757.84, newCustomers: 3092 }
  ];

//   return (
//     <div className="tempChart">
//         <h1>Jobs Completed By Category</h1>
//     <ResponsiveContainer width="100%" height={400}>
//       <BarChart
//         data={data}
//         margin={{
//           top: 20, right: 30, left: 20, bottom: 5,
//         }}
//       >
//         <CartesianGrid strokeDasharray="3 3" />
//         <XAxis dataKey="monthYear" />
//         <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
//         <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
//         <Tooltip />
//         <Legend />
//         <Bar yAxisId="left" dataKey="totalJobs" fill="#8884d8" name="Total Jobs" />
//         <Bar yAxisId="left" dataKey="newCustomers" fill="#ffc658" name="New Customers" />
//         <Bar yAxisId="right" dataKey="totalRevenue" fill="#82ca9d" name="Total Revenue" />
//       </BarChart>
//     </ResponsiveContainer>
//     </div>
//   );
// };
  return (
    <div className="tempChart">
        <h1>Jobs Completed By Category</h1>
    <ResponsiveContainer width="100%" height={400}>
      <ComposedChart
        data={data}
        margin={{
          top: 20, right: 30, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis />
        <YAxis />
        <Tooltip />
        <Legend />
        <CartesianGrid stroke="#f5f5f5" />
        <Area type="monotone" dataKey="totalJobs" fill="#8884d8" stroke="#8884d8" name="Total Jobs" />
        <Bar dataKey="newCustomers" barSize={20} fill="#ffc658" name="New Customers" />
        <Line type="monotone" dataKey="totalRevenue" stroke="#82ca9d" name="Total Revenue" />
      </ComposedChart>
    </ResponsiveContainer>
    </div>
  );
};

export default TempChart;