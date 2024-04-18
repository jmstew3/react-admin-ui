import "./topBox.scss"
import { topDealUsers } from "../../data"

const TopBox = () => {
    return (
        <div className="topBox">
            <h1>Top Users</h1>
            <div className="list">
                {topDealUsers.map((user) => (
                    <div className="listItem" key={user.id}>
                        <div className="user">
                            <img src={user.img} alt={user.name} />
                            <div className="userDetails">
                                <span className="username">{user.username}</span>
                                <span className="email">{user.email}</span>
                            </div>
                        </div>
                        <span className="amount">${user.amount}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default TopBox;