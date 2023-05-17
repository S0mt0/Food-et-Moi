import "./footer.css";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="main__Footer">
      <p>
        <span>Food et Moi </span>(FeM) &copy; {year}. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
