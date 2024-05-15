import { useContext } from 'react';
import TopBox from "../../components/TopBox/TopBox"
import ChartBox from "../../components/ChartBox/ChartBox"
import PieChartBox from "../../components/PieChartBox/PieChartBox"
import BarChartBox from "../../components/BarChartBox/BarChartBox"
import BigChartBox from "../../components/BigChartBox/BigChartBox"
import TombStoneBox from "../../components/TombStoneBox/TombStoneBox"
import TempChart from '../../components/TempChart/TempChart'
import TempTable from '../../components/TempTable/TempTable'
import { chartBoxUser, chartBoxProduct, chartBoxRevenue, chartBoxConversion, barChartBoxVisit, barChartBoxRevenue, pieChartBoxData, } from "../../data"
import { DateContext } from "../../contexts/DateContext"



import "./home.scss"
import useGetJobsCompletedDetails from '../../hooks/useGetJobsCompletedDetails';
import useGetJobsCompletedByCat from '../../hooks/useGetJobsCompletedByCat'

const Home = () => {


const { dateRange } = useContext(DateContext);
// console.log(dateRange);

const { jobsCompletedDetails } = useGetJobsCompletedDetails(dateRange.fromDate, dateRange.toDate);
const { jobsCompletedCat } = useGetJobsCompletedByCat(dateRange.fromDate, dateRange.toDate);


  return (
    <div className="home">
      <div className="box box0"><TombStoneBox data={jobsCompletedDetails}/>Box 0</div>
      <div className="box box1"><TopBox />Box 1</div>
      <div className="box box2"><TempChart />Box 2</div>
      <div className="box box3"><ChartBox {...chartBoxUser}/>Box 3</div>
      <div className="box box4"><ChartBox {...chartBoxProduct}/>Box 4</div>
      <div className="box box5"><PieChartBox {...pieChartBoxData}/>Box 5</div>
      <div className="box box6"><ChartBox {...chartBoxConversion}/>Box 6</div>
      <div className="box box7"><ChartBox {...chartBoxRevenue}/>Box 7</div>
      <div className="box box8"><BarChartBox {...barChartBoxVisit}/>Box 8</div>
      <div className="box box9"><BarChartBox {...barChartBoxRevenue}/>Box 9</div>
      <div className="box box10"><TempTable />Box 10</div>
    </div>
  )
}

export default Home;
