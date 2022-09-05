import React from "react";
import { NavLink } from "react-router-dom";
import myLogo from "../../../assets/myLogo.png";
import "./NavBar.scss";
const Logo = () => (
  <NavLink className="navbar-brand" to="/">
    <img src={myLogo} alt="website Logo" className="logoimg" />
  </NavLink>
);

export default Logo;
