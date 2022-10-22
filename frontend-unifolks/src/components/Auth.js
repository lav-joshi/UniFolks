import React,{useState ,useEffect} from 'react'
import Cookies from 'universal-cookie';
import LoginButton from './LoginButton';
const cookies = new Cookies();

const App = () => {
  
  const [isAuthenticated, setisAuthenticated] = useState(false);

  useEffect(() => {
     if(cookies.get('token')){
       setisAuthenticated(true);
     }
  }, [])

  return (
    <div>
      {
        !isAuthenticated?  
        <LoginButton/> :  <LogoutButton/>
      }
       
    </div>
  )
}

export default App