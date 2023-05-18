import { Outlet } from "react-router-dom";
import { Hero } from "../../components";

const Home = () => {
  return (
    <section>
      <Hero />
      <Outlet />
    </section>
  );
};

export default Home;
