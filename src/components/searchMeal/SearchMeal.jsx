import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useGlobalContext } from "../../Context";
import "./searchMeal.css";

const SearchMeal = () => {
  const [input, setInput] = useState("");

  const { setSearchTerm, setNoMeal, searchTerm } = useGlobalContext();

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const clearSearch = () => {
    if (input.length === 0) {
      setSearchTerm("");
    }
  };

  useEffect(() => {
    clearSearch();
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchTerm(input.trim());
    setInput(input.trim());

    if (searchTerm !== input) {
      setNoMeal(false);
    }
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
      </div>
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchMeal;
