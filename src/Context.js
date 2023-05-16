import { useContext, useState, useEffect, createContext } from "react";
import mealDB from "./apis/mealsFetch";

// New context
const AppContext = createContext(null);
// The AppProvider component serves as the parent wrapper which will wrap our entire App in the index.js file  enabling every other descendant component to have access to all of its states, and functions etc.
const AppProvider = ({ children }) => {
  // States
  const [allMeals, setAllMeals] = useState(
    JSON.parse(localStorage.getItem("meals") || [])
  );
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("myFavorites") || [])
  );

  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [noMeal, setNoMeal] = useState(false);
  const [modal, setModal] = useState(false);

  // Fetch meals on first render, commit it to state variable, "allMeals", and save to local storage.
  const fetchMeals = async () => {
    try {
      const {
        data: { meals },
      } = await mealDB.get("/search.php", {
        params: {
          s: "",
        },
      });
      if (meals) {
        localStorage.setItem("meals", JSON.stringify(meals));
        setAllMeals(meals);
      } else {
        setNoMeal(true);
      }
    } catch (error) {
      console.log(error);
    }

    if (JSON.parse(localStorage.getItem("meals"))) {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMeals();
  }, []);

  // Handle favorite selection and deselection function
  // ADD
  const addFavorite = (id) => {
    const faveItem = allMeals.find((meal) => meal.idMeal === id);
    if (favorites.find((meal) => meal.idMeal === id)) return;
    const updatedFavoriteList = [...favorites, faveItem];
    setFavorites(updatedFavoriteList);
    localStorage.setItem("myFavorites", JSON.stringify(updatedFavoriteList));
  };

  // REMOVE
  const removeFavorite = (id) => {
    if (favorites.find((meal) => meal.idMeal === id)) {
      const updatedFavoriteList = favorites.filter(
        (meal) => meal.idMeal !== id
      );
      setFavorites(updatedFavoriteList);
      localStorage.setItem("myFavorites", JSON.stringify(updatedFavoriteList));
    }
  };

  // Clear Favorite List Function
  const clearFavorites = () => {
    setModal(false);
    setFavorites([]);
    localStorage.removeItem("myFavorites", JSON.stringify(favorites));
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
        favorites,
        addFavorite,
        removeFavorite,
        clearFavorites,
        modal,
        setModal,
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
