import { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';

import styles from '../../styles/BlogEditor.module.css';
// import './App.css';

export default function BlogEditor() {
  const editorRef = useRef(null);
  const publishCheckboxRef = useRef(null);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }

    console.log(publishCheckboxRef.current.checked)
  };

  return (
    <form>
      <div className={styles.labelAndInputCont}>
        <label htmlFor="title">Title</label>
        <input placeholder='My Title...' className={styles.titleInput} type="text" name='title' id='title' required/>
      </div>
      <Editor
        apiKey={import.meta.env.VITE_API_KEY}
        onInit={ (_evt, editor) => editorRef.current = editor }
        initialValue="<p>This is the initial content of the editor.</p>"
        init={{
          height: 500,
          menubar: false,
          plugins: [
            'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
            'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
            'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
          ],
          toolbar: 'undo redo | blocks | ' +
            'bold italic forecolor | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
            'removeformat | help',
          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
        }}
      />
      <div className={styles.checkboxAndLabelCont}>
        <input ref={publishCheckboxRef} type="checkbox" name="published" id="published"/>
        <label htmlFor="published">Publish this blog?</label>
      </div>
      <div className={styles.submitBtnCont}>
        <button className={styles.postBlogBtn} onClick={handleSubmit}>Submit</button>
      </div>
    </form>
  );
}