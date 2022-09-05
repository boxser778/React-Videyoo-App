import React from "react";
import Form from "./../common/Form/Form";
import PageHeader from "./../common/pageHeader";
import { toast } from "react-toastify";
import { getCurrentUser, login, signup } from "../../services/userService";
import { Navigate } from "react-router-dom";
import { userValidation } from "../../services/validateService";

class Signup extends Form {
  state = {
    data: {
      name: "",
      email: "",
      url: "",
      password: "",
    },
    errors: {},
  };

  schema = userValidation();

  doSubmit = async () => {
    try {
      const user = { ...this.state.data };
      await signup(user).then(delete user.name, delete user.url);
      await login(user);
      toast.success(`${user.name} you signup successfully`);
      window.location = "/";
    } catch (error) {
      if (error.response && error.response.status === 400)
        this.setState({
          errors: { email: "This user is already registered!" },
        });
    }
  };

  render() {
    const user = getCurrentUser();
    if (user) return <Navigate replace to="/" />;

    return (
      <div style={{ minHeight: "85vh" }} className="container-fluid ">
        <div className="container">
          <PageHeader
            title="Signup Page"
            subTitle="Create your new user here"
          />
          <div className="center">
            <form
              onSubmit={this.handleSubmit}
              autoComplete="off"
              method="POST"
              className="col-12 col-md-10 col-xl-6 border p-2 bg-white"
            >
              {this.renderInput("name", "Name")}
              {this.renderInput("email", "Email", "email")}
              {this.renderInput("password", "Password", "password")}
              {this.renderInput("url", "Url")}
              {this.renderButton("Signup")}
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Signup;
