import { useContext } from 'react';
import TopBox from "../../components/TopBox/TopBox"
import ChartBox from "../../components/ChartBox/ChartBox"
import PieChartBox from "../../components/PieChartBox/PieChartBox"
import BarChartBox from "../../components/BarChartBox/BarChartBox"
import BigChartBox from "../../components/BigChartBox/BigChartBox"
import TombStoneBox from "../../components/TombStoneBox/TombStoneBox"
import TempChart from '../../components/TempChart/TempChart'
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
      <div className="box box1"><TopBox /></div>
      <div className="box box0"><TombStoneBox data={jobsCompletedDetails}/></div>
      <div className="box box0"><TempChart /></div>=
      <div className="box box2"><ChartBox {...chartBoxUser}/></div>
      <div className="box box3"><ChartBox {...chartBoxProduct}/></div>
      <div className="box box4"><PieChartBox {...pieChartBoxData}/></div>
      <div className="box box5"><ChartBox {...chartBoxConversion}/></div>
      <div className="box box6"><ChartBox {...chartBoxRevenue}/></div>
      
      <div className="box box8"><BarChartBox {...barChartBoxVisit}/></div>
      <div className="box box9"><BarChartBox {...barChartBoxRevenue}/></div>
    </div>
  )
}

export default Home;
