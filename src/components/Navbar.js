import React, { useContext, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { UidContext } from "./AppContext";
import Logout from "./Log/Logout";
import { isEmpty, upperCase } from "./utils";

const Navbar = () => {
  const uid = useContext(UidContext);
  const userData = useSelector((state) => state.userReducer);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    !isEmpty(userData) && setIsLoading(false);
  }, [userData]);

  return (
    <nav>
      {isLoading ? (
        <div className="nav-container">
          <div className="logo">
            <NavLink exact to="/">
              <div className="logo">
                <img src="./img/icon.png" alt="icon" />
              </div>
            </NavLink>
          </div>
        </div>
      ) : (
        <div className="nav-container">
          <div className="logo">
            <NavLink exact to="/">
              <div className="logo">
                <img src="./img/icon.png" alt="icon" />
              </div>
            </NavLink>
          </div>
          {uid && (
            <ul>
              <li className="welcome">
                <NavLink exact to="/profil">
                  <div className="welcoming">
                    <span>Bonjour 👋,</span>&nbsp;
                    <h3 style={{ color: "#55B2FF" }}>
                      {upperCase(userData.prenom)}
                      {userData.superAdmin ? "    👑" : ""}
                    </h3>
                  </div>
                </NavLink>
              </li>
              <Logout />
            </ul>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
