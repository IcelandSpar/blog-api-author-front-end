import Navbar from "./partials/Navbar.jsx";

import styles from '../styles/BecomeAuthor.module.css';

const BecomeAuthor = () => {
  return (
    <>
      <Navbar />
      <main>
        <form className={styles.becomeAuthorForm}>
          <fieldset className={styles.becomeAuthorFieldSet}>
            <legend>Become an Author</legend>
            <div className={styles.labelAndTextAreaCont}>
              <label htmlFor="bio">Bio: </label>
              <textarea rows='3' className={styles.formTextArea} id="bio" name="bio" required></textarea>
            </div>
            <button className={styles.becomeAuthorBtn} type="button">Become an Author</button>
          </fieldset>
        </form>
      </main>
    </>
  );
};

export default BecomeAuthor;
