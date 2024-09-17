// Apollo Search Volume Card

const Card4 = ({ title, data, totalKSV, year }) => {

    let yearFilteredData;
    let searchVolume;

    if(year === "all"){
        searchVolume = data.reduce((acc, item) => acc + parseInt(item.month_year_search_volume), 0);
    } else {
        yearFilteredData = data.filter(item => item.year.includes(year));
        searchVolume = yearFilteredData.reduce((acc, item) => acc + parseInt(item.month_year_search_volume), 0);
    }


    
    const formattedSearchVolume = searchVolume.toLocaleString();

    return (
        <div className="card">
            <p className="card-title">{title}</p>
            <p className="card-desc">{formattedSearchVolume}</p>
        </div>
    );
};

export default Card4;