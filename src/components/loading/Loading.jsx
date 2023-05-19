import { loader1 } from "../../assets";
import "./loading.css";

const Loading = () => {
  return (
    <div className="load__Container">
      <img src={loader1} alt="loading" />
      <p>Please wait...</p>
    </div>
  );
};

export default Loading;
