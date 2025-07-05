import { useRef, useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Editor } from "@tinymce/tinymce-react";

import UserContext from "../../UserContext";

import styles from "../../styles/BlogEditor.module.css";
// import './App.css';

export default function BlogEditor({ mode, blogContent = null }) {
  const { isLoggedIn, isAuthor } = useContext(UserContext);
  const { blogId } = useParams();
  const [postErr, setPostErr] = useState(false);
  const [ blogPostErrMsgs, setblogPostErrMsgs ] = useState([]);
  const titleRef = useRef(null);
  const editorRef = useRef(null);
  const publishCheckboxRef = useRef(null);

  useEffect(() => {
    if(blogContent) {
      titleRef.current.value = blogContent.title;
      publishCheckboxRef.current.checked = blogContent.published
    }
  }, [blogContent])

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isLoggedIn && isAuthor && editorRef.current) {
      setPostErr(false);

      if (mode == "post") {
        const token = localStorage.getItem("token");
        const formData = new FormData();
        formData.append("title", titleRef.current.value);
        formData.append("content", editorRef.current.getContent());
        formData.append("published", publishCheckboxRef.current.checked);
        formData.append("authorId", isAuthor.id);
        fetch(`http://localhost:3000/blogs/post-blog`, {
          method: "POST",
          body: new URLSearchParams(formData),
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
          .then((res) => {
            res.ok ? (window.location = "/blogs") : setPostErr(true);
            return res.json();
          })
          .then((res) => setblogPostErrMsgs([...res.errors]))
          .catch((err) => {
            if (err) {
              setPostErr(true);
            }
          });
      } else if(mode == 'edit') {
        const token = localStorage.getItem("token");
        const formData = new FormData();
        formData.append("title", titleRef.current.value);
        formData.append("content", editorRef.current.getContent());
        formData.append("published", publishCheckboxRef.current.checked);
        formData.append("authorId", isAuthor.id);
        fetch(`http://localhost:3000/blogs/edit-blog/${blogId}`, {
          method: "PUT",
          body: new URLSearchParams(formData),
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
          .then((res) => {
            res.ok ? (window.location =  `/blogs/${blogId}`) : setPostErr(true);
            return res.json();
          })
          .then((res) => setblogPostErrMsgs([...res.errors]))
          .catch((err) => {
            if (err) {
              setPostErr(true);
            }
          });
      }
    }
  };

  return (
    <form>
      {mode == 'edit' ? (
        <h2 className={styles.editBlogHeading}>Editing Blog</h2>
      ) : null}
      <div className={styles.labelAndInputCont}>
        <label htmlFor="title">Title</label>
        <input
          ref={titleRef}
          placeholder="My Title..."
          className={styles.titleInput}
          type="text"
          name="title"
          id="title"
          required
          minLength={1}
        />
      </div>
      {!postErr ? null : (
        <div className={styles.postErrMsg}>
          <h3>Something went wrong...</h3>
          <p>Please try again</p>
        </div>
      )}
      {blogPostErrMsgs.length == 0 ? null : (
        <ul className={styles.blogErrMsgsUl}>
          {blogPostErrMsgs.map((err, indx) => {
            return (
              <li key={indx} className={styles.blogErrMsgsLi}>{err.msg}</li>
            )
          })}
        </ul>
      )}
      <Editor
        apiKey={import.meta.env.VITE_API_KEY}
        onInit={(_evt, editor) => (editorRef.current = editor)}
        initialValue={mode == 'post' ? "<p>Hello world!</p>" : blogContent.content}
        init={{
          height: 500,
          menubar: false,
          plugins: [
            "advlist",
            "autolink",
            "lists",
            "link",
            "image",
            "charmap",
            "preview",
            "anchor",
            "searchreplace",
            "visualblocks",
            "code",
            "fullscreen",
            "insertdatetime",
            "media",
            "table",
            "code",
            "help",
            "wordcount",
          ],
          toolbar:
            "undo redo | blocks | " +
            "bold italic forecolor | alignleft aligncenter " +
            "alignright alignjustify | bullist numlist outdent indent | " +
            "removeformat | help",
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
        }}
      />
      <div className={styles.checkboxAndLabelCont}>
        <input
          ref={publishCheckboxRef}
          type="checkbox"
          name="published"
          id="published"
        />
        <label htmlFor="published">Publish this blog?</label>
      </div>
      <div className={styles.submitBtnCont}>
        <button className={styles.postBlogBtn} onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </form>
  );
}
