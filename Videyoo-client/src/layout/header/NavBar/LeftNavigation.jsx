import React from "react";
import NavRouteLink from "../../common/Navigation/NavRouteLink";
import { ROUTES } from "../../../model/routes";

const LeftNavigation = ({ user }) => {
  return (
    <ul className="navbar-nav">
      <NavRouteLink route={ROUTES.ABOUT} />
      {user && <NavRouteLink route={ROUTES.MY_VIDEOS} />}
      {user && <NavRouteLink route={ROUTES.UPLOADVID} />}
    </ul>
  );
};

export default LeftNavigation;
