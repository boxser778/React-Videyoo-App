import React from "react";
import GetUsersHook from "./input/UsersHook";

const ShowUsers = ({ user }) => {
  return (
    <div className="row">
      <div>
        <GetUsersHook user={user} />
      </div>
    </div>
  );
};

export default ShowUsers;
