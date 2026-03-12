// Se Utiliza en Home.js
// Se utiliza en ChatBot.js
// Se utiliza en Login.js
// Se utiliza en CitaActualizar.js
// Se utiliza en CitaCrear.js
// Se utiliza en CitaListar.js
// Se utiliza en ConsultaActualizar.js
// Se utiliza en ConsultarCrear.js
// Se utiliza en HospitalizacionActualizar.js
// Se utiliza en HospitalizacionCrear.js
// Se utiliza en PacientesActualizar.js
// Se utiliza en PacientesCrear.js
// Se utiliza en PacientesListar.js
// Se utiliza en UsuariosActualizar.js
// Se utiliza en UsuariosCrear.js
// Se utiliza en UsuariosListar.js

import Header from "./header/Header";
import Sidebar from "./Sidebar";
import Slider from "./Slider";

function DefaultLayout({
  children,
  title,
  size = "slider-small",
  showSidebar,
}) {
  return (
    <>
      <Header />
      <Slider title={title} size={size} />
      <div className="center" id="center">
        {showSidebar ? (
          <div className="contenidoHome">
            <div className="home">{children}</div>
            <div className="sidebar">
              <Sidebar blog="true" />{" "}
            </div>
          </div>
        ) : (
          children
        )}
      </div>
    </>
  );
}

export default DefaultLayout;
