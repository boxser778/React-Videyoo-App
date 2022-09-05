import React from "react";
import Users from "../../common/Users/Users";

const AdminPage = ({ user }) => {
  return (
    <React.Fragment>
      <Users user={user} />
    </React.Fragment>
  );
};

export default AdminPage;
