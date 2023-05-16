import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { useGlobalContext } from "../../Context";
import mealDB from "../../apis/mealsFetch";

import "./searchMeal.css";

const SearchMeal = () => {
  const [input, setInput] = useState("");
  const [showDropDown, setShowDropDown] = useState(false);

  const { searchedSuggestions, setSearchedSuggestions } = useGlobalContext();

  const { id } = useParams();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleClick = (selected) => {
    // setInput(selectedtrue);
    navigate(`/searched/${id}`);
    setShowDropDown(true);
  };

  useEffect(() => {
    if (input) {
      setShowDropDown(false);
    }
  }, [input]);

  const renderSuggestions = () => {
    const show = input.trim() ? "show" : null;

    if (searchedSuggestions.length > 0) {
      return (
        <ul className={`dropdown ${showDropDown || show}`}>
          {searchedSuggestions.map((meal) => {
            return (
              <div key={meal.idMeal}>
                <li
                  onClick={() => {
                    handleClick(meal.strMeal);
                  }}
                >
                  <span>{meal.strMeal}</span>
                  <p>({meal.strArea})</p>
                </li>
              </div>
            );
          })}
        </ul>
      );
    }
  };

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

  // const clearSearch = () => {
  //   if (input.length === 0) {
  //     setSearchTerm("");
  //   }
  // };

  // useEffect(() => {
  //   clearSearch();
  // });

  const handleSubmit = (e) => {
    e.preventDefault();
    // setInput("");
    setShowDropDown(true);
    navigate(`/searched/${id}`);
  };
  return (
    <form
      onSubmit={(e) => {
        handleSubmit(e);
      }}
    >
      <div className="input">
        <input
          type="text"
          placeholder="Search your favorite meals here. . . ."
          onChange={(e) => handleChange(e)}
          value={input}
        />
        <FaSearch />
        {renderSuggestions()}
      </div>
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchMeal;
