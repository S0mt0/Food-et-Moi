import { HiChevronLeft } from "react-icons/hi";
import { useGlobalContext } from "../../Context";

import "./noMeal.css";

const NoMeal = () => {
  const { setNoMeal } = useGlobalContext();

  return (
    <div className="noMeal">
      <p>Sorry, the searched meal could not be found ...😞</p>

      <button
        onClick={() => {
          setNoMeal(false);
        }}
      >
        <HiChevronLeft />
        return to All Meals
      </button>
    </div>
  );
};

export default NoMeal;
