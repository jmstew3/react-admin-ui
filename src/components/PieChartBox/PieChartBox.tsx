import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import './pieChartBar.scss';

type Props = {
        title: string;
        name: string;
        color: string;
        value: string;
        dataKey: string;
        chartData: object[];
}
const PieChartBox = (props: Props) => {
    return (
        <div className="pieChartBox">
            <h1>{props.title}</h1>
            <div className="chart">
                <ResponsiveContainer width="90%" height={300}>  
                    <PieChart>
                        <Tooltip
                            contentStyle={{background:"white", borderRadius:"5px", border:"none"}}
                        />
                        <Pie
                            data={props.chartData}
                            innerRadius={"70%"}
                            outerRadius={"90%"}
                            fill={props.color}
                            paddingAngle={5}
                            dataKey={props.dataKey}
                        >
                            {props.chartData.map((item, index) => ( // Use props.chartData instead of props.map
                                <Cell
                                    key={item.name}
                                    fill={item.color}
                                />
                            ))}
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>
                </div>
                <div className="options">
                    {props.chartData.map((item) => (
                        <div className="option" key={item.name}>
                            <div className="title">
                                <div className="dot" style={{ backgroundColor: item.color }}/>
                                <span>{item.name}</span>
                            </div>
                                <span>{item.value}</span>
                        </div>
                    ))}
            </div>
        </div>
    )
}

export default PieChartBox
