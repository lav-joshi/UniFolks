import React from "react";
import GoogleLogin from "react-google-login";
import { useHistory } from 'react-router-dom';
import axios from "axios";
import Cookies from "universal-cookie";
const cookies = new Cookies();

const LoginButton = (props) => {
    const history = useHistory();
    const responseGoogle = (response) => {
        axios.post(`${process.env.REACT_APP_HOST}/api/auth/google/signin`, {
            tokenId: response.tokenId,
        })
        .then(async (res) => {
            cookies.set("token", res.data.token);
            cookies.set("user", res.data.user.name);
            cookies.set("email", res.data.user.email);
            props.toggleAuth(true);
            history.push("/dashboard");
        })
        .catch((e) => {
            console.log("Error");
        });
    };

    return (
      <div>
        <GoogleLogin
          clientId={process.env.REACT_APP_CLIENT_ID}
          buttonText="Login to continue"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={"single_host_origin"}
        />
      </div>
    );
};

export default LoginButton;
