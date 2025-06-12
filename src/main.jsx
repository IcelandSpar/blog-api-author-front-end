import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx';
import Home from './views/Home.jsx';
import Blogs from './views/Blogs.jsx';
import Login from './views/Login.jsx';
import Logout from './views/Logout.jsx';
import Profile from './views/Profile.jsx';
import Register from './views/Register.jsx';
import PostBlog from './views/PostBlog.jsx';
import BecomeAuthor from './views/BecomeAuthor.jsx';


import { RouterProvider, createBrowserRouter } from 'react-router-dom';


const router = createBrowserRouter([
  {
    path: '/',
    element: <Home/>
  },
  {
    path: '/login',
    element: <Login/>
  },
  {
    path: '/logout',
    element: <Logout/>
  },
  {
    path: '/register',
    element: <Register/>
  },
  {
    path: '/become-an-author',
    element: <BecomeAuthor/>,
  },
  {
    path: '/profile',
    element: <Profile/> 
  },
  {
    path: '/blogs',
    element: <Blogs/>,
  },
  {
    path: '/blogs/:blogId'
  },
  {
    path: '/post-blog',
    element: <PostBlog/>
  }
]);



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App/>
  </StrictMode>,
)

export default router;
