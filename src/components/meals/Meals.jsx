// import { useRef, useEffect } from "react";
import { useGlobalContext } from "../../Context";
import { BsBoxArrowUpRight, BsFillHeartFill, BsHeart } from "react-icons/bs";
import { Link } from "react-router-dom";

import "./meals.css";
import Loading from "../loading/Loading";
import NoMeal from "../noMeal/NoMeal";

const Meals = () => {
  const { allMeals, loading, noMeal, handleFavorite } = useGlobalContext();

  if (loading) {
    return <Loading />;
  }

  if (noMeal) {
    return <NoMeal />;
  }

  return (
    <section className="meals">
      {allMeals.map((singleMeal) => {
        const { idMeal: id, strMeal: name, strMealThumb: image } = singleMeal;
        return (
          <article key={id} className="singleMeal">
            <div className="image" title={`Learn more about ${name}`}>
              <Link to={`Recipe/${name}`}>
                <img src={image} alt={name} />
              </Link>
              <div className="overlay">
                <BsBoxArrowUpRight />
              </div>
            </div>
            <footer>
              <h3>{name}</h3>
              <BsHeart title="Add to favorites" onClick={handleFavorite} />

              {/* {false ? (
                <BsFillHeartFill
                  className="red"
                  title="Remove from favorites"
                />
              ) : (
                <BsHeart title="Add to favorites" />
              )} */}
            </footer>
          </article>
        );
      })}
    </section>
  );
};

export default Meals;
