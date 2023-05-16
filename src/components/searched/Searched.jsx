import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useGlobalContext } from "../../Context";
import { BsBoxArrowUpRight, BsFillHeartFill, BsHeart } from "react-icons/bs";
import mealDB from "../../apis/mealsFetch";

import './searched.css'

const Searched = () => {
  const [searchedMeals, setSearchedMeals] = useState([]);
  const [screenSize, setScreenSize] = useState(window.innerWidth);

  const { addFavorite, removeFavorite, favorites } = useGlobalContext();

  const { id } = useParams();
  useEffect(() => {
    let isMounted = true;

    const fetchMeal = async () => {
      try {
        const {
          data: { meals },
        } = await mealDB.get("/search.php", {
          params: {
            s: id,
          },
        });
        if (meals) {
          if (isMounted) {
            setSearchedMeals(meals);
          }
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (isMounted) {
      fetchMeal();
    }
    return () => (isMounted = false);
  }, [id]);
  // console.log(id);
  // console.log(searchedMeals);

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
    if (searchedMeals.length <= 3) {
      return bigScreen;
    }
  };
  return (
    <section
      className="searched"
      style={screenSize <= 576 ? smallScreen : grid()}
    >
      {searchedMeals.map((singleMeal) => {
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

export default Searched;
