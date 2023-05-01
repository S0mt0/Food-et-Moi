import { useContext, useState, useEffect, createContext } from "react";

// New context
const AppContext = createContext(null);

// The AppProvider component serves as the parent wrapper which will wrap our entire App in the index.js file  enabling every other descendant component to have access to all of its states, and functions etc.
const AppProvider = ({ children }) => {
  // fetch meals data on first render, and commit it to state variable, "allMeals".
  const [allMeals, setAllMeals] = useState(
    JSON.parse(localStorage.getItem("fetchedMeals")) || []
  );
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);

  // console.log(isFavorite);

  // allMeals fetch function
  const fetchMeals = async () => {
    const allMealsURL = "https://www.themealdb.com/api/json/v1/1/search.php?s=";
    const check = localStorage.getItem("fetchedMeals");

    if (check) {
      setAllMeals(JSON.parse(check));
    } else {
      try {
        const response = await fetch(allMealsURL);
        const { meals } = await response.json();
        setAllMeals(meals);
        setLoading(false);

        // store to local storage after fetching data
        localStorage.setItem("fetchedMeals", JSON.stringify(meals));
      } catch (error) {
        console.log(error);
      }
    }
  };
  useEffect(() => {
    fetchMeals();
  }, []);

  return (
    <AppContext.Provider
      value={{ allMeals, loading, isFavorite, setIsFavorite }}
    >
      {children}
    </AppContext.Provider>
  );
};

// Custom Hooks
const useGlobalContext = () => {
  return useContext(AppContext);
};

// Exports
export { AppProvider, AppContext, useGlobalContext };
