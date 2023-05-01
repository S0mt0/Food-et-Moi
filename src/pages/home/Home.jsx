import { Meals, Aside, Hero } from "../../components";
import "./home.css";

const Home = () => {

  return (
    <>
      <Hero />
      <section>
        <Meals />
      </section>
      {/* <Aside /> */}
    </>
  );
};

export default Home;
