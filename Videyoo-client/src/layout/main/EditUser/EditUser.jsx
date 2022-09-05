import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Axios from "axios";
import { toast } from "react-toastify";
import PageHeader from "../../common/pageHeader";

const apiUrl = process.env.REACT_APP_API_URL;

const EditUser = () => {
  const { userId } = useParams();

  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [Image, setImage] = useState("");

  useEffect(() => {
    Axios.post(`${apiUrl}/users/userInfo`, { userId: userId }).then(
      (response) => {
        if (response.data.success) {
          setName(response.data.userDetails.name);
          setEmail(response.data.userDetails.email);
          setImage(response.data.userDetails.url);
        } else {
          alert("ERROR: Failed to get user information.");
        }
      }
    );
  }, [userId]);

  function editUser(event) {
    event.preventDefault();

    const name = event.target[0].value;
    const email = event.target[1].value;
    const url = event.target[2].value;

    if (name === "") {
      throw toast.error(`Name Cant Be Empty!`);
    }
    if (name.length > 15) {
      throw toast.error(`Name Cant Be that long`);
    }

    if (email === "") {
      throw toast.error(`Email Cant Be Empty!`);
    }

    if (url === "") {
      throw toast.error(`Url Cant Be Empty!`);
    }

    Axios.put(`${apiUrl}/users/${userId}`, {
      name: name,
      email: email,
      url: url,
    }).then((response) => {
      if (response.data) {
        toast.success("User Updated Successfuly!");
        setTimeout(() => {
          window.location.replace("/admin-controll");
        }, 1000);
      } else {
        console.log(response);
        alert("ERROR: Video import failed.");
      }
    });
  }

  return (
    <>
      <PageHeader
        title="Edit User"
        subTitle="to update a user, please fill all the fields and select all the boxes"
      />
      <form onSubmit={editUser}>
        <div className="form-g">
          <label>Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Name (must be not longer then 25 letters)"
            value={Name}
            onChange={(e) => setName(e.target.value)}
          />
          <label>Email</label>
          <input
            className="form-control"
            type="email"
            required
            placeholder="Email"
            value={Email}
            onChange={(e) => setEmail(e.target.value)}
          ></input>
          <label>Account Image</label>
          <input
            type="text"
            className="form-control"
            placeholder="Image Url"
            value={Image}
            onChange={(e) => setImage(e.target.value)}
          />
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </>
  );
};

export default EditUser;
