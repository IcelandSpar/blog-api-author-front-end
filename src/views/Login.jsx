import { useRef } from 'react';
import Navbar from "./partials/Navbar.jsx";
import styles from '../styles/Login.module.css';

const Login = () => {
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);

  const handleSubmit = () => {
    console.log(usernameRef.current.value)
    console.log(passwordRef.current.value)
  }


  return (
    <>
      <Navbar />
      <main className={styles.loginMainCont}>
        <form className={styles.loginForm}>
          <fieldset className={styles.fieldsetCont}>
            <legend>Login</legend>
            <div className={styles.labelAndInputCont}>
              <label htmlFor="username">Username: </label>
              <input className={styles.loginInputs} ref={usernameRef} type="text" id="username" name="username" autoComplete="true"/>
            </div>
            <div className={styles.labelAndInputCont}>
              <label htmlFor="password">Password: </label>
              <input className={styles.loginInputs} ref={passwordRef} type="password" id="password" name="password"/>
            </div>
            <button type="button" onClick={handleSubmit} className={styles.loginBtn}>Login</button>
          </fieldset>
        </form>
      </main>
    </>
  );
};

export default Login;
