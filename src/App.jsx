import { useState, useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import UserContext from './UserContext.jsx';
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import router from './main.jsx';

function App() {

  const [ isLoggedIn, setIsLoggedIn ] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch(`http://localhost:3000/login/check-if-auth`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then((res) => res.json())
    .then((res) => res.isAuth ? setIsLoggedIn(true) : setIsLoggedIn(false))
  }, [isLoggedIn])

  return (
    <>
      <UserContext.Provider value={{isLoggedIn}}>
        <RouterProvider router={router}/>
      </UserContext.Provider>
    </>
  )
}

export default App
