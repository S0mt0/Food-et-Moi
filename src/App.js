import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  Footer,
  BackToTopBtn,
  PageNotFound,
  SingleMeal,
  Navigation,
} from "./components";
import { Home, Favorites } from "./pages";

function App() {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Favorites" element={<Favorites />} />
        <Route path="/details/:name" element={<SingleMeal />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      {/* <BackToTopBtn /> */}
      <Footer />
    </Router>
  );
}

export default App;
