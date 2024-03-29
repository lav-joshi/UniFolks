import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from 'react-router-dom';
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';
import { UserConsumer } from '../context/UserContext';
import logo from '../images/Unifolks-Logo.png';

const NavBar = () => {
    return (
        <nav className="navbar navbar-dark navbar-expand-lg">
            <div className="container-fluid">
                <Link to="/" className="navbar-brand"> <img alt="Unifolks-logo" src={logo} className="homepage-logo"/>UniFolks </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul className="nav navbar-nav me-auto">
                        <li className="nav-item">
                            <Link to="/dashboard" className="nav-link" aria-current="page">Home</Link>
                        </li>
                    </ul>
                    <ul class="nav navbar-nav navbar-right">
                        <li className="nav-item">
                        <UserConsumer>
                        {
                            ({isAuthenticated, toggleAuth}) => (
                                
                                isAuthenticated ?  <LogoutButton toggleAuth={toggleAuth}/> : <LoginButton toggleAuth={toggleAuth}/>
                            )
                        }
                        </UserConsumer>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default NavBar