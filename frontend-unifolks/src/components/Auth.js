import React,{useState ,useEffect} from 'react'
import Cookies from 'universal-cookie';
import Login from './Login';
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
        <Login/> :  <LogOut/>
      }
       
    </div>
  )
}

export default App