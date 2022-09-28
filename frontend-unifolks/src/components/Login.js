import React from 'react'
import GoogleLogin from 'react-google-login';
import axios from 'axios';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

const Login = (props) => {
  const responseGoogle = (response) => {

    axios.post('http://localhost:5000/api/auth/google/signin',{tokenId : response.tokenId}).then(async (res)=>{
      cookies.set('token', res.data.token);
      cookies.set('user',res.data.user.name);
      cookies.set('email',res.data.user.email);
      props.toggleAuth(true);
    })
    .catch((e)=>{
      console.log("Error");
    });

  }

  return (
    <div>
        <GoogleLogin
        clientId={process.env.REACT_APP_CLIENT_ID}
        buttonText="Login to continue"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={'single_host_origin'}/>  
    </div>
  )
}

export default Login