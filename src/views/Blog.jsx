import { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import UserContext from "../UserContext";
import { formatRelative } from "date-fns";

import Navbar from "./partials/Navbar";
import Sidebar from "./partials/Sidebar";

import styles from '../styles/Blog.module.css';

const Blog = () => {
  const { isLoggedIn } = useContext(UserContext);
  const { blogId } = useParams();
  const [ blog, setBlog ] = useState(null);
  const [ loading, setLoading ] = useState(false);

  const handleLike = () => {

  };

  const handleDislike = () => {

  };

  useEffect(() => {
    fetch(`http://localhost:3000/blogs/${blogId}`)
    .then((res) => res.json())
    .then((res) => setBlog(res))
  }, [blogId])

  


  return (
    <>
      <Sidebar />
      <Navbar/>
          <div className={styles.blogPage}>
      <main className={styles.blogsMainCont}>
        {loading ? <p>Blog Loading...</p> : null }
      {blog == null ? null : (
          <div className={styles.blogContent}>
            <h1 className={styles.blogTitle}>{blog.title}</h1>
            <p>Written By: <Link to={`/profile`}>{blog.author.user.username}</Link></p>
            <p>{blog.content}</p>
            <p>Created: {formatRelative(blog.createdAt, new Date())}</p>
            <p>Last Modified: {formatRelative(blog.modifiedAt, new Date())}</p>
            {/* {!isLoggedIn ? null : (
              <>
            <div className={styles.blogLikeDislikeBtnCont}>
              <button onClick={handleLike} className={`${userLikeStatus == true ? styles.activeLike : styles.notActive} ${styles.blogLikeBtn}`} type='button'><img src={thumbUp} alt="like" className={userLikeStatus == true ? styles.activeSvg : styles.notActive}/> Likes {like}</button>
              <button onClick={handleDislike} className={`${userLikeStatus == false ? styles.activeDislike : styles.notActive} ${styles.blogDislikeBtn}`} type='button'><img src={thumbDown} alt="dislike"  className={userLikeStatus == false ? styles.activeSvg : styles.notActive}/> Dislikes {dislike}</button>
            </div>
            {updateCount == null ? null : (
              <p className={styles.updateCountPara}>Updating in {updateCount} <img className={styles.cachedIcon} src={cachedIcon} alt="saving like status" /></p>
            )}
            </>
            )} */}
          </div>
      )}

        <section>

        </section>
      </main>      
    </div>
    </>
  );
};

export default Blog;
