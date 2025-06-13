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
            <Link to={'/'}>Home</Link>
          </div>
          {!isLoggedIn ? (
            <>
          <div className={styles.iconAndLinkContainers}>
            <img src={loginIcon} alt="login" />
            <Link to={'/login'}>Login</Link>
          </div>
          <div className={styles.iconAndLinkContainers}>
            <img src={registerIcon} alt="register" />
            <Link to={'/register'}>Register</Link>
          </div>
            </>
          ) : (
        <>

          {isAuthor ? (
            <>
                      <div className={styles.iconAndLinkContainers}>
            <img src={profileIcon} alt="profile" />
            <Link to={'/profile'}>Profile</Link>
          </div>
          <div className={styles.iconAndLinkContainers}>
            <img src={blogsIcon} alt="blogs" />
            <Link to={'/blogs'}>My Blogs</Link>
          </div>
          <div className={styles.iconAndLinkContainers}>
          <img src={postBlogIcon} alt="post blog" />
          <Link to={'/post-blog'}>Post Blog</Link>
        </div>
            </>

          ) : (
            <div className={styles.iconAndLinkContainers}>
          <img src={authorBadgeIcon} alt="become an author" />
          <Link to={'/become-an-author'}>Become an Author</Link>
            </div>
          )}
                      <div className={styles.iconAndLinkContainers}>
            <img src={logoutIcon} alt="logout" />
            <Link to={'/logout'}>Logout</Link>
            </div>

        </>
          )}
        </aside>
        </>
  )
};

export default Sidebar;