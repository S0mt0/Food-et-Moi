import { useState, useEffect } from "react";
import { useGlobalContext } from "../../Context";
import { BsBoxArrowUpRight, BsFillHeartFill, BsHeart } from "react-icons/bs";
import { Link, useLocation } from "react-router-dom";

import "./meals.css";
import Loading from "../loading/Loading";
import NoMeal from "../noMeal/NoMeal";

const Meals = () => {
  const [screenSize, setScreenSize] = useState(window.innerWidth);
  const { allMeals, loading, noMeal, addFavorite, removeFavorite, favorites } =
    useGlobalContext();


    const location = useLocation();

    useEffect(() => {
      console.log("Location changed!", location.pathname);
    }, [location]);

  // Inline Style functions
  const checkSize = () => {
    setScreenSize(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", checkSize);

    return () => {
      window.removeEventListener("resize", checkSize);
    };
  });

  const smallScreen = {
    gridTemplateColumns: "1fr",
  };

  const bigScreen = {
    gridTemplateColumns: "repeat(3, minmax(14rem, 1fr))",
  };

  const grid = () => {
    if (allMeals.length <= 3) {
      return bigScreen;
    }
  };

  // Conditional Renderings
  if (loading) {
    return <Loading />;
  }

  if (noMeal) {
    return <NoMeal />;
  }

  return (
    <section className="meals" style={screenSize <= 576 ? smallScreen : grid()}>
      {allMeals.map((singleMeal) => {
        const {
          idMeal: id,
          strMeal: name,
          strMealThumb: image,
          strCategory: cat,
        } = singleMeal;
        return (
          <article key={id} className="singleMeal">
            <div className="image" title={`Learn more about ${name}`}>
              <p className="category">
                Category: <span>{cat}</span>
              </p>
              <Link to={`details/${name}`}>
                <img src={image} alt={name} />
              </Link>
              <div className="overlay">
                <BsBoxArrowUpRight />
              </div>
            </div>
            <footer>
              <h3>{name}</h3>
              {favorites.find((meal) => id === meal.idMeal) ? (
                <BsFillHeartFill
                  style={{ color: "#f44336" }}
                  title="Remove from favorites"
                  onClick={() => removeFavorite(id)}
                />
              ) : (
                <BsHeart
                  title="Add to favorites"
                  onClick={() => addFavorite(id)}
                />
              )}
            </footer>
          </article>
        );
      })}
    </section>
  );
};

export default Meals;
