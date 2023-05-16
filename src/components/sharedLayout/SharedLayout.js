import Hero from "../hero/Hero";
import { Outlet } from "react-router-dom";

const SharedLayout = () => {
  return (
    <section>
      <Hero />
      <Outlet />
    </section>
  );
};

export default SharedLayout;
