// import { useState, createContext } from 'react';
import { RouterProvider } from 'react-router-dom';
import UserContext from '../UserContext.jsx'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import router from './main.jsx';

function App() {

  return (
    <>
      <UserContext.Provider value='hello'>
        <RouterProvider router={router}/>
      </UserContext.Provider>
    </>
  )
}

export default App
