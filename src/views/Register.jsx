import Navbar from "./partials/Navbar.jsx";
import styles from '../styles/Register.module.css';

const Register = () => {
  return (
    <>
      <Navbar />
      <main className={styles.registerMainCont}>
        <form>
          <fieldset className={styles.fieldsetCont}>
            <legend className={styles.registerLegend}>Register</legend>
            <div className={styles.labelAndInputCont}>
              <label className={styles.inputLabels} htmlFor="username">Username: </label>
              <input className={styles.registerInputs} type="text" id="username" name="username"/>
            </div>
            <div className={styles.labelAndInputCont}>
              <label className={styles.inputLabels} htmlFor="password">Password: </label>
              <input className={styles.registerInputs} type="text" id="password" name="password"/>
            </div>
            <button className={styles.registerBtn}>Register</button>
          </fieldset>
        </form>
      </main>
    </>
  );
};

export default Register;
