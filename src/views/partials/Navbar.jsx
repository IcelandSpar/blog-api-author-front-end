import { Link } from "react-router-dom";
import { useContext } from "react";
import UserContext from "../../UserContext";
import styles from "../../styles/Navbar.module.css";

const Navbar = () => {
  const { isLoggedIn } = useContext(UserContext);
  console.log(isLoggedIn);

  return (
    <>
      <nav className={styles.navBarCont}>
        <Link to={"/"}>Home</Link>
        {isLoggedIn ? (
          <>
            <Link to={"/post-blog"}>Post Blog</Link>
            <Link to={'/logout'}>Logout</Link>
          </>
        ) : (
          <>
            <Link to={"/login"}>Login</Link>
            <Link to={"/register"}>Register</Link>
          </>
        )}
      </nav>
    </>
  );
};

export default Navbar;
