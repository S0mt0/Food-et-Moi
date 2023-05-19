import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { TiDelete } from "react-icons/ti";
import { useGlobalContext } from "../../Context";

import "./searchInput.css";

const SearchInput = () => {
  const [hideDropDown, setHideDropDown] = useState(false);

  const { searchedSuggestions, setInput, input } = useGlobalContext();

  const navigate = useNavigate();
  // Form input events
  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleClick = (selected) => {
    navigate(`/searched/${selected}`);
    setInput(selected);
    setHideDropDown(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim().length > 0) {
      navigate(`/searched/${input.trim()}`);
      setHideDropDown(true);
    }
  };

  const removeSearch = () => {
    setInput("");
  };

  // Function to display dropdown menu
  const renderSuggestions = () => {
    if (searchedSuggestions.length > 0) {
      return (
        <ul
          className={"dropdown"}
          ref={menuRef}
          style={{
            display: hideDropDown ? "none" : "block",
          }}
        >
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

  // EFFECTS
  useEffect(() => {
    if (input) {
      setHideDropDown(false);
    }
  }, [input]);

  //
  const menuRef = useRef(null);
  // Close Dropdown if clicked on anything outside the menu
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (e.target !== menuRef.current) {
        setHideDropDown(true);
      }
    };
    window.addEventListener("click", handleOutsideClick);

    return () => {
      window.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  // Return
  return (
    <form onSubmit={(e) => handleSubmit(e)} ref={menuRef}>
      <div className="input">
        <input
          type="text"
          placeholder="Search your favorite meals here. . . ."
          onChange={(e) => handleChange(e)}
          value={input}
          ref={menuRef}
        />
        <FaSearch />
        {input.trim() && <TiDelete className="delete" onClick={removeSearch} />}
        {renderSuggestions()}
      </div>
    </form>
  );
};

export default SearchInput;
