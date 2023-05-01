import { Link, NavLink } from "react-router-dom";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import "./navigation.css";

const Navigation = () => {
  return (
    <nav>
      <div className="container">
        <Link to="/" className="logo">
          Food et Moi
        </Link>
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          <p className="link"> All Meals</p>
        </NavLink>
        <NavLink
          to="/Favorites"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          <p className="counter">
            <MdOutlineFavoriteBorder />
            <span>8</span>
          </p>
        </NavLink>
      </div>
    </nav>
  );
};

export default Navigation;
