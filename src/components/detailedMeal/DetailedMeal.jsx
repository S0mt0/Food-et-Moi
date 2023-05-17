import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { chef1 } from "../../assets";
import Loading from "../loading/Loading";
import { useGlobalContext } from "../../Context";
import { BsFillHeartFill, BsHeart } from "react-icons/bs";
import mealDB from "../../apis/mealsFetch";

import "./detailedMeal.css";

const DetailedMeal = () => {
  const [singleMeal, setSingleMeal] = useState([]);
  const [load, setLoad] = useState(true);
  const [isActive, setIsActive] = useState("instructions");
  const { name } = useParams();

  useEffect(() => {
    let isMounted = true;

    const fetchMeal = async () => {
      try {
        const {
          data: { meals },
        } = await mealDB.get("/search.php", {
          params: {
            s: name,
          },
        });
        if (meals) {
          if (isMounted) {
            setSingleMeal(meals[0]);
            setLoad(false);
          }
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (isMounted) {
      fetchMeal();
    }
    return () => {
      setSingleMeal([]);
      isMounted = false;
    };
  }, [name]);

  //
  const { favorites, addFavorite, removeFavorite } = useGlobalContext();

  const {
    strCategory: cat,
    strInstructions: steps,
    strMealThumb: image,
    strYoutube: yt,
    strMeal: mealName,
    strArea: area,
    strSource: source,

    strIngredient1: ing1,
    strIngredient2: ing2,
    strIngredient3: ing3,
    strIngredient4: ing4,
    strIngredient5: ing5,
    strIngredient6: ing6,
    strIngredient7: ing7,
    strIngredient8: ing8,
    strIngredient9: ing9,
    strIngredient10: ing10,
    strIngredient11: ing11,
    strIngredient12: ing12,
    strIngredient13: ing13,
    strIngredient14: ing14,
    strIngredient15: ing15,
    strIngredient16: ing16,
    strIngredient17: ing17,
    strIngredient18: ing18,
    strIngredient19: ing19,
    strIngredient20: ing20,

    strMeasure1: measure1,
    strMeasure2: measure2,
    strMeasure3: measure3,
    strMeasure4: measure4,
    strMeasure5: measure5,
    strMeasure6: measure6,
    strMeasure7: measure7,
    strMeasure8: measure8,
    strMeasure9: measure9,
    strMeasure10: measure10,
    strMeasure11: measure11,
    strMeasure12: measure12,
    strMeasure13: measure13,
    strMeasure14: measure14,
    strMeasure15: measure15,
    strMeasure16: measure16,
    strMeasure17: measure17,
    strMeasure18: measure18,
    strMeasure19: measure19,
    strMeasure20: measure20,
  } = singleMeal;

  // The ingredients and measurements from the API were not structured as an array, hence, the need to extract them individually and push them onto a new array in order to make for easier iteration and rendering.
  const ingredients = [
    ing1,
    ing2,
    ing3,
    ing4,
    ing5,
    ing6,
    ing7,
    ing8,
    ing9,
    ing10,
    ing11,
    ing12,
    ing13,
    ing14,
    ing15,
    ing16,
    ing17,
    ing18,
    ing19,
    ing20,
  ];

  const measurements = [
    measure1,
    measure2,
    measure3,
    measure4,
    measure5,
    measure6,
    measure7,
    measure8,
    measure9,
    measure10,
    measure11,
    measure12,
    measure13,
    measure14,
    measure15,
    measure16,
    measure17,
    measure18,
    measure19,
    measure20,
  ];

  // Also, the ingredients and measurements were indexed from 1 - 20. However, most of them are empty strings, hence, the need to map through the generated array and return only "true" values.
  const trueIngredients = [];

  for (let i = 0; i < ingredients.length; i++) {
    if (
      ingredients[i] !== "" &&
      ingredients[i] !== " " &&
      ingredients[i] !== null
    ) {
      trueIngredients.push(ingredients[i]);
    }
  }

  const trueMeasurements = [];

  for (let i = 0; i < measurements.length; i++) {
    if (
      measurements[i] !== "" &&
      measurements[i] !== " " &&
      measurements[i] !== null
    ) {
      trueMeasurements.push(measurements[i]);
    }
  }

  // Conditional renderings
  if (load) {
    return <Loading />;
  }

  return (
    <section className="Recipe">
      <div className="title">
        <img src={chef1} alt="chef" />
        <h1>voila!</h1>
      </div>

      <div className="Recipe__container">
        <div className="col1">
          <div className="sticky">
            <h3>{mealName}</h3>
            <div className="img__container">
              {favorites.find((meal) => singleMeal.idMeal === meal.idMeal) ? (
                <BsFillHeartFill
                  style={{ color: "#f44336" }}
                  title="Remove from favorites"
                  onClick={() => removeFavorite(singleMeal.idMeal)}
                />
              ) : (
                <BsHeart
                  title="Add to favorites"
                  onClick={() => addFavorite(singleMeal.idMeal)}
                  style={{ color: "white" }}
                />
              )}
              <img src={image} alt={mealName} />
            </div>
            <div className="more">
              <p>
                category: <span>{cat}</span>
              </p>
              <p>
                area: <span>{area}</span>
              </p>
              <p>
                source:
                <a
                  href={source || "#"}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  <span> read full article</span>
                </a>
              </p>
            </div>
          </div>
        </div>
        <div className="col2">
          <div className="btnContainer">
            <button
              onClick={() => setIsActive("instructions")}
              className={isActive === "instructions" ? "isActive" : ""}
            >
              instructions
            </button>
            <button
              onClick={() => setIsActive("ingredients")}
              className={isActive === "ingredients" ? "isActive" : ""}
            >
              ingredients
            </button>
          </div>
          {isActive === "instructions" && (
            <div className="instructions">
              <p>{steps}</p>
              <a href={yt || "#"} target="_blank" rel="noopener noreferrer">
                Also watch on YouTube <span>🤭</span>
              </a>
            </div>
          )}
          {isActive === "ingredients" && (
            <div className="ingredientsContainer">
              <ul>
                <p>ingredients</p>
                {trueIngredients.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
              <ul>
                <p>measurements</p>
                {trueMeasurements.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
      {/* <Suggestions /> */}
    </section>
  );
};

export default DetailedMeal;
