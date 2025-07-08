import { useRef, useState } from "react";

import Navbar from "./partials/Navbar.jsx";
import Sidebar from "./partials/Sidebar.jsx";
import styles from "../styles/Register.module.css";

const Register = () => {
  const usernameInput = useRef(null);
  const passwordInput = useRef(null);
  const checkboxInput = useRef(null);
  const bioInput = useRef(null);

  const [isBioOpen, setIsBioOpen] = useState(false);
  const [registerErr, setRegisterErr] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [errMsgs, setErrMsgs] = useState([]);

  const handleCheck = (e) => {
    setIsBioOpen(e.target.checked);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setErrMsgs([]);
    setRegisterErr(false);
    const formData = new FormData();
    formData.append("username", usernameInput.current.value);
    formData.append("password", passwordInput.current.value);
    formData.append("author", checkboxInput.current.checked);
    if (checkboxInput.current.checked) {
      formData.append("bio", bioInput.current.value);
    }
    fetch(`http://localhost:3000/register`, {
      method: "POST",
      body: new URLSearchParams(formData),
    })
      .then((res) => {
        if (!res.ok) {
          setRegisterErr(true);
        } else if (res.ok) {
          window.location = "/";
        }
        return res.json();
      })
      .then((res) => {
        if (res.errors) {
          setErrMsgs(res.errors);
        }
        if (res.message) {
          setErrMsg(res.message);
        }
      })
      .catch((err) => {
        console.error(err);
        setRegisterErr(true);
        setErrMsg("Something went wrong...");
      });
  };

  return (
    <>
      <Sidebar />
      <Navbar />
      <main className={styles.registerMainCont}>
        <form onSubmit={handleRegister}>
          <fieldset className={styles.fieldsetCont}>
            <legend className={styles.registerLegend}>Register</legend>
            {!errMsgs ? null : (
              <ul>
                {errMsgs.map((errorMsg, indx) => {
                  return (
                    <li className={styles.validationMsgs} key={indx}>
                      {errorMsg.msg}
                    </li>
                  );
                })}
              </ul>
            )}
            {!registerErr ? null : <p>{errMsg}</p>}
            <div className={styles.labelAndInputCont}>
              <label className={styles.inputLabels} htmlFor="username">
                Username:{" "}
              </label>
              <input
                ref={usernameInput}
                className={styles.registerInputs}
                type="text"
                id="username"
                name="username"
                autoFocus
              />
            </div>
            <div className={styles.labelAndInputCont}>
              <label className={styles.inputLabels} htmlFor="password">
                Password:{" "}
              </label>
              <input
                ref={passwordInput}
                className={styles.registerInputs}
                type="password"
                id="password"
                name="password"
              />
            </div>
            {isBioOpen ? (
              <div className={styles.labelAndInputCont}>
                <label className={styles.inputLabels} htmlFor="bio">
                  Author Bio:
                </label>
                <textarea
                  ref={bioInput}
                  name="bio"
                  id="bio"
                  
                ></textarea>
              </div>
            ) : null}
            <div className={styles.checkBoxCont}>
              <input
                onClick={handleCheck}
                type="checkbox"
                className={styles.registerInputs}
                ref={checkboxInput}
                id="author"
                name="author"
              />
              <label htmlFor="author">Become an Author</label>
            </div>

            <button className={styles.registerBtn}>Register</button>
          </fieldset>
        </form>
      </main>
    </>
  );
};

export default Register;
