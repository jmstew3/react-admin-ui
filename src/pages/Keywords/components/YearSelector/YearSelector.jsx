const YearSelector = ({ year, setYear }) => {
    const handleChange = (event) => {
        setYear(event.target.value);
    };

    return (
        <>
            <p style={{
                textAlign: "right",
                marginBottom: "5px"
            }}>Select Year to Review:</p>
            <select className="year-selector" value={year} onChange={handleChange}>
                <option value="all">All Time</option>
                <option value="2024">2024</option>
                <option value="2023">2023</option>
                <option value="2022">2022</option>
                <option value="2021">2021</option>
                <option value="2020">2020</option>
            </select>
        </>
    );
};

export default YearSelector;
