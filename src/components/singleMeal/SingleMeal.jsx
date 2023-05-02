import Suggestions from "../suggestions/Suggestions";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { chef1 } from "../../assets";

import "./singleMeal.css";

const SingleMeal = () => {
  const [singleMeal, setSingleMeal] = useState([]);
  const { name } = useParams();

  const singleMealURL = "https://www.themealdb.com/api/json/v1/1/search.php?s=";

  const fetchSingleMeal = async (url) => {
    try {
      const response = await fetch(url);
      const { meals } = await response.json();
      setSingleMeal(meals);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchSingleMeal(`${singleMealURL}${name}`);
  }, [name]);
  // console.log(singleMeal);

  const {
    idMEal: id,
    strCategory: cat,
    strInstructions: steps,
    strMealThumb: image,
    strSource,
    strYoutube: yt,
    strMeal: mealName,
  } = singleMeal;
  return (
    <section className="Recipe">
      <div className="title">
        <h1>Yummy...</h1>
        <img src={chef1} alt="chef" />
      </div>
      <div className="Recipe__container">
        <div className="brief">
          <h3>{mealName}</h3>
          <img src={image} alt={mealName} />
        </div>
      </div>
      {/* <Suggestions /> */}
    </section>
  );
};

export default SingleMeal;
