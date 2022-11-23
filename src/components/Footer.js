import React, { useContext } from "react";
// import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { UidContext } from "./AppContext";
import Logout from "./Log/Logout";

const Footer = () => {
  const uid = useContext(UidContext);
  // const userData = useSelector((state) => state.userReducer);
  return (
    <footer>
      <div className="footer-container">
        <div className="logo">
          <NavLink exact to="/">
            <div className="logo">
              <img src="./img/icon.png" alt="icon" />
            </div>
          </NavLink>
        </div>
        <div className="copyright">
          <NavLink exact to="/profil">
            ® Tekos 2022 - Marque déposée
          </NavLink>
        </div>
        <div className="links">
          {uid ? (
            <ul>
              <li>
                <NavLink exact to="/">
                  Accueil
                </NavLink>
              </li>
              <li>
                <NavLink exact to="/Job">
                  Job
                </NavLink>
              </li>
              <li>
                <NavLink exact to="/profil">
                  Profil
                </NavLink>
              </li>
              <li>
                <NavLink exact to="/">
                  Aide
                </NavLink>
              </li>
              <Logout />
            </ul>
          ) : (
            <ul>
              <li className="login">
                <NavLink exact to="/profil">
                  <p>Se connecter</p>
                  <img src="./img/icons/login.svg" alt="login" />
                </NavLink>
              </li>
            </ul>
          )}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
