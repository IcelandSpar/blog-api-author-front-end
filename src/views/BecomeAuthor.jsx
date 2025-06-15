import { useRef, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import UserContext from '../UserContext.jsx';

import Navbar from "./partials/Navbar.jsx";
import Sidebar from './partials/Sidebar.jsx';
import styles from '../styles/BecomeAuthor.module.css';

const BecomeAuthor = () => {
  const bioInputRef = useRef();
  // const { isAuthor, setIsAuthor } = useContext(UserContext)
  const { setIsAuthor } = useContext(UserContext)

  // const [ bioInputCharacterCount, setBioInputCharacterCount ] = useState(null);
  const [ submitErr, setSubmitErr ] = useState(false);
  const [ inputEmptyErr, setInputEmptyErr ] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitErr(false);
    setInputEmptyErr(false);
    let isThereErr = false;

    if(bioInputRef.current.value.length <= 0) {
      setInputEmptyErr(true);
      isThereErr = true
      return;
    }
    const token = localStorage.getItem('token');
    const formData = new FormData();

    formData.append('bio', bioInputRef.current.value);


    if(bioInputRef.current.value.length > 0) {
      fetch(`http://localhost:3000/author/become-author`, {
        method: 'POST',
        body: new URLSearchParams(formData),
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((res) => {
        if(!res.ok) {
          setSubmitErr(true);
          isThereErr = true
        } 
        return res.json()
      })
      .then((res) => setIsAuthor(res.author))
      .catch((err) => {
        console.error(err)
        setSubmitErr(true)
      })
      .finally(() => {
      });
      if(!isThereErr) {
        navigate('/')
      }
    }
  }

  return (
    <>
      <Sidebar/>
      <Navbar />
      <main>
        <form className={styles.becomeAuthorForm}>
          <fieldset className={styles.becomeAuthorFieldSet}>
            <legend className={styles.formLegend}>Become an Author</legend>
            {submitErr ? <p>Something went wrong...</p> : null}
            {inputEmptyErr ? <p>You must submit a bio please.</p> : null}
            <div className={styles.labelAndTextAreaCont}>
              <label htmlFor="bio">Bio: </label>
              <textarea ref={bioInputRef} rows='3' className={styles.formTextArea} id="bio" name="bio" required autofocus></textarea>
            </div>
            <button onClick={(e) => handleSubmit(e)} className={styles.becomeAuthorBtn} type="button">Become an Author</button>
          </fieldset>
        </form>
      </main>
    </>
  );
};

export default BecomeAuthor;
