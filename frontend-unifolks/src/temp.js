import React,{Component, useEffect, useState} from 'react'
import{ BrowserRouter as Router , Route } from 'react-router-dom';
import Dashboard from './Dashboard.jsx';
import Profile from './Profile.jsx';
import {UserProvider, UserConsumer} from './context/UserContext';
import Cookies from 'universal-cookie';
import ChatGround from './ChatGround.jsx';
import HomePage from './HomePage.jsx';
import "bootstrap/dist/css/bootstrap.min.css";
import _ from './styles/main.scss';

const cookies = new Cookies();

export default function App() {
  const [isAuthenticated, toggleAuth] = useState(false);

  useEffect(()=>{
    if(cookies.get('token')){
      toggleAuth(true);
    }
    const data = new FormData();
    data.append("name","Lav");
  }, []);
    return (
      <div>
         <UserProvider value={this.state} >
            <Router>
                <Route path="/" exact component={HomePage} /> 
                <UserConsumer>
                    {
                      isAuthenticated?
                      <>
                        <Route path="/dashboard" component={Dashboard} /> 
                        {/* <Route path = "/chat" exact component={ChatGround}/> */}
                      </>: 
                      <></>
                    }
                </UserConsumer>
            </Router>
          </UserProvider>
      </div>
    )
  }