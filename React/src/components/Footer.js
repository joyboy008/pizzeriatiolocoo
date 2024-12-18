// Se utiliza en Home
// Se utiliza en Contacto
// Se utiliza en ChatBot

import logo from "../assets/images/logo-mtw.png";

const Footer = () => {
  return (
    <footer id="footer">
      <div className="center">
        <a
          className="fotter"
          href="https://mtw.lat"
          target="_blank"
          rel="noreferrer"
        >
          Created by <img className="logo-line" src={logo} alt="Logotipo" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
