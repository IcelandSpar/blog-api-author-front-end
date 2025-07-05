import { useState, useRef, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { formatRelative } from "date-fns";

import UserContext from "../../UserContext";

import DeleteModal from "./DeleteModal";

import likeIcon from "../../assets/thumb_up.svg";
import editIcon from "../../assets/post-blog-icon.svg";
import cachedIcon from "../../assets/cached.svg";
import deleteIcon from "../../assets/delete-icon.svg";
import dislikeIcon from "../../assets/thumb_down.svg";
import commentsIcon from "../../assets/person-msg-icon.svg";

const BlogPreviews = ({ styles, blog, setAuthorBlogs, indx }) => {
  let navigate = useNavigate();
  const { isLoggedIn, isAuthor } = useContext(UserContext);
  const publishedCountTimeoutInstance = useRef({ timer: 3 });
  const publishedCountIntervalInstance = useRef({ timer: 0 });
  const [published, setPublished] = useState(blog.published);
  const [updateCounter, setUpdateCounter] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handlePublishedCheckbox = (e) => {
    clearInterval(publishedCountIntervalInstance.current.timer);
    clearTimeout(publishedCountTimeoutInstance.current.timer);
    let virtualTime = 3;
    setUpdateCounter(3);
    setPublished((prev) => {
      return !prev;
    });

    publishedCountTimeoutInstance.current.timer = setTimeout(() => {
      if (isLoggedIn) {
        const token = localStorage.getItem("token");
        fetch(
          `http://localhost:3000/blogs/publish/${blog.id}/${e.target.checked}`,
          {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        ).then((res) => res.json());
      }
      clearTimeout(publishedCountTimeoutInstance.current.timer);
    }, 1000);

    publishedCountIntervalInstance.current.timer = setInterval(() => {
      if (virtualTime <= 0) {
        setUpdateCounter(null);
        clearInterval(publishedCountIntervalInstance.current.timer);
      } else if (virtualTime > 0) {
        setUpdateCounter((prev) => prev - 1);
        virtualTime = virtualTime - 1;
      }
    }, 1000);
  };

  const handleDelete = (e, blogId) => {
    e.preventDefault();
    if (isLoggedIn && isAuthor) {
      const token = localStorage.getItem("token");
      fetch(`http://localhost:3000/author/delete-blog/${blogId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          if (res.ok) {
            setAuthorBlogs((prev) => prev.filter((blog) => blog.id != blogId));
          }
          return res.json();
        })
        .then((res) => console.log(res))
        .catch((err) => console.error(err));
    }
  };

  const handleEditBtn = (e, blogId) => {
    e.preventDefault();
    navigate(`/edit-blog/${blogId}`);
  };

  // (e) => handleDelete(e, blog.id)
  const handleDeleteModal = (e, modalSetter) => {
    e.preventDefault();
    modalSetter((prev) => !prev);
  };

  return (
    <li className={`${styles.blogListItemCont} blogListItem${indx}`}>
      {!isDeleteModalOpen ? null : (
        <DeleteModal
          handleDelete={handleDelete}
          blogId={blog.id}
          setIsDeleteModalOpen={setIsDeleteModalOpen}
          handleDeleteModal={handleDeleteModal}
          blogTitle={blog.title}
        />
      )}
      <h3>
        <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
      </h3>
      <div className={styles.publishedInputAndLabel}>
        <input
          onChange={handlePublishedCheckbox}
          type="checkbox"
          name="published"
          checked={published}
        />
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
      <div className={styles.writtenAndCreatedCont}>
        <p>Written: {formatRelative(blog.createdAt, new Date())}</p>
        {formatRelative(blog.createdAt, new Date()) !=
        formatRelative(blog.modifiedAt, new Date()) ? (
          <p>Edited: {formatRelative(blog.modifiedAt, new Date())}</p>
        ) : null}
      </div>
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
          <div className={styles.commentsCont}>
            <img src={commentsIcon} alt="comments" />
            <p>{blog._count.Comments}</p>
          </div>
        </div>
        <div className={styles.editDeleteCont}>
          <button
            onClick={(e) => handleEditBtn(e, blog.id)}
            type="button"
            className={`${styles.editDeleteParaIconCont} editBlog`}
          >
            <img src={editIcon} alt="edit blog" />
            <p>Edit Blog</p>
          </button>
          <button
            onClick={(e) => handleDeleteModal(e, setIsDeleteModalOpen)}
            type="button"
            className={styles.editDeleteParaIconCont}
          >
            <img src={deleteIcon} alt="delete blog" />
            <p>Delete Blog</p>
          </button>
        </div>
      </div>
    </li>
  );
};

export default BlogPreviews;
