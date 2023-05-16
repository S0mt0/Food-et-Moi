import "./App.css";
import {
  Outlet,
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import {
  Footer,
  BackToTopBtn,
  PageNotFound,
  SingleMeal,
  Navigation,
  SharedLayout,
  Meals,
  Searched,
} from "./components";
import { Favorites } from "./pages";

function App() {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<Meals />} />
          <Route path="/searched/:id" element={<Searched />} />
        </Route>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/Favorites" element={<Favorites />} />
        <Route path="/details/:name" element={<SingleMeal />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <BackToTopBtn />
      <Footer />
    </Router>
  );
}

export default App;
