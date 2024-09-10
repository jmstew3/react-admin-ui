// Apollo YoY Growth (No Dayton)
// !! Data is prefiltered for Apollo

const Card3 = ({ title, data, totalKSV }) => {

    const searchVolume = data.reduce((acc, item) => acc + parseInt(item.month_year_search_volume), 0);
    const marketShare = ((searchVolume / totalKSV) * 100).toFixed(2);

    const t2023 = data.filter(item => item.year === "2023");
    const t2024 = data.filter(item => item.year === "2024");

    const totalKSV2023 = t2023.reduce((acc, item) => acc + parseInt(item.month_year_search_volume), 0);
    const totalKSV2024 = t2024.reduce((acc, item) => acc + parseInt(item.month_year_search_volume), 0);

    // console.log(totalKSV2023, totalKSV2024);
    
    const growth = ((totalKSV2024 - totalKSV2023) / totalKSV2023) * 100;


    // Get sum for 2023
    // Get sum for 2024
    // Calculate YoY growth

    // console.log(searchVolume, totalKSV, marketShare);

    return (
        <div className="card">
            <p className="card-title">{title}</p>
            <p className="card-desc">{growth.toFixed(2)} %</p>
        </div>
    );
};

export default Card3;