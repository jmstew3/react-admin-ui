import './callsTombstoneBox.scss';

const CallsTombstoneBox = ({title, value}) => {

    return (
        <div className="tombStoneBox">
            <div className={`tombStone tombStone`}>
                <div className="title"></div>
                <h2>{title}</h2>
                <h3>{value}</h3>
            </div>                
        </div>
    );
};

export default CallsTombstoneBox;