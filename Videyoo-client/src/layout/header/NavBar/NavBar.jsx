import React from "react";
import Logo from "./Logo";
import Navigation from "./Navigation";
import PhoneNavBar from "./PhoneNavBar";
import "./NavBar.scss";

const NavBar = ({ user }) => (
  <nav className="navbar navbar-expand-md ">
    <div className="container">
      <Logo />
      <PhoneNavBar user={user} />
      <Navigation user={user} />
    </div>
  </nav>
);

export default NavBar;
