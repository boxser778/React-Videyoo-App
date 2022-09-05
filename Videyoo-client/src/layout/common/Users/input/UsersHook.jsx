import {
  deleteUser,
  deleteUserVideos,
} from "../../../../services/adminService";
import { Link } from "react-router-dom";
import "./users.scss";
import useUsers from "../useUsers";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { setAdmin } from "../../../../services/adminService";
import { BsCheckCircle } from "@react-icons/all-files/bs/BsCheckCircle";
import { GiCancel } from "@react-icons/all-files/gi/GiCancel";
import { getCurrentUser } from "../../../../services/userService";

const GetUsersHook = () => {
  const onClickDelete = (userID) => {
    Swal.fire({
      title: "Are You Sure You Want To Delete This User?",
      showCancelButton: true,
      confirmButtonText: "Delete!",
      confirmButtonColor: "#dc3545",
    }).then(async (result) => {
      if (result.isConfirmed) {
        console.log(userID);
        deleteUserVideos(userID);
        await deleteUser(userID);
        toast.success("You have successfuly deleted the User!");
        window.location.reload(true);
      }
    });
  };

  const promoteUser = (user) => {
    Swal.fire({
      title:
        "This User Will Given an Admin Permissions, Are You Sure About This?",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
      confirmButtonColor: "#1dce00",
      cancelButtonColor: "red",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await setAdmin(user);
        if (user.isAdmin === false) {
          toast.success(`${user.name} is admin now!`);
        }
        if (user.isAdmin === true) {
          toast.success(`${user.name} no longer admin!`);
        }

        setTimeout(function () {
          window.location.reload(true);
        }, 1000);
      }
    });
  };

  const logedUser = getCurrentUser();
  if (logedUser === null || logedUser.isAdmin === false) {
    window.location.href = "/";
  }

  const users = useUsers();

  return (
    <table className="userTable">
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Email</th>
          <th>Admin</th>
          <th className="actions">Actions</th>
        </tr>
      </thead>

      <tbody>
        {users.map((user, index) => {
          const { name, email } = user;
          return (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{name}</td>
              <td>{email}</td>
              {user.isAdmin === true ? (
                <td className="shape">
                  <BsCheckCircle
                    style={{
                      color: "rgb(2, 200, 15)",
                      fontSize: "30px",
                    }}
                  />
                </td>
              ) : (
                <td className="shape">
                  <GiCancel style={{ color: "red", fontSize: "30px" }} />
                </td>
              )}

              <td className="actions-block">
                <span
                  className="cursor btn btn-danger"
                  onClick={() => onClickDelete(user._id)}
                >
                  Delete
                </span>{" "}
                <Link to={`/edit-user/${user._id}`}>
                  <span className="cursor btn btn-primary">Edit</span>
                </Link>{" "}
                <span
                  className="cursor btn btn-warning"
                  onClick={() => promoteUser(user)}
                >
                  Admin
                </span>{" "}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default GetUsersHook;
