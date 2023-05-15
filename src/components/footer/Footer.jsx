import { SiGmail } from "react-icons/si";
import { BsWhatsapp, BsGithub } from "react-icons/bs";

import "./footer.css";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="main__Footer">
      <div className="content">
        <div className="info">
          <p>
            <span>Food et Moi(FEM)</span> &copy; {year}. All rights reserved.
          </p>
        </div>
        <div className="contact">
          <p>
            Proudly built by <span>Somto</span>.
          </p>
          <div className="icons">
            <a href="#">
              <BsWhatsapp className="whatsapp" />
            </a>
            <a href="#">
              <BsGithub className="github" />
            </a>
            <a href="#">
              <SiGmail className="gmail" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
