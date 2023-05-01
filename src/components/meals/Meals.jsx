import { useGlobalContext } from "../../Context";
import { BsBoxArrowUpRight, BsFillHeartFill, BsHeart } from "react-icons/bs";

import "./meals.css";

const Meals = () => {
  const { allMeals, loading, isFavorite, setIsFavorite } = useGlobalContext();

  // console.log(allMeals);
  return (
    <section className="meals">
      {allMeals.map((meal) => {
        const { idMeal: id, strMeal: name, strMealThumb: image } = meal;
        return (
          <article key={id} className="singleMeal">
            <div className="image" title={`Learn more about ${name}`}>
              <img src={image} alt={name} />
              <div className="overlay">
                <BsBoxArrowUpRight />
              </div>
            </div>
            <footer>
              <h3>{name}</h3>
              {isFavorite ? (
                <BsFillHeartFill
                  className="red"
                  onClick={() => setIsFavorite(false)}
                  title="Remove from favorites"
                />
              ) : (
                <BsHeart
                  title="Add to favorites"
                  onClick={() => setIsFavorite(true)}
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
