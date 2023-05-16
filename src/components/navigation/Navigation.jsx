import { Link, NavLink } from "react-router-dom";
// import { MdOutlineFavoriteBorder } from "react-icons/md";
import { BsHeart } from "react-icons/bs";

import { useGlobalContext } from "../../Context";

import "./navigation.css";

const Navigation = () => {
  const { favorites } = useGlobalContext();

  return (
    <nav>
      <div className="container">
        <Link to="/" className="logo" id="#top">
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
            <BsHeart />
            {favorites.length > 0 && <span>{favorites.length}</span>}
          </p>
        </NavLink>
      </div>
    </nav>
  );
};

export default Navigation;
