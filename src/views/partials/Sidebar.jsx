import { useContext } from 'react';
import { Link } from 'react-router-dom';
import UserContext from '../../UserContext';

import SidebarBtn from './SidebarBtn';

import styles from '../../styles/Sidebar.module.css';
import homeIcon from '../../assets/home-icon.svg';
import blogsIcon from '../../assets/view-list.svg';
import profileIcon from '../../assets/profile-circle.svg';



const Sidebar = () => {
  const { isSideBarOpen, setIsSideBarOpen } = useContext(UserContext);
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
          <div className={styles.iconAndLinkContainers}>
            <img src={profileIcon} alt="profile" />
            <Link to={'/profile'}>Profile</Link>
          </div>
          <div className={styles.iconAndLinkContainers}>
            <img src={blogsIcon} alt="blogs" />
            <Link to={'/blogs'}>My Blogs</Link>
          </div>
        </aside>
        </>
  )
};

export default Sidebar;