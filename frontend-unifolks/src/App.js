import React,{Component} from 'react'
import{ BrowserRouter as Router , Route } from 'react-router-dom';
import Home from './components/Home';
import NavBar from './components/NavBar';
import Profile from './components/Profile';
import "bootstrap/dist/css/bootstrap.min.css";
import {UserProvider, UserConsumer} from './UserContext';
import Cookies from 'universal-cookie';
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
              <div className="container">
                <NavBar/>
                <br/>
                <UserConsumer>
                    {
                      ({isAuthenticated, toggleAuth}) => (
                          
                          isAuthenticated ?  <>
                            <Route path="/" exact component={Home} /> 
                            <Route path="/profile" exact component={Profile} /> 
                          </>: <div>Login from your IIITL account</div>
                      )
                    }
                </UserConsumer>
              </div>
            </Router>
          </UserProvider>
      </div>
    )
  }
}


export default App