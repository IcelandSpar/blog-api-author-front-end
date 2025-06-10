import { useRef, useState } from 'react';
import Navbar from "./partials/Navbar.jsx";
import styles from '../styles/Login.module.css';

const Login = () => {
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);

  const [ loginErr, setLoginErr ] = useState(false);

  const formData = new FormData()

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoginErr(false);
    let isThereLoginErr = false;
    formData.append('username', usernameRef.current.value);
    formData.append('password', passwordRef.current.value);

    await fetch(`http://localhost:3000/login`, {
      method: 'POST',
      body: new URLSearchParams(formData),
    })
    .then((res) => {
      if(res.ok == false) {
        isThereLoginErr = true;
        setLoginErr(true);
      } else {
        isThereLoginErr = false;
        setLoginErr(false);
      }
      return res.json();
    })
    .then((res) => {
      localStorage.setItem('token', res.token);
    })
    .catch((err) => {
      console.error(err)

    })
    .finally(() => {
      if(isThereLoginErr == false) {
        window.location.href = '/';
      } else if (isThereLoginErr == true) {
        return null
      }
    })
  }

  return (
    <>
      <Navbar />
      <main className={styles.loginMainCont}>
        <form className={styles.loginForm}>
          <fieldset className={styles.fieldsetCont}>
            <legend className={styles.loginLegend}>Login</legend>
            {!loginErr ? null : <p>Username or password is incorrect, please try again.</p>}
            <div className={styles.labelAndInputCont}>
              <label className={styles.inputLabels} htmlFor="username">Username: </label>
              <input className={styles.loginInputs} ref={usernameRef} type="text" id="username" name="username" autoComplete="true"/>
            </div>
            <div className={styles.labelAndInputCont}>
              <label className={styles.inputLabels} htmlFor="password">Password: </label>
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
