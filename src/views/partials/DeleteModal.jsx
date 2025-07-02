import styles from '../../styles/DeleteModal.module.css';
import exitIcon from '../../assets/logout-icon.svg';
import deleteIcon from '../../assets/delete-icon.svg';
import closeNavIcon from '../../assets/close-nav-icon.svg';

const DeleteModal = ({blogTitle, handleDeleteModal, setIsDeleteModalOpen, handleDelete, blogId}) => {
return (
  <div onClick={(e) => {
    e.preventDefault();
    if ((e.target.className).split(' ')[1]) {
      setIsDeleteModalOpen((prev) => !prev)
    }
  }} className={`${styles.modalBackground} modalBackground`}>
    <div className={styles.modalCont}>
    <button onClick={(e) => handleDeleteModal(e, setIsDeleteModalOpen)} type='button' className={styles.closeBtn}><img src={closeNavIcon} alt="close modal" /></button>
    <h4 className={styles.modalQuestion}>Are you sure you want to delete this blog?</h4>
    <p className={styles.blogTitle}>{blogTitle}</p>
    <p>This will delete the blog, comments, and likes permanently!</p>

    <div className={styles.btnsCont}>
      <button onClick={(e) => handleDeleteModal(e, setIsDeleteModalOpen)} type='button'><img src={exitIcon} alt="cancel" /><p>Cancel</p></button>
      <button className={styles.deleteBtn} onClick={(e) => handleDelete(e, blogId)} type='button'><img src={deleteIcon} alt="delete blog" /><p>Delete</p></button>
    </div>
    </div>
  </div>
)
};

export default DeleteModal;