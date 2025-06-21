import { Editor } from '@tinymce/tinymce-react';
import { useRef, useEffect, useState } from 'react';

import Navbar from './partials/Navbar.jsx';
import Sidebar from './partials/Sidebar.jsx';

import styles from '../styles/PostBlog.module.css';

const PostBlog = () => {
  const [ html, setHTML ] = useState({__html: ''});


  useEffect(() => {

  }, [])

  //     import.meta.env.VITE_API_KEY


  return (
    <>
    <Navbar/>
    <Sidebar/>
      <main className={styles.postBlogMainCont}>
      </main>
    </>
  )
};

export default PostBlog;