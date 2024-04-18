import { Link } from "react-router-dom";
import "./menu.scss"
import { menu } from "../../data";

const Menu = () => {
  return (
    <div className="menu">
      <div className="item">
        <span className="title">MAIN</span>
        <Link to="/" className="listItem">
          <img src="/home.svg" alt="" />
          <span className="listItemTitle">Home</span>
        </Link>
        <Link to="./business" className="listItem">
          <img src="/profile.svg" alt="" />
          <span className="listItemTitle">Business</span>
        </Link>
      </div>
      <div className="item">
      <span className="title">MAIN</span>
      <Link to="/" className="listItem">
        <img src="/home.svg" alt="" />
        <span className="listItemTitle">Calls</span>
      </Link>
      <Link to="./business" className="listItem">
        <img src="/profile.svg" alt="" />
        <span className="listItemTitle">Marketing</span>
      </Link>
      </div>
    </div>
  )
}

export default Menu
