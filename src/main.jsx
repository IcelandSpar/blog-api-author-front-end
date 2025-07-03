import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx';
import Home from './views/Home.jsx';
import Blog from './views/Blog.jsx';
import Blogs from './views/Blogs.jsx';
import Login from './views/Login.jsx';
import Logout from './views/Logout.jsx';
import Profile from './views/Profile.jsx';
import Register from './views/Register.jsx';
import PostBlog from './views/PostBlog.jsx';
import EditBlog from './views/EditBlog.jsx';
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
    path: '/blogs/:blogId',
    element: <Blog/>,
  },
  {
    path: '/edit-blog/:blogId',
    element: <EditBlog/>
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
