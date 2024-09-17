const Card3 = ({ title, data, year }) => {

    let currentYearData = [];
    let previousYearData = [];
    let currentYearVolume = 0;
    let previousYearVolume = 0;
    let growthPercentage = 0;
    let displayMessage = '';

    if (year === "all") {
        displayMessage = "- %";
    } else {
        // Filter data for the selected year and the previous year
        const currentYear = parseInt(year);
        const previousYear = currentYear - 1;

        // Filter data for the current year
        currentYearData = data.filter(item => parseInt(item.year) === currentYear);
        
        // Filter data for the previous year, but only for the same months available in the current year
        const availableMonths = currentYearData.map(item => item.month); // Get months in the current year data
        previousYearData = data.filter(item => parseInt(item.year) === previousYear && availableMonths.includes(item.month));

        // Sum the search volume for the current year
        currentYearVolume = currentYearData.reduce((acc, item) => acc + parseInt(item.month_year_search_volume || 0), 0);

        // Sum the search volume for the previous year, matching the same months
        previousYearVolume = previousYearData.reduce((acc, item) => acc + parseInt(item.month_year_search_volume || 0), 0);

        // Calculate YoY growth if previous year volume is greater than 0
        if (previousYearVolume > 0) {
            growthPercentage = ((currentYearVolume - previousYearVolume) / previousYearVolume * 100).toFixed(2);
        } else {
            displayMessage = `- %`;
        }
    }

    // Determine if the growth is positive or negative
    const isPositive = growthPercentage >= 0;

    return (
        <div className="card">
            <p className="card-title">{title}</p>
            {year === "all" || previousYearVolume === 0 ? (
                <p className="card-desc">{displayMessage}</p>
            ) : (
                <p className="card-desc">
                    {isPositive ? (
                        <span className="positive-status">▲</span>
                    ) : (
                        <span className="negative-status">▼</span>
                    )}
                    {` ${growthPercentage} %`}
                </p>
            )}
        </div>
    );
};

export default Card3;
