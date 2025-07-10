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
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
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
        })
        .finally(() => setIsLoading(false));
    }
  }, [isLoggedIn, isAuthor]);

  return (
    <>
      <Sidebar />
      <Navbar />
      <main className={styles.authorBlogsMainCont}>
        {!isLoggedIn ? (
          <div className={styles.mustBeLoggedInMsg}>
            <p>You must be <Link to={'/login'}>logged in</Link> to view blogs</p>
          </div>
        ) : (
          <>
            <h1 className={styles.blogsHeading}>Blogs</h1>
            {authorBlogs.length > 0 ? (
              <>
                <ul className={styles.blogsUl}>
                  {authorBlogs.map((blog, indx) => {
                    return (
                      <BlogPreviews
                        key={blog.id}
                        blog={blog}
                        indx={indx}
                        setAuthorBlogs={setAuthorBlogs}
                        styles={styles}
                      />
                    );
                  })}
                </ul>
              </>
            ) : isLoading ? (
              <>
                <p>Loading...</p>
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
          </>
        )}
      </main>
    </>
  );
};

export default Blogs;
