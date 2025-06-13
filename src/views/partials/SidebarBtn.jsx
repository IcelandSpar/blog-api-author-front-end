import { useContext } from 'react';
import UserContext from '../../UserContext';


import styles from '../../styles/SidebarBtn.module.css';
import sidebarBurger from '../../assets/sidebar-burger.svg';
import sideBarClose from '../../assets/close-nav-icon.svg'

const SidebarBtn = ({sidebarStyles}) => {
  const { isSideBarOpen, setIsSideBarOpen } = useContext(UserContext);
  const handleSideBarBtn = (e) => {
    e.preventDefault();
    setIsSideBarOpen((prev) => !prev);
  };
  return (
    <button onClick={(e) => handleSideBarBtn(e)} className={`${styles.sideBarBtn}  ${sidebarStyles}`}>
      <img className={styles.sideBarIcon} src={isSideBarOpen ? sideBarClose : sidebarBurger} alt={isSideBarOpen ? 'exit sidebar' : 'open sidebar'} />
    </button>
  );
};

export default SidebarBtn;
