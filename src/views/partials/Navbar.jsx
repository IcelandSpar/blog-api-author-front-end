import { Link } from "react-router-dom";
import { useContext } from "react";
import UserContext from "../../UserContext";
import styles from "../../styles/Navbar.module.css";

const Navbar = () => {
  const { isLoggedIn, isAuthor, isSideBarOpen, setIsSideBarOpen } = useContext(UserContext);
  
  const handleSideBarBtn = (e) => {
    e.preventDefault();
    setIsSideBarOpen((prev) => !prev)
    console.log(isSideBarOpen);
  }

  return (
    <>
      <nav className={styles.navBarCont}>
      <button onClick={(e) => handleSideBarBtn(e)} className={styles.sideBarBtn}>Side</button>
        <Link to={"/"}>Home</Link>
        {(isAuthor == null || isAuthor == false) && isLoggedIn ? (
          <Link to={'/become-an-author'}>Become an Author</Link>
        ) : (
          null
        )}
        {isLoggedIn && isAuthor ? (<Link to={"/post-blog"}>Post Blog</Link>) : null}
        {isLoggedIn ? (
          <>
            <Link to={"/logout"}>Logout</Link>
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
