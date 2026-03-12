// Se utiliza en Home

import { Fragment, Component } from "react";
import Servicio from "./Servicio";
import establecimiento from "../assets/images/establecimiento.jpg";
import tioloko from "../assets/images/tioloko.png";
import pizza from "../assets/images/pizza.jpg";
import roles from "../assets/images/roles.jpg";

class Servicios extends Component {
  state = {
    servicios: [
      {
        titulo: "Nuestra Historia",
        details:
          "En nuestra pizzería artesanal, cada pizza cuenta una historia. Desde nuestras raíces italianas hasta la pasión por ingredientes frescos y locales, creamos una experiencia culinaria única que refleja nuestro compromiso con la autenticidad y la calidad.",
        image: tioloko, // Reemplaza con la imagen correspondiente
      },
      {
        titulo: "Pizzas Artesanales",
        details:
          "Elaboramos nuestras pizzas con masa madre hecha a mano y horneadas en un auténtico horno de leña. Usamos ingredientes frescos y combinaciones únicas que deleitarán tu paladar en cada bocado.",
        image: pizza, // Reemplaza con la imagen correspondiente
      },
      {
        titulo: "Experiencia Gourmet",
        details:
          "Nuestra pizzería no solo ofrece comida deliciosa, sino una experiencia gastronómica inolvidable. Con un ambiente acogedor y un servicio excepcional, buscamos hacer que cada visita sea especial.",
        image: roles, // Reemplaza con la imagen correspondiente
      },
      {
        titulo: "Eventos Especiales",
        details:
          "Celebra tus momentos más importantes con nosotros. Ofrecemos paquetes para eventos privados y experiencias personalizadas que harán de tu ocasión algo inolvidable.",
        image: establecimiento, // Reemplaza con la imagen correspondiente
      },
    ],
  };

  render() {
    return (
      <Fragment>
        <div className="servicios">
          <div id="articles" className="services">
            {this.state.servicios.map((servicio, i) => {
              return <Servicio key={i} servicio={servicio} indice={i} />;
            })}
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Servicios;
