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

  return (
    <a
      className="btt"
      href="#top"
      style={{ display: toTop ? "grid" : "none" }}
      title="Back to Top"
    >
      <BsArrowUp />
    </a>
  );
};

export default BackToTopBtn;
