import React from 'react'
import { GoogleLogout } from 'react-google-login';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

const LogOut = (props) => {

    const logout = ()=>{
       props.toggleAuth(false);
       cookies.set('token','');
    }

    return (
      <div>
        <GoogleLogout
        clientId={process.env.REACT_APP_CLIENT_ID}
        buttonText="Logout"
        onLogoutSuccess={logout}
        >
        </GoogleLogout>
      </div>
    )
}

export default LogOut