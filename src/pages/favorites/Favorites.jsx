import { useState, useEffect } from "react";
import { useGlobalContext } from "../../Context";
import { BsBoxArrowUpRight } from "react-icons/bs";
import { TiDeleteOutline } from "react-icons/ti";
import { MdDeleteForever, MdClose } from "react-icons/md";
import { HiOutlineArrowNarrowLeft } from "react-icons/hi";
import { NoFav } from "../../assets";
import { Link } from "react-router-dom";

import "./favorites.css";

const Favorites = () => {
  const [screenSize, setScreenSize] = useState(window.innerWidth);
  const { removeFavorite, favorites, clearFavorites, modal, setModal } =
    useGlobalContext();

  // Inline Style functions
  const checkSize = () => {
    setScreenSize(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", checkSize);

    return () => {
      window.removeEventListener("resize", checkSize);
    };
  });

  const smallScreen = {
    gridTemplateColumns: "1fr",
  };

  const bigScreen = {
    gridTemplateColumns: "repeat(3, minmax(14rem, 1fr))",
  };

  const grid = () => {
    if (favorites.length <= 3) {
      return bigScreen;
    }
  };

  if (favorites.length < 1) {
    return (
      <section className="noFavorites">
        <p>Oops!...... There is nothing on your Favorite List</p>
        <img src={NoFav} alt="no favorite" />
      </section>
    );
  }

  return (
    <section className="Fav__Container">
      <h1 className="Fav__Header">
        You have {favorites.length} favorite items.
      </h1>
      <div className="removeAllBtnWrapper">
        <Link to={"/"}>
          <HiOutlineArrowNarrowLeft />
        </Link>
        <button onClick={() => setModal(true)}>
          <span>delete all</span>
          <MdDeleteForever />
        </button>
      </div>
      <div
        className="favorites"
        style={screenSize <= 576 ? smallScreen : grid()}
      >
        {favorites.map((singleMeal) => {
          const {
            idMeal: id,
            strMeal: name,
            strMealThumb: image,
            strCategory: cat,
          } = singleMeal;
          return (
            <article key={id} className="singleMeal">
              <div className="image" title={`Learn more about ${name}`}>
                <p className="category">
                  Category: <span>{cat}</span>
                </p>
                <Link to={`/details/${name}`}>
                  <img src={image} alt={name} />
                </Link>
                <div className="overlay">
                  <BsBoxArrowUpRight />
                </div>
              </div>
              <footer>
                <h3>{name}</h3>
                <TiDeleteOutline
                  title="Remove from favorites"
                  onClick={() => removeFavorite(id)}
                />
              </footer>
            </article>
          );
        })}
      </div>
      {modal && (
        <div className="Modal__container">
          <div className="modal">
            <MdClose title="Close" onClick={() => setModal(false)} />
            <h3>Do you really want to delete all items?</h3>
            <div className="modal_btn">
              <button onClick={clearFavorites}>Yes</button>
              <button onClick={() => setModal(false)}>No</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Favorites;
