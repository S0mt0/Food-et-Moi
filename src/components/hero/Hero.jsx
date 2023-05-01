import SearchMeal from "../searchMeal/SearchMeal";
import { FoodQuotes } from "../../assets";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import "./hero.css";

const Hero = () => {
  return (
    <section className="hero">
      <div className="quotes">
        <Splide
          options={{
            perPage: 1,
            arrows: false,
            pagination: false,
            type: "loop",
            autoplay: true,
            interval: 15000,
            easing: "cubic-bezier(0.73, 0.05, 0.96, 0.58)",
          }}
        >
          {FoodQuotes.map((singleQuote) => {
            const { quote, author } = singleQuote;
            return (
              <SplideSlide key={singleQuote.quote}>
                <article className="singleQuote">
                  <p>{quote}</p>
                  <h3>- {author}</h3>
                </article>
              </SplideSlide>
            );
          })}
        </Splide>
      </div>
      <SearchMeal />
    </section>
  );
};

export default Hero;
