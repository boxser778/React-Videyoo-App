import { GoogleLogin } from "react-google-login";
import axios from "axios";
import { toast } from "react-toastify";
import "./login.scss"

const apiUrl = process.env.REACT_APP_API_URL;

const clientId = process.env.GOOGLE_LOGIN_ID;

 const onSuccess = (response) => {
  axios({
        method: "POST",
        url: `${apiUrl}/users/googlelogin`,
        data: { tokenId: response },
      }).then((response) => {

        console.log("from client:",response);
        localStorage.setItem("token", response.data.token);
        toast.success("you logged successfully");
        window.location = "/";
      });
    };

    const onFailure = (response) => {
       console.log(response);
    };

function LoginG() {

    return (
        <div id="signInButton" className="colorGoogle" >
             <GoogleLogin className="btn-self"
                clientId={clientId}
                buttonText="Google Login"
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy={'single_host_origin'}
                inSignedIn={true}
            />    
         </div>
         

    )
}

export default LoginG;