import { useContext, useState, useEffect, createContext } from "react";

// New context
const AppContext = createContext(null);

// The AppProvider component serves as the parent wrapper which will wrap our entire App in the index.js file  enabling every other descendant component to have access to all of its states, and functions etc.
const AppProvider = ({ children }) => {
  // States
  const [allMeals, setAllMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [noMeal, setNoMeal] = useState(false);
  const [favorites, setFavorites] = useState([]);

  // Fetch meals on first render, and commit it to state variable, "allMeals".
  const allMealsURL = "https://www.themealdb.com/api/json/v1/1/search.php?s=";

  const fetchMeals = async (url) => {
    try {
      const response = await fetch(url);
      const { meals } = await response.json();
      setLoading(false);
      if (meals) {
        setAllMeals(meals);
      } else {
        setNoMeal(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMeals(`${allMealsURL}${searchTerm}`);
  }, [searchTerm]);

  const handleFavorite = () => {
    console.log("hello");
  };

  return (
    <AppContext.Provider
      value={{
        allMeals,
        loading,
        setLoading,
        searchTerm,
        setSearchTerm,
        noMeal,
        setNoMeal,
        handleFavorite,
      }}
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
