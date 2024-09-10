// Apollo Search Volume Card

const Card1 = ({ title, data, totalKSV }) => {

    const searchVolume = data.reduce((acc, item) => acc + parseInt(item.month_year_search_volume), 0);    

    return (
        <div className="card">
            <p className="card-title">{title}</p>
            <p className="card-desc">{searchVolume}</p>
        </div>
    );
};

export default Card1;