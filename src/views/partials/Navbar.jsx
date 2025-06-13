import { Link } from "react-router-dom";
import { useContext } from "react";
import UserContext from "../../UserContext";

import SidebarBtn from './SidebarBtn.jsx';

import styles from "../../styles/Navbar.module.css";

const Navbar = () => {
  const { isLoggedIn, isAuthor, isSideBarOpen} = useContext(UserContext);
  


  return (
    <>
      <nav className={styles.navBarCont}>
      <SidebarBtn sidebarStyles={styles.sideBarBtnStyle}/>
        <div className={styles.linksCont}>
          <Link tabIndex={!isSideBarOpen ? null : '-1'} to={"/"}>Home</Link>
          {(isAuthor == null || isAuthor == false) && isLoggedIn ? (
            <Link tabIndex={!isSideBarOpen ? null : '-1'} to={'/become-an-author'}>Become an Author</Link>
          ) : (
            null
          )}
          {isLoggedIn && isAuthor ? (<Link tabIndex={!isSideBarOpen ? null : '-1'} to={"/post-blog"}>Post Blog</Link>) : null}
          {isLoggedIn ? (
            <>
              <Link tabIndex={!isSideBarOpen ? null : '-1'} to={"/logout"}>Logout</Link>
            </>
          ) : (
            <>
              <Link tabIndex={!isSideBarOpen ? null : '-1'} to={"/login"}>Login</Link>
              <Link tabIndex={!isSideBarOpen ? null : '-1'} to={"/register"}>Register</Link>
            </>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
