import { Link } from "react-router-dom";
import "./menu.scss"

const Menu = () => {
  return (
    <div className="menu">
      <div className="item">
        <span className="title">MAIN</span>
        <Link to="/">
          <img src="/home.svg" alt="" />
          <span className="listItemTitle">Home</span>
        </Link>
        <Link to="./business">
          <img src="/profile.svg" alt="" />
          <span className="listItemTitle">Business</span>
        </Link>
        <Link to="/">
          <img src="/home.svg" alt="" />
          <span className="listItemTitle">Calls</span>
        </Link>
        <Link to="./business">
          <img src="/profile.svg" alt="" />
          <span className="listItemTitle">Marketing</span>
        </Link>
      </div>
    </div>
  )
}

export default Menu
