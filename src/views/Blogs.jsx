import { useEffect, useContext, useState } from "react";
import { Link } from "react-router-dom";
import { formatRelative } from "date-fns";

import UserContext from "../UserContext";

import Navbar from "./partials/Navbar";
import Sidebar from "./partials/Sidebar";
import BlogPreviews from "./partials/BlogPreviews";

import styles from "../styles/Blogs.module.css";

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
                  <BlogPreviews key={blog.id} blog={blog} setAuthorBlogs={setAuthorBlogs} styles={styles} />
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
