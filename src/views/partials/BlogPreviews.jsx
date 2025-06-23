import { useState, useRef, useContext } from "react";
import { Link } from "react-router-dom";
import { formatRelative } from "date-fns";

import UserContext from "../../UserContext";

import likeIcon from "../../assets/thumb_up.svg";
import cachedIcon from "../../assets/cached.svg";
import dislikeIcon from "../../assets/thumb_down.svg";
import commentsIcon from "../../assets/person-msg-icon.svg";

const BlogPreviews = ({ styles, blog }) => {
  const { isLoggedIn } = useContext(UserContext);
  const publishedCountTimeoutInstance = useRef({timer: 3});
  const publishedCountIntervalInstance = useRef({timer: 0});
  const [ published, setPublished ] = useState(blog.published);
  const [ updateCounter, setUpdateCounter ] = useState(null);

  const handlePublishedCheckbox = (e) => {
    clearInterval(publishedCountIntervalInstance.current.timer);
    clearTimeout(publishedCountTimeoutInstance.current.timer);
    let virtualTime = 3;
    setUpdateCounter(3)
    setPublished((prev) => {
      return !prev
    })

    publishedCountTimeoutInstance.current.timer = setTimeout(() => {
      if(isLoggedIn) {
        const token = localStorage.getItem('token');
      fetch(`http://localhost:3000/blogs/publish/${blog.id}/${e.target.checked}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })
      .then((res) => res.json())
      }
      clearTimeout(publishedCountTimeoutInstance.current.timer)
    }, 1000);

    publishedCountIntervalInstance.current.timer = setInterval(() => {
      if( virtualTime <= 0 ) {
        setUpdateCounter(null)
        clearInterval(publishedCountIntervalInstance.current.timer);
      } else if( virtualTime > 0 ) {
        setUpdateCounter((prev) => prev - 1);
        virtualTime = virtualTime - 1;
      }


      }, 1000);


    
  }

  return (
    <li className={styles.blogListItemCont}>
      <h3>
        <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
      </h3>
      <div className={styles.publishedInputAndLabel}>
        <input onChange={handlePublishedCheckbox} type="checkbox" name="published" checked={published} />
        <label htmlFor="published">
          {published ? "Published" : "Not published"}
        </label>
      </div>
      {updateCounter == null ? null : (
        <div className={styles.updateCountPara}>
          <img className={styles.cachedIcon} src={cachedIcon} alt="loading" />
          <p>Updating in {updateCounter}</p>
        </div>
      )}
      <p>Posted: {formatRelative(blog.createdAt, new Date())}</p>
      {formatRelative(blog.createdAt, new Date()) !=
      formatRelative(blog.modifiedAt, new Date()) ? (
        <p>Modified: {formatRelative(blog.modifiedAt, new Date())}</p>
      ) : null}
      <div className={styles.likesDislikesCommentsCont}>
        <div className={styles.likeAndDislikeOnlyCont}>
          <div className={styles.likeCont}>
            <img
              className={styles.likeIcon}
              width="25px"
              src={likeIcon}
              alt="likes"
            />
            <p>
              {blog.UsersLikedBlogs.reduce((total, val) => {
                return val.like ? total + 1 : total + 0;
              }, 0)}
            </p>
          </div>
          <div className={styles.dislikesCont}>
            <img
              className={styles.dislikeIcon}
              src={dislikeIcon}
              alt="dislikes"
            />
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
};

export default BlogPreviews;
