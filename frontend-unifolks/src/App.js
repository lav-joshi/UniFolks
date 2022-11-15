import React,{Component} from 'react'
import{ BrowserRouter as Router , Route } from 'react-router-dom';
import Dashboard from './Dashboard.jsx';
import Profile from './Profile.jsx';
import {UserProvider, UserConsumer} from './context/UserContext';
import Cookies from 'universal-cookie';
import ChatGround from './ChatGround.jsx';
import HomePage from './HomePage.jsx';
import "bootstrap/dist/css/bootstrap.min.css";
import _ from './styles/main.scss';
import { createTheme, CssBaseline } from '@material-ui/core';
import { ThemeProvider } from '@emotion/react';

const cookies = new Cookies();
const font = `'Nunito Sans', sans-serif`;

const theme = createTheme({
  overrides: {
    MuiCssBaseline: {
      '@global': {
        html: {
          WebkitFontSmoothing: 'auto',
          fontFamily: `'Nunito Sans', sans-serif`,
        },
      },
    }
  },
  palette: {
    primary: {
      light: '#797979',
      main: '#585858',
      dark: '#3d3d3d',
      contrastText: '#fff',
    },
    secondary: {
      light: '#eabc33',
      main: '#E5AC01',
      dark: '#a07800',
      contrastText: '#3d3d3d',
    },
    content:{
      main:"#F0F1F0"
    }
  },
  typography: {
    fontFamily: font,
  },
});


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
          <ThemeProvider theme={theme}>
              <Router>
                  <CssBaseline />
                  <Route path="/" exact component={HomePage} /> 
                  <UserConsumer>
                      {
                        ({isAuthenticated, toggleAuth}) => (
                            
                            isAuthenticated?
                            <>
                              <Route path="/dashboard" component={Dashboard} /> 
                              {/* <Route path = "/chat" exact component={ChatGround}/> */}
                            </>: 
                            <></>
                        )
                      }
                  </UserConsumer>
              </Router>
            </ThemeProvider>
          </UserProvider>
      </div>
    )
  }
}


export default App