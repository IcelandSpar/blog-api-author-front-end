import { useContext } from 'react';
import { Link } from 'react-router-dom';
import UserContext from '../../UserContext';

import SidebarBtn from './SidebarBtn';

import styles from '../../styles/Sidebar.module.css';
import homeIcon from '../../assets/home-icon.svg';
import loginIcon from '../../assets/login-icon.svg';
import blogsIcon from '../../assets/view-list.svg';
import logoutIcon from '../../assets/logout-icon.svg';
import profileIcon from '../../assets/profile-circle.svg';
import registerIcon from '../../assets/register-icon.svg';
import postBlogIcon from '../../assets/post-blog-icon.svg';
import authorBadgeIcon from '../../assets/author-badge-icon.svg';


const Sidebar = () => {
  const { isSideBarOpen, setIsSideBarOpen, isLoggedIn, isAuthor } = useContext(UserContext);
  const handleSideBarBtn = (e) => {
    e.preventDefault();
    setIsSideBarOpen((prev) => !prev);
  };

  return (
    <>
      <div onClick={(e) => handleSideBarBtn(e)} className={`${styles.background} ${isSideBarOpen ? styles.activeBackground : null}`}>
      </div>
        <aside className={`${styles.sidebarCont} ${isSideBarOpen ? styles.activeSidebar : null}`}>
          <div className={styles.sideBarBtnCont}>
            <SidebarBtn sidebarStyles={styles.sidebarBtn}/>
          </div>
          <div className={styles.iconAndLinkContainers}>
            <img src={homeIcon} alt="home" />
            <p onClick={handleSideBarBtn}>
              <Link tabIndex={isSideBarOpen ? null : '-1'} to={'/'}>Home</Link>
            </p>
          </div>
          {!isLoggedIn ? (
            <>
          <div className={styles.iconAndLinkContainers}>
            <img src={loginIcon} alt="login" />
            <p onClick={handleSideBarBtn}>
              <Link  tabIndex={isSideBarOpen ? null : '-1'} to={'/login'}>Login</Link>
            </p>
          </div>
          <div className={styles.iconAndLinkContainers}>
            <img src={registerIcon} alt="register" />
            <p onClick={handleSideBarBtn}>
              <Link tabIndex={isSideBarOpen ? null : '-1'} to={'/register'}>Register</Link>
            </p>
          </div>
            </>
          ) : (
        <>

          {isAuthor ? (
            <>
                      <div className={styles.iconAndLinkContainers}>
            <img src={profileIcon} alt="profile" />
            <p onClick={handleSideBarBtn}>
              <Link tabIndex={isSideBarOpen ? null : '-1'} to={'/profile'}>Profile</Link>
            </p>
          </div>
          <div className={styles.iconAndLinkContainers}>
            <img src={blogsIcon} alt="blogs" />
            <p onClick={handleSideBarBtn}>
              <Link tabIndex={isSideBarOpen ? null : '-1'} to={'/blogs'}>My Blogs</Link>
            </p>
          </div>
          <div className={styles.iconAndLinkContainers}>
          <img src={postBlogIcon} alt="post blog" />
          <p onClick={handleSideBarBtn}>
            <Link tabIndex={isSideBarOpen ? null : '-1'} to={'/post-blog'}>Post Blog</Link>
          </p>
        </div>
            </>

          ) : (
            <div className={styles.iconAndLinkContainers}>
          <img src={authorBadgeIcon} alt="become an author" />
          <p onClick={handleSideBarBtn}>
            <Link tabIndex={isSideBarOpen ? null : '-1'} to={'/become-an-author'}>Become an Author</Link>
          </p>
            </div>
          )}
                      <div className={styles.iconAndLinkContainers}>
            <img src={logoutIcon} alt="logout" />
            <p onClick={handleSideBarBtn}>
              <Link tabIndex={isSideBarOpen ? null : '-1'} to={'/logout'}>Logout</Link>
            </p>
            </div>

        </>
          )}
        </aside>
        </>
  )
};

export default Sidebar;