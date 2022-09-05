import React from "react";
import { NavLink } from "react-router-dom";
import * as PropTypes from "prop-types";
import { ROUTES_DEF } from "../../../model/routes";

const NavRouteLink = ({ route }) => {
  const { to, label } = ROUTES_DEF[route];
  return (
    <li className="nav-item">
      <NavLink className="nav-link" to={to}>
        {label}
      </NavLink>
    </li>
  );
};

NavRouteLink.propTypes = {
  route: PropTypes.string.isRequired,
};

export default NavRouteLink;
