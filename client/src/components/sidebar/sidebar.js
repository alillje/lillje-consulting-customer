import React, { useContext } from "react";
import Nav from "react-bootstrap/Nav";
import "./sidebar.css";
import { NavLink } from "react-router-dom";
import AuthContext from "../../context/auth-context";

/**
 * Component
 *
 * @param {*} props
 * @return {*}
 */
const Sidebar = (props) => {
  return (
    <div className="sideBarContainer">
      <NavLink to="/login">
        <div className="sideBarButton">Registrera transaktion</div>
      </NavLink>
      <NavLink to="/login">
        <div className="sideBarButton">Mina transaktioner</div>
      </NavLink>
      <NavLink to="/login">
        <div className="sideBarButton">Historik</div>
      </NavLink>
      <NavLink to="/login">
        <div className="sideBarButton">Min sida</div>
      </NavLink>
    </div>
  );
};

export default Sidebar;
