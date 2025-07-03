import { Editor } from '@tinymce/tinymce-react';
import { useRef, useEffect, useState } from 'react';

import Navbar from './partials/Navbar.jsx';
import Sidebar from './partials/Sidebar.jsx';
import BlogEditor from './partials/BlogEditor.jsx';

import styles from '../styles/PostBlog.module.css';

const PostBlog = () => {

  return (
    <>
    <Navbar/>
    <Sidebar/>
      <main className={styles.postBlogMainCont}>
      <BlogEditor mode={'post'}/>

      </main>
    </>
  )
};

export default PostBlog;