import { useState, useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import UserContext from './UserContext.jsx';
import Sidebar from './views/partials/Sidebar.jsx';
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import router from './main.jsx';

function App() {

  const [ isLoggedIn, setIsLoggedIn ] = useState(null);
  const [ isAuthor, setIsAuthor ] = useState(null);
  const [ isSideBarOpen, setIsSideBarOpen ] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch(`http://localhost:3000/login/check-if-auth`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
    .then((res) => res.json())
    .then((res) => res.isAuth ? setIsLoggedIn(true) : setIsLoggedIn(false))

    if(isLoggedIn) {
      fetch(`http://localhost:3000/author/check-if-author`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })
      .then((res) => res.json())
      .then((res) => {
        setIsAuthor(res.author)
      })
    }



  }, [isLoggedIn])

  return (
    <>
      <UserContext.Provider value={{isLoggedIn, setIsLoggedIn, isAuthor, setIsAuthor, isSideBarOpen, setIsSideBarOpen}}>
        <RouterProvider router={router}/>
      </UserContext.Provider>
    </>
  )
}

export default App
