import { Link } from 'react-router-dom';

import styles from '../../styles/Navbar.module.css';

const Navbar = () => {
  return (
    <>
    <nav className={styles.navBarCont}>
    <Link to={'/'}>Home</Link>
    <Link to={'/login'} >Login</Link>
    <Link to={'/register'}>Register</Link>
    <Link to={'/post-blog'}>Post Blog</Link>
    </nav>
    </>
  )
};

export default Navbar;