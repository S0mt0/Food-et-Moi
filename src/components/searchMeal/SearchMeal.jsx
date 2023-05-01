import "./searchMeal.css";
import { FaSearch } from "react-icons/fa";

const SearchMeal = () => {
  return (
    <form>
      <div className="input">
        <input type="text" placeholder="Search your favorite meals here. . . ." />
      <FaSearch />
      </div>
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchMeal;
