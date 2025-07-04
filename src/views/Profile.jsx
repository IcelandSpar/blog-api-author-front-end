import { useContext, useState, useRef } from 'react';
import { formatRelative } from 'date-fns';
import UserContext from '../UserContext.jsx';

import styles from '../styles/Profile.module.css';
import Navbar from './partials/Navbar.jsx';
import Sidebar from './partials/Sidebar';
import blogProfile from '../assets/blog-profile.png';


const Profile = () => {
  const bioInputRef = useRef();

  const { isAuthor, setIsAuthor, isLoggedIn } = useContext(UserContext);
  const [ isFormOpen, setIsFormOpen ] = useState(false);
  const [ submitErr, setSubmitErr ] = useState(null);
  const [ inputEmptyErr, setInputEmptyErr ] = useState(null);
  const [ errorMsgs, setErrorMsgs ] = useState([]);

  const handleEditBioBtn = (e) => {
    e.preventDefault();
    setIsFormOpen((prev) => !prev);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const formData = new FormData();

    formData.append('bio', bioInputRef.current.value);


    fetch(`http://localhost:3000/author/update/${isAuthor.id}`, {
      method: 'PUT',
      body: new URLSearchParams(formData),
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
    .then((res) => {

      if(res.ok) {
        setIsFormOpen(prev => !prev)
      }
      return res.json();
    })
    .then((res) => {
      if(res.errors) {
        setErrorMsgs([...res.errors])
      }
    })


  }

  const handleTextarea = (e) => {
    e.preventDefault();
    console.log(e.target.value.rows)
    if(bioInputRef.current.value.length <= 255) {
    setIsAuthor({
      ...isAuthor,
      bio: e.target.value,
    })
    }
  }



  // const { isAuthor, setIsAuthor } = useContext(UserContext);

  // useEffect(() => {
  //   if(isAuthor == null) {
  //     const token = localStorage.getItem('token');

  //     fetch(`http://localhost:3000/author/check-if-author`, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       }
  //     })
  //     .then((res) => res.json())
  //     .then((res) => {
  //       setIsAuthor(res.author)
  //     })
  //   }
  // }, [isAuthor, setIsAuthor])

  return (
    <>
    <Sidebar/>
    <Navbar/>
    <main className={styles.authorProfileAndFormCont}>
    <div className={styles.authorPage}>
      <div className={styles.authorMainCont}>
      <img src={blogProfile} alt="Author Profile Picture" width='300px' height='300px'/>
      {/* Image by <a href="https://pixabay.com/users/mohamed_hassan-5229782/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=3596548">Mohamed Hassan</a> from <a href="https://pixabay.com//?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=3596548">Pixabay</a> */}
      {isAuthor == null ? null : (
        <section className={styles.authorInfoCont}>
        <h1 className={styles.authorUserHeading}>{isAuthor.user.username}</h1>
        <p className={styles.authorBio}>{isAuthor.bio}</p>
        <p>Joined: {formatRelative(isAuthor.joined, new Date())}</p>
        <button onClick={handleEditBioBtn} className={styles.editBtn}>Edit Bio</button>
      </section>
      )}

      </div>
      {!isFormOpen ? null : (
                <form className={styles.becomeAuthorForm}>
                  <fieldset className={styles.becomeAuthorFieldSet}>
                    <legend className={styles.formLegend}>Update your Bio</legend>
                    {submitErr ? <p>Something went wrong...</p> : null}
                    {errorMsgs == null ? null : (
                      <ul className={styles.errorMsgsUl}>
                        {errorMsgs.map((err, indx) => {
                          return (
                            <li className={styles.errorMsgsLi} key={indx}>{err.msg}</li>
                          )
                        })}
                      </ul>
                    )}
                    {inputEmptyErr ? <p>You must submit a bio please.</p> : null}
                    <div className={styles.labelAndTextAreaCont}>
                      <label htmlFor="bio">Bio: </label>
                      
                      {isAuthor == null ? null : (
                      <div className={styles.countAndTextAreaCont}>
                      <p className={styles.bioInputCount}>{isAuthor.bio.length} / 255</p>
                      <textarea maxLength={255} onChange={e => handleTextarea(e)} value={isAuthor.bio} ref={bioInputRef} rows='3' className={styles.formTextArea} id="bio" name="bio" required autoFocus ></textarea>
                      </div>
                      )}
                    </div>
                    <button onClick={(e) => handleSubmit(e)} className={styles.becomeAuthorBtn} type="button">Update bio</button>
                  </fieldset>
                </form>
      )}
    </div>
    </main>
    </>
  )
};

export default Profile;