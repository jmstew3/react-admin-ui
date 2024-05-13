import { useContext } from 'react';
import TopBox from "../../components/TopBox/TopBox"
import ChartBox from "../../components/ChartBox/ChartBox"
import PieChartBox from "../../components/PieChartBox/PieChartBox"
import BarChartBox from "../../components/BarChartBox/BarChartBox"
import BigChartBox from "../../components/BigChartBox/BigChartBox"
import TombStoneBox from "../../components/TombStoneBox/TombStoneBox"
import { chartBoxUser, chartBoxProduct, chartBoxRevenue, chartBoxConversion, barChartBoxVisit, barChartBoxRevenue, pieChartBoxData, } from "../../data"
import "./home.scss"
import { DateContext } from "../../contexts/DateContext"
import useGetJobsCompleted from "../../hooks/useGetJobsCompleted"



const Home = () => {

const {jobsCompleted, combinedResults, summaryMetrics, bookingRate, cityMetrics, totalRevenue, totalJobs } = useGetJobsCompleted()
const { fromDate, toDate } = useContext(DateContext);
  return (
    <div className="home">
      <div className="box box1"><TopBox /></div>
      <div className="box box0"><TombStoneBox/></div>
      <div className="box box2"><ChartBox {...chartBoxUser}/></div>
      <div className="box box3"><ChartBox {...chartBoxProduct}/></div>
      <div className="box box4"><PieChartBox {...pieChartBoxData}/></div>
      <div className="box box5"><ChartBox {...chartBoxConversion}/></div>
      <div className="box box6"><ChartBox {...chartBoxRevenue}/></div>
      <div className="box box7"><BigChartBox data={combinedResults} /></div>
      <div className="box box8"><BarChartBox {...barChartBoxVisit}/></div>
      <div className="box box9"><BarChartBox {...barChartBoxRevenue}/></div>
    </div>
  )
}

export default Home;
