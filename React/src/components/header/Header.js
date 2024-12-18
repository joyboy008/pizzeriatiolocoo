import { useState, useEffect } from "react";
import home from "../../assets/images/home.png";
import sales from "../../assets/images/ventas.png";
import products from "../../assets/images/products.png";
import clientes from "../../assets/images/clients.png";
import users from "../../assets/images/users.png";
import key from "../../assets/images/key.png";
import { NavLink, useNavigate } from "react-router-dom";
import authProvider from "../../utils/AuthProvider";
import "./styles-header.css";

function Header() {
  const navigate = useNavigate();
  const [scrollDirection, setScrollDirection] = useState("up");
  const [lastScrollY, setLastScrollY] = useState(0);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY) {
        setScrollDirection("down");
      } else {
        setScrollDirection("up");
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    const activeUser = authProvider.getUsuario();
    setUser(activeUser);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  const handleCloseSession = () => {
    authProvider.deleteSession();
    navigate("/");
  };

  return (
    <>
      <section>
        <header className="headerPage">
          <nav className="menuHeaderPage">
            <div className="options">
              <ul>
                <li>
                  <div className="tooltip-container">
                    <NavLink to="/">
                      <img src={home} alt="home" />
                      <span className="tooltip-text">Inicio</span>
                    </NavLink>
                  </div>
                </li>
                {authProvider.checkRoutePermissions("moderador") ? (
                  <>
                    <li>
                      <div className="tooltip-container">
                        <NavLink to="/checkout">
                          <img src={products} alt="nueva ventas" />
                          <span className="tooltip-text">Nueva Venta</span>
                        </NavLink>
                      </div>
                    </li>
                    <li>
                      <div className="tooltip-container">
                        <NavLink to="/sales">
                          <img src={sales} alt="ventas" />
                          <span className="tooltip-text">Ventas</span>
                        </NavLink>
                      </div>
                    </li>
                    <li>
                      <div className="tooltip-container">
                        <NavLink to="/new_client">
                          <img src={clientes} alt="clientes" />
                          <span className="tooltip-text">Clientes</span>
                        </NavLink>
                      </div>
                    </li>
                  </>
                ) : null}
                {authProvider.checkRoutePermissions("admin") ? (
                  <li>
                    <div className="tooltip-container">
                      <NavLink to="/users">
                        <img src={users} alt="usuarios" />
                        <span className="tooltip-text">Usuarios</span>
                      </NavLink>
                    </div>
                  </li>
                ) : null}
                {!!authProvider.checkAuth() ? (
                  <li>
                    <div className="tooltip-container">
                      <NavLink onClick={handleCloseSession}>
                        {user ? (
                          <>
                            <img src={key} alt="username" />
                            <span className="tooltip-text">
                              {user.username}
                            </span>
                          </>
                        ) : (
                          <span>Login</span>
                        )}
                      </NavLink>
                    </div>
                  </li>
                ) : (
                  <li>
                    <div className="tooltip-container">
                      <NavLink to="/login">
                        <img src={key} alt="login" />
                        <span className="tooltip-text">Login</span>
                      </NavLink>
                    </div>
                  </li>
                )}
              </ul>
            </div>
          </nav>
        </header>
      </section>
    </>
  );
}

export default Header;
