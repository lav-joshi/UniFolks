import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from 'react-router-dom';
import Login from './Login';
import LogOut from './LogOut';
import { UserConsumer } from '../UserContext';

const NavBar = () => {
    return (
        <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
            <div className="container-fluid">
                <Link to="/" className="navbar-brand"> UniFolks </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul className="nav navbar-nav me-auto">
                        <li className="nav-item">
                            <Link to="/" className="nav-link active" aria-current="page">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/" className="nav-link">Cart</Link>
                        </li>
                    </ul>
                    <ul class="nav navbar-nav navbar-right">
                        <li className="nav-item">
                        <UserConsumer>
                        {
                            ({isAuthenticated, toggleAuth}) => (
                                
                                isAuthenticated ?  <LogOut toggleAuth={toggleAuth}/> : <Login toggleAuth={toggleAuth}/>
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