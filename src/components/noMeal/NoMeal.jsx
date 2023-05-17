import { Link } from "react-router-dom";

import "./noMeal.css";

const NoMeal = () => {
  return (
    <div className="noMeal">
      <p>Sorry, the searched meal could not be found ...😞</p>
      <p>
        Try again, or <Link to={"/"}>return to All Meals.</Link>
      </p>
    </div>
  );
};

export default NoMeal;
