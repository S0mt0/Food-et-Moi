import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { chef1 } from "../../assets";
import Loading from "../loading/Loading";
// import Suggestions from "../suggestions/Suggestions";

import "./singleMeal.css";

const SingleMeal = () => {
  const [singleMeal, setSingleMeal] = useState([]);
  const [load, setLoad] = useState(true);
  const { name } = useParams();

  const singleMealURL = "https://www.themealdb.com/api/json/v1/1/search.php?s=";

  const fetchSingleMeal = async (url) => {
    try {
      const response = await fetch(url);
      const { meals } = await response.json();
      setSingleMeal(meals[0]);
      setLoad(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchSingleMeal(`${singleMealURL}${name}`);
  }, [name]);
  console.log(singleMeal);

  const {
    strCategory: cat,
    strInstructions: steps,
    strMealThumb: image,
    strYoutube: yt,
    strMeal: mealName,
    strArea: area,
    strSource: source,
  } = singleMeal;

  if (load) {
    return <Loading />;
  }
  return (
    <section className="Recipe">
      <div className="title">
        <h1>Yummy...</h1>
        <img src={chef1} alt="chef" />
      </div>

      <div className="Recipe__container">
        <div className="col1">
          <div className="sticky">
            <h3>{mealName}</h3>
            <div className="img__container">
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
          <h3>Instructions</h3>
          <p>{steps}</p>
          <a href={yt || "#"} target="_blank" rel="noopener noreferrer">
            Also watch on YouTube <span>🤭</span>
          </a>
        </div>
      </div>
      {/* <Suggestions /> */}
    </section>
  );
};

export default SingleMeal;
