import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import './bigChartBox.scss';

const data = [
    {
      name: 'Mon',
      books: 4000,
      clothes: 2400,
      electronics: 2400,
    },
    {
      name: 'Tue',
      books: 3000,
      clothes: 1398,
      electronics: 2210,
    },
    {
      name: 'Wed',
      books: 2000,
      clothes: 9800,
      electronics: 2290,
    },
    {
      name: 'Thu',
      books: 2780,
      clothes: 3908,
      electronics: 2000,
    },
    {
      name: 'Fri',
      books: 1890,
      clothes: 4800,
      electronics: 2181,
    },
    {
      name: 'Sat',
      books: 2390,
      clothes: 3800,
      electronics: 2500,
    },
    {
      name: 'Sun',
      books: 3490,
      clothes: 4300,
      electronics: 2100,
    },
  ];

function BigChartBox() {
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
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Area 
                type="monotone" 
                dataKey="books" 
                stackId="1" 
                stroke="#8884d8" 
                fill="#8884d8"
            />
            <Area 
                type="monotone" 
                dataKey="clothes" 
                stackId="1" 
                stroke="#82ca9d" 
                fill="#82ca9d"
            />
            <Area 
                type="monotone" 
                dataKey="electronics" 
                stackId="1" 
                stroke="#ffc658" 
                fill="#ffc658"
            />
            </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default BigChartBox
