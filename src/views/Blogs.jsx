import { useEffect, useContext, useState } from "react";
import { Link } from "react-router-dom";
import { formatRelative } from "date-fns";

import UserContext from "../UserContext";

import styles from "../styles/Blogs.module.css";
import Sidebar from "./partials/Sidebar";
import Navbar from "./partials/Navbar";

import likeIcon from '../assets/thumb_up.svg';
import dislikeIcon from '../assets/thumb_down.svg';
import commentsIcon from '../assets/person-msg-icon.svg';

const Blogs = () => {
  const { isLoggedIn, isAuthor } = useContext(UserContext);

  const [authorBlogs, setAuthorBlogs] = useState([]);

  useEffect(() => {
    if (isAuthor != null && isLoggedIn) {
      const token = localStorage.getItem("token");
      fetch(`http://localhost:3000/author/blogs/${isAuthor.id}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((res) => {
          setAuthorBlogs(res);
        });
    }
  }, [isLoggedIn, isAuthor]);

  return (
    <>
      <Sidebar />
      <Navbar />
      <main className={styles.authorBlogsMainCont}>
        <h1 className={styles.blogsHeading}>Blogs</h1>
        {authorBlogs.length > 0 ? (
          <>
            <ul className={styles.blogsUl}>
              {authorBlogs.map((blog) => {
                return (
                  <li className={styles.blogListItemCont} key={blog.id}>
                    <h3><Link to={`/blogs/${blog.id}`}>{blog.title}</Link></h3>
                    <p>{blog.published ? "Published" : "Not published"}</p>
                    <p>Posted: {formatRelative(blog.createdAt, new Date())}</p>
                    {formatRelative(blog.createdAt, new Date()) != formatRelative(blog.modifiedAt, new Date()) ? (
                                          <p>Modified: {formatRelative(blog.modifiedAt, new Date())}</p>

                    ) : null}
                    <div className={styles.likesDislikesCommentsCont}>
                      <div className={styles.likeAndDislikeOnlyCont}>
                        <div className={styles.likeCont}>
                          <img className={styles.likeIcon} width='25px'  src={likeIcon} alt="likes" />
                          <p>
                            {blog.UsersLikedBlogs.reduce((total, val) => {
                              return val.like ? total + 1 : total + 0;
                            }, 0)}
                          </p>
                        </div>
                        <div className={styles.dislikesCont}>
                          <img className={styles.dislikeIcon} src={dislikeIcon} alt="dislikes" />
                          <p>
                            {blog.UsersLikedBlogs.reduce((total, val) => {
                              return !val.like ? total + 1 : total + 0;
                            }, 0)}
                          </p>
                        </div>
                      </div>
                      <div className={styles.commentsCont}>
                        <img src={commentsIcon} alt="comments" />
                        <p>{blog._count.Comments}</p>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </>
        ) : (
          <>
            <p className={styles.noBlogsMsg}>
              It looks like you don't have any blogs right now...
            </p>
            <p className={styles.noBlogsMsg}>
              <Link to={"/post-blog"}>Write a blog</Link>
            </p>
          </>
        )}
      </main>
    </>
  );
};

export default Blogs;
