const Card2 = ({ title, data, keywordData, year }) => {
    let yearFilteredData;
    let searchVolume;
    let marketShare;
    let totalKSV;
    let totalKSVYearFiltered;

    if (year === "all") {
        searchVolume = data.reduce((acc, item) => acc + parseInt(item.month_year_search_volume || 0), 0);
        totalKSV = keywordData.reduce((acc, item) => acc + parseInt(item.month_year_search_volume || 0), 0);
        marketShare = ((searchVolume / totalKSV) * 100).toFixed(2);
    } else {
        yearFilteredData = data.filter(item => item.year.includes(year));
        totalKSVYearFiltered = keywordData.filter(item => item.year.includes(year));

        searchVolume = yearFilteredData.reduce((acc, item) => acc + parseInt(item.month_year_search_volume || 0), 0);
        totalKSV = totalKSVYearFiltered.reduce((acc, item) => acc + parseInt(item.month_year_search_volume || 0), 0);

        marketShare = ((searchVolume / totalKSV) * 100).toFixed(2);
    }

    // Determine if the market share is positive or negative
    const isPositive = marketShare >= 0;

    return (
        <div className="card">
            <p className="card-title">{title}</p>
            <p className="card-desc">
                {isPositive ? (
                    <span className="positive-status">▲</span>
                ) : (
                    <span className="negative-status">▼</span>
                )}
                {` ${marketShare} %`}
            </p>
        </div>
    );
};

export default Card2;
