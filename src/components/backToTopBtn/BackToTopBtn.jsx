import { BsArrowUp } from "react-icons/bs";
import { useState, useEffect } from "react";

import "./backToTopBtn.css";

const BackToTopBtn = () => {
  const [toTop, setToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setToTop(true);
      } else {
        setToTop(false);
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      className="btt"
      onClick={handleScrollToTop}
      style={{ display: toTop ? "grid" : "none" }}
      title="Back to Top"
    >
      <BsArrowUp />
    </button>
  );
};

export default BackToTopBtn;
