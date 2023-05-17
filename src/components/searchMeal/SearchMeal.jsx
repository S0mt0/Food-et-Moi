import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { useGlobalContext } from "../../Context";
import mealDB from "../../apis/mealsFetch";

import "./searchMeal.css";

const SearchMeal = () => {
  const [input, setInput] = useState("");
  const [hideDropDown, setHideDropDown] = useState(false);

  const [buttonText, setButtonText] = useState("Searched here. . .");

  const { searchedSuggestions, setSearchedSuggestions } = useGlobalContext();

  const navigate = useNavigate();

  // Form input events
  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleClick = (selected) => {
    navigate(`/searched/${selected}`);

    setButtonText(selected);
    setInput("");
  };

  // Function to display dropdown menu
  const renderSuggestions = () => {
    const show = input.trim() ? "show" : null;

    if (searchedSuggestions.length > 0) {
      return (
        <ul className={`dropdown ${hideDropDown || show}`} ref={menuRef}>
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

  // Effects
  useEffect(() => {
    if (input) {
      setHideDropDown(false);
    }
  }, [input]);

  // Fetch searched meals effect
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

  //
  const menuRef = useRef(null);
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        // Close the menu (hide or remove it)
        setHideDropDown(true);
      }
    };

    // Add event listener to the window click event
    window.addEventListener("click", handleOutsideClick);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  // Return
  return (
    <form>
      <div className="input" ref={menuRef}>
        <input
          type="text"
          placeholder="Search your favorite meals here. . . ."
          onChange={(e) => handleChange(e)}
          value={input}
        />
        <FaSearch />
        {renderSuggestions()}
      </div>
    </form>
  );
};

export default SearchMeal;
