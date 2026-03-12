//se utiliza en DefaultLayout

import { Fragment, Component } from "react";
import { FaFacebook, FaWhatsapp, FaInstagram } from "react-icons/fa";
import { MdEmail } from "react-icons/md"; // Importar el ícono de correo electrónico

class Sidebar extends Component {
  render() {
    return (
      <aside id="sidebar">
        {this.props.blog === "true" && (
          <Fragment>
            <div id="nav-blog" className="sidebar-item">
              <h3>Dirección</h3>
              <p>
                1 av 3-53 zona 3 San Juan Ostuncalco, Quetzaltenango, Guatemala
              </p>
              <p>Telefono: +(502) 3819 6655</p>
            </div>
            <div id="search" className="sidebar-item">
              <h3>Redes Sociales</h3>
              <a
                href="https://www.facebook.com/ElTioLocoSanJuanOst"
                target="_blank"
                rel="noreferrer"
                className="facebook-link"
              >
                <FaFacebook />
              </a>
              <a
                href="https://wa.me/50238196655"
                target="_blank"
                rel="noreferrer"
                className="whatsapp-link"
              >
                <FaWhatsapp />
              </a>
              <a
                href="mailto:tiolocosjo@gmail.com"
                target="_blank"
                rel="noreferrer"
                className="email-link"
              >
                <MdEmail /> {/* Icono de Email */}
              </a>
            </div>
          </Fragment>
        )}
      </aside>
    );
  }
}

export default Sidebar;
