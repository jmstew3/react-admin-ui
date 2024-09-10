// Apollo Market Share Card

const Card2 = ({ title, data, totalKSV }) => {

    const searchVolume = data.reduce((acc, item) => acc + parseInt(item.month_year_search_volume), 0);
    const marketShare = ((searchVolume / totalKSV) * 100).toFixed(2);

    // console.log(searchVolume, totalKSV, marketShare);

    return (
        <div className="card">
            <p className="card-title">{title}</p>
            <p className="card-desc">{marketShare} %</p>
        </div>
    );
};

export default Card2;