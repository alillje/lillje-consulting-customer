import React from "react";
import "./sidebar.css";
import { NavLink, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";



/**
 * Component
 *
 * @param {*} props
 * @return {*}
 */
const Sidebar = (props) => {
  const navigate = useNavigate();
    const navigateTo = (location) => {
      navigate(location)
      console.log(location)
    }

  return (
    <div className="sideBarContainer">

        <Link to="/transactions/register" className="sideBarButton">Registrera transaktion</Link>
        <Link to="/transactions/" className="sideBarButton">Registrera transaktion</Link>
        <Link to="/login" className="sideBarButton">Registrera transaktion</Link>
        <Link to="/login" className="sideBarButton">Registrera transaktion</Link>

    </div>
  );
};

export default Sidebar;
