import { Link } from "react-router-dom";
import "./pageNotFound.css";

const PageNotFound = () => {
  return (
    <div className="pnf">
      <div className="sign">:(</div>
      <h3>Page not found - 404:</h3>
      <small>
        Sorry, the page you're looking for was not found, or does not exist.
      </small>
      <small>
        Kindly go back <Link to={"/"}>home.</Link>
      </small>
    </div>
  );
};

export default PageNotFound;
