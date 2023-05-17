import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  Footer,
  BackToTopBtn,
  PageNotFound,
  DetailedMeal,
  Navigation,
  Meals,
  SearchedResults,
} from "./components";
import { Favorites, Home } from "./pages";

function App() {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />}>
          <Route index element={<Meals />} />
          <Route path="/searched/:id" element={<SearchedResults />} />
        </Route>
        <Route path="/Favorites" element={<Favorites />} />
        <Route path="/details/:name" element={<DetailedMeal />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <BackToTopBtn />
      <Footer />
    </Router>
  );
}

export default App;
