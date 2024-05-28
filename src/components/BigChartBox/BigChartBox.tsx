import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import './bigChartBox.scss';

// const data = [
//     {
//       name: 'Mon',
//       upsell: 4000,
//       spend: 2400,
//       discounts: 2400,
//     },
//     {
//       name: 'Tue',
//       spend: 3000,
//       upsell: 1398,
//       discounts: 2210,
//     },
//     {
//       name: 'Wed',
//       spend: 2000,
//       upsell: 9800,
//       discounts: 2290,
//     },
//     {
//       name: 'Thu',
//       spend: 2780,
//       upsell: 3908,
//       discounts: 2000,
//     },
//     {
//       name: 'Fri',
//       spend: 1890,
//       upsell: 4800,
//       discounts: 2181,
//     },
//     {
//       name: 'Sat',
//       spend: 2390,
//       upsell: 3800,
//       discounts: 2500,
//     },
//     {
//       name: 'Sun',
//       spend: 3490,
//       upsell: 4300,
//       discounts: 2100,
//     },
//   ];

  function BigChartBox({data}) {
    console.log({data});
    return (
      <div className="bigChartBox">
        <h1>Revenue Analytics</h1>
        <div className="chart">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              width={500}
              height={400}
              data={data}
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              <XAxis dataKey="monthYear" />
              {/* <YAxis yAxisId="left" orientation="left" domain={[0, 'dataMax + 15000']} />
              <YAxis yAxisId="right" orientation="right" domain={[0, 'dataMax + 1500']} /> */}
              <Tooltip />
              <Area
                type="monotone"
                dataKey="TotalJobsBooked"
                stackId="1"
                stroke="#8884d8"
                yAxisId="left" dataKey="TotalJobsBooked" fill="#8884d8" 
                fill="#8884d8"
              />
              <Area
                type="monotone"
                dataKey="TotalRevenue"
                stackId="1"
                stroke="#82ca9d"
                fill="#82ca9d"
              />
              <Area
                type="monotone"
                dataKey="NewCustomers"
                stackId="1"
                stroke="#ffc658"
                fill="#ffc658"
              />
              <Area
                type="monotone"
                dataKey="TotalUniqueContacts"
                stackId="1"
                stroke="#ffc658"
                fill="#ffc658"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  }

  export default BigChartBox;
