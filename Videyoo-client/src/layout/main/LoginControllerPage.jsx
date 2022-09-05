import Login from "./Login";
import { Navigate } from "react-router-dom";
import { getCurrentUser } from "../../services/userService";

import LoginG from "../../components/login";

const LoginPage = () => {
  const user = getCurrentUser();
  if (user) return <Navigate replace to="/" />;

  return (
    <div className="login-contianer">
      <div className="login">
        <h1 className="loginTitle">Choose a Login Method</h1>
        <div className="wrapper">
          <div className="left">
            <div className="loginButton">
              <LoginG />
            </div>
          </div>
          <div className="center">
            <div className="line" />
            <div className="or">OR</div>
          </div>
          <div className="right">
            <Login />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
