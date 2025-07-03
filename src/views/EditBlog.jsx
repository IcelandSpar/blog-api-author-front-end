import { Editor } from '@tinymce/tinymce-react';
import { useRef, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Navbar from './partials/Navbar.jsx';
import Sidebar from './partials/Sidebar.jsx';
import BlogEditor from './partials/BlogEditor.jsx';

import styles from '../styles/PostBlog.module.css';

const EditBlog = () => {
  const [ blogContent, setBlogContent ] = useState(null);
  const { blogId } = useParams();

  useEffect(() => {
    fetch(`http://localhost:3000/blogs/${blogId}`)
    .then((res) => res.json())
    .then((res) => setBlogContent(res))
    .catch((err) => console.error(err))
  }, [blogId])

  return (
    <>
    <Navbar/>
    <Sidebar/>
      <main className={styles.postBlogMainCont}>
      {blogContent == null ? (
        <h3>Something went wrong, please try again later.</h3>
      ) : (
      <BlogEditor mode={'edit'} blogContent={blogContent}/>
      )}
{console.log(blogContent)}
      </main>
    </>
  )
};

export default EditBlog;