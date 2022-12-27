import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { UidContext } from "../components/AppContext";

const LeftNav = () => {
  const uid = useContext(UidContext);
  const userData = useSelector((state) => state.userReducer);
  return (
    <div className="left-nav-container">
      <div className="icons">
        <div className="icons-bis">
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "active-left-nav" : "")}
          >
            <img src="./img/icons/home.svg" alt="home" />
          </NavLink>
          <br />
          <NavLink
            to="/Data"
            className={({ isActive }) => (isActive ? "active-left-nav" : "")}
          >
            <img src="./img/icons/rocket.svg" alt="rocket" />
          </NavLink>
          <br />
          <NavLink
            to="/profil"
            className={({ isActive }) => (isActive ? "active-left-nav" : "")}
          >
            <img src="./img/icons/user.svg" alt="user" />
          </NavLink>
          {uid && userData.superAdmin ? (
            <>
              <NavLink
                to="/admin"
                className={({ isActive }) =>
                  isActive ? "active-left-nav" : ""
                }
              >
                <img src="./img/icons/share.svg" alt="user-plus" />
              </NavLink>
              <br />
            </>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default LeftNav;
