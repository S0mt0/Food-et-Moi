import { useContext, useState, useEffect, createContext } from "react";
import mealDB from "./apis/mealsFetch";

// New context
const AppContext = createContext(null);
// The AppProvider component serves as the parent wrapper which will wrap our entire App in the index.js file  enabling every other descendant component to have access to all of its states, and functions etc.
const AppProvider = ({ children }) => {
  const [allMeals, setAllMeals] = useState(
    JSON.parse(localStorage.getItem("meals")) || []
  );
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("myFavorites")) || []
  );

  const [loading, setLoading] = useState(true);
  const [noResult, setNoResult] = useState(false);
  const [modal, setModal] = useState(false);

  // Search Input states
  const [input, setInput] = useState("");
  const [searchedSuggestions, setSearchedSuggestions] = useState([]);
  const [searchedMeals, setSearchedMeals] = useState([]);

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

  // FETCH MEALS ON SEARCH
  useEffect(() => {
    let isMounted = true;

    const fetchMeal = async () => {
      try {
        const {
          data: { meals },
        } = await mealDB.get("/search.php", {
          params: {
            s: input.trim(),
          },
        });
        if (meals) {
          if (isMounted) {
            setSearchedSuggestions(meals);
          }
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (input.trim().length > 0) {
      fetchMeal();
    } else {
      setSearchedSuggestions([]);
    }

    return () => (isMounted = false);
  }, [input, setSearchedSuggestions]);

  // Handle favorite selection and deselection function
  // ADD
  const addFavorite = (id) => {
    const faveItem =
      allMeals.find((meal) => meal.idMeal === id) ||
      searchedMeals.find((meal) => meal.idMeal === id);
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
        noResult,
        setNoResult,
        favorites,
        addFavorite,
        removeFavorite,
        clearFavorites,
        modal,
        setModal,
        searchedSuggestions,
        setSearchedSuggestions,
        searchedMeals,
        setSearchedMeals,
        input,
        setInput,
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
