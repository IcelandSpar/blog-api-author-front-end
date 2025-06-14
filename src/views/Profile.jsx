import { useContext } from 'react';
import { formatRelative } from 'date-fns';
import UserContext from '../UserContext.jsx';

import styles from '../styles/Profile.module.css';
import Navbar from './partials/Navbar.jsx';
import Sidebar from './partials/Sidebar';
import blogProfile from '../assets/blog-profile.png';


const Profile = () => {
  const { isAuthor } = useContext(UserContext);

  // const { isAuthor, setIsAuthor } = useContext(UserContext);

  // useEffect(() => {
  //   if(isAuthor == null) {
  //     const token = localStorage.getItem('token');

  //     fetch(`http://localhost:3000/author/check-if-author`, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       }
  //     })
  //     .then((res) => res.json())
  //     .then((res) => {
  //       setIsAuthor(res.author)
  //     })
  //   }
  // }, [isAuthor, setIsAuthor])

  return (
    <>
    <Sidebar/>
    <Navbar/>
    <main>
    <div className={styles.authorPage}>
      <main className={styles.authorMainCont}>
      <img src={blogProfile} alt="Author Profile Picture" width='300px' height='300px'/>
      {/* Image by <a href="https://pixabay.com/users/mohamed_hassan-5229782/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=3596548">Mohamed Hassan</a> from <a href="https://pixabay.com//?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=3596548">Pixabay</a> */}
      {isAuthor == null ? null : (
        <section className={styles.authorInfoCont}>
        <h1 className={styles.authorUserHeading}>{isAuthor.user.username}</h1>
        <p className={styles.authorBio}>{isAuthor.bio}</p>
        <p>Joined: {formatRelative(isAuthor.joined, new Date())}</p>
      </section>
      )}

      </main>

    </div>
    </main>
    </>
  )
};

export default Profile;