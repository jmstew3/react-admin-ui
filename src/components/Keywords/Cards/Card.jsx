const Card = ({ title, volume }) => {
    return (
        <div className="card">
            <p className="card-title">{title}</p>
            <p className="card-desc">{volume}</p>
        </div>
    );
};

export default Card;