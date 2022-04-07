import React from "react";
import "./header.css";
import { NavLink } from 'react-router-dom';


import Logo from './img/lillje-consulting-logo-1.svg';

/**
 * Component
 *
 * @param {*} props
 * @return {*} 
 */
const Header = (props) => {
  return (
    <div className="headerContainer">
        <div className="headerLogo">
            <NavLink to="/">
            <img src={Logo} alt="logo" className="headerLogo"></img>
            </NavLink>

            </div> 
            <div className="headerTitle">
                <h1>myBusiness</h1>
                </div>
    </div>
  );
};

export default Header;
