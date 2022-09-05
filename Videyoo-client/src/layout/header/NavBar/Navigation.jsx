import React from "react";
import LeftNavigation from "./LeftNavigation";
import RightNavigation from "./RightNavigation";

const Navigation = ({ user }) => (
  <div
    className="collapse navbar-collapse justify-content-between"
    id="navbarSupportedContent"
  >
    <LeftNavigation user={user} />
    <RightNavigation user={user} />
  </div>
);

export default Navigation;
