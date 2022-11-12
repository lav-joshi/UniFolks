import React,{Component} from 'react'
import{ BrowserRouter as Router , Route } from 'react-router-dom';
import Dashboard from './Dashboard.jsx';
import Profile from './Profile.jsx';
import "bootstrap/dist/css/bootstrap.min.css";
import {UserProvider, UserConsumer} from './context/UserContext';
import Cookies from 'universal-cookie';
import ChatGround from './ChatGround.jsx';
import HomePage from './HomePage.jsx';
import "bootstrap/dist/css/bootstrap.min.css";
import _ from './styles/main.scss';

const cookies = new Cookies();

class App extends Component {

  constructor(props) {
    super(props);

    this.toggleAuth = (para) => {
      this.setState({
        isAuthenticated : para
      });
    };

    this.state = {
      isAuthenticated: false,
      toggleAuth: this.toggleAuth,
    };
  }

  componentDidMount =()=>{
    if(cookies.get('token')){
      this.toggleAuth(true);
    }
    const data = new FormData();
    data.append("name","Lav");
  }
 
  render() {
    return (
      <div>
         <UserProvider value={this.state} >
            <Router>
                <Route path="/" exact component={HomePage} /> 
                <UserConsumer>
                    {
                      ({isAuthenticated, toggleAuth}) => (
                          
                          isAuthenticated?
                          <>
                            <Route path="/dashboard" exact component={Dashboard} /> 
                            <Route path="/profile" exact component={Profile} /> 
                            <Route path = "/chat" exact component={ChatGround}/>
                          </>: 
                          <></>
                      )
                    }
                </UserConsumer>
            </Router>
          </UserProvider>
      </div>
    )
  }
}


export default App