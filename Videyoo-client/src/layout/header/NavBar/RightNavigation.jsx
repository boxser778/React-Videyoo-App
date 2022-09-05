import React from "react";
import { ROUTES } from "../../../model/routes";
import NavRouteLink from "../../common/Navigation/NavRouteLink";
const RightNavigation = ({ user }) => {
  return (
    <ul className="navbar-nav">
      {!user && (
        <>
          <NavRouteLink route={ROUTES.LOGIN} />
          <NavRouteLink route={ROUTES.SIGNUP} />
        </>
      )}
      {user && user.isAdmin && <NavRouteLink route={ROUTES.ADMIN} />}
      {user && <NavRouteLink route={ROUTES.LOGOUT} />}
    </ul>
  );
};

export default RightNavigation;
