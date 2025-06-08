import Navbar from "./partials/Navbar.jsx";
import styles from '../styles/Register.module.css';

const Register = () => {
  return (
    <>
      <Navbar />
      <main className={styles.registerMainCont}>
        <form>
          <fieldset>
            <legend>Register</legend>
            <div>
              <label htmlFor="">Username: </label>
              <input type="text" />
            </div>
            <div>
              <label htmlFor="">Password: </label>
              <input type="text" />
            </div>
            <button>Register</button>
          </fieldset>
        </form>
      </main>
    </>
  );
};

export default Register;
