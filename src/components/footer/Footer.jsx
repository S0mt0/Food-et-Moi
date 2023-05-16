import { SiGmail } from "react-icons/si";
import { BsWhatsapp, BsGithub } from "react-icons/bs";

import "./footer.css";

const Footer = () => {
  const year = new Date().getFullYear();

  // whatsapp link
  const generateWhatsAppLink = (phoneNumber) => {
    return `https://wa.me/${phoneNumber}`;
  };
  const whatsappLink = generateWhatsAppLink("08148696119");

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
            <a href={whatsappLink} target="_blank" rel="noreferrer noopener">
              <BsWhatsapp className="whatsapp" />
            </a>
            <a
              href="https://github.com/S0mt0"
              target="_blank"
              rel="noreferrer noopener"
            >
              <BsGithub className="github" />
            </a>
            <a href="mailto: sewkito@gmail.com" rel="noreferrer noopener">
              <SiGmail className="gmail" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
