import { useState, useContext, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

import styles from '../../styles/Comments.module.css';
import { formatRelative } from 'date-fns';

import bookmarkHeart from '../../assets/bookmark_heart.svg';
import likeIcon from '../../assets/thumb_up.svg';
import dislikeIcon from '../../assets/thumb_down.svg';
import UserContext from '../../UserContext.jsx';
import cachedIcon from '../../assets/cached.svg';
import commentProfileIcon from '../../assets/person-msg-icon.svg';
import brokenHeartIcon from '../../assets/broken-heart.svg';
import deleteIcon from '../../assets/delete-icon.svg';


const Comment = ({comment, blogAuthor, commentIndx, setComments}) => {
  const { isLoggedIn, isAuthor } = useContext(UserContext);

  const updateCountTimerInst = useRef({timer: 3});
  const timerInstance = useRef({timer: 0});

  const [ like, setLike ] = useState(comment.UserLikedComments.length);
  const [ dislike, setDislike ] = useState(comment._count.UserLikedComments);
  const [ userCurrentLikeStatus, setUserCurrentLikeStatus ] = useState(comment.userLikeStatus == 'undefined' ? null : comment.userLikeStatus);
  const [ updateCount, setUpdateCount ] = useState(null);
  const [ loadingLikeSelect, setLoadingLikeSelect ] = useState(null);
  const [ openUserLike, setOpenUserLike ] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setUserCurrentLikeStatus(comment.userLikeStatus == 'undefined' ? null : comment.userLikeStatus)
    }, 1000)
  }, [comment.userLikeStatus])

  const sendCurrentLike = (currentLikeStatus, commentId) => {
    setLoadingLikeSelect(true);
    clearTimeout(timerInstance.current.timer)
    clearInterval(updateCountTimerInst.current.timer);

    setUpdateCount(3);
    let virtualTime = 3;

    timerInstance.current.timer = setTimeout(() => {
      const token = localStorage.getItem('token');
      fetch(`http://localhost:3000/comments/like-comment/${commentId}/${currentLikeStatus}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((res) => res.json())
      .then((res) => console.log(res))
      .finally(() => setLoadingLikeSelect(false))

    }, 3000)

    updateCountTimerInst.current.timer = setInterval(() => {
      if(virtualTime > 1) {
        virtualTime = virtualTime - 1;
        setUpdateCount((prev) => prev - 1);
      } else {
        setUpdateCount(null)
      }
    }, 1000);


  }

  const handleLike = (e, commentId) => {
    e.preventDefault();
    let currentLikeState = null;
    if(isLoggedIn) {
      if(userCurrentLikeStatus == null) {
        setLike((prev) => prev + 1)
        setUserCurrentLikeStatus(true);
        currentLikeState = true;
      } else if(userCurrentLikeStatus == false) {
        setDislike((prev) => prev - 1)
        setLike((prev) => prev + 1);
        setUserCurrentLikeStatus(true);
        currentLikeState = true;
      } else if (userCurrentLikeStatus == true) {
        setLike((prev) => prev - 1);
        setUserCurrentLikeStatus(null);
        currentLikeState = null;
      }
      sendCurrentLike(currentLikeState, commentId);
    } else {
      setOpenUserLike(true);
    }
  };

  const handleDislike = (e, commentId) => {
    e.preventDefault();
    let currentLikeState = null;
    if(isLoggedIn) {
      if(userCurrentLikeStatus == null) {
        setDislike((prev) => prev + 1);
        setUserCurrentLikeStatus(false);
        currentLikeState = false;
      } else if (userCurrentLikeStatus == true) {
        setLike((prev) => prev - 1);
        setDislike((prev) => prev + 1);
        setUserCurrentLikeStatus(false);
        currentLikeState = false;
      } else if (userCurrentLikeStatus == false) {
        setDislike((prev) => prev - 1);
        setUserCurrentLikeStatus(null);
        currentLikeState = null;
      }
      sendCurrentLike(currentLikeState, commentId);
    } else {
      setOpenUserLike(true);
    }
  };

  const handleFav = (e) => {
    e.preventDefault();
    if(comment.authorHeartedComments.length <= 0 && isLoggedIn) {
    const token = localStorage.getItem('token');
    
    fetch(`http://localhost:3000/comments/author-heart/${isAuthor.id}/${comment.id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      },
      method: 'POST'
    })
    .then((res) => res.json())
    .then((res) => console.log(res));

    setComments((prev) => {
      const mappedComments = prev.map((mappedComment) => {
        if(mappedComment.id == comment.id) {
          return {
            ...mappedComment, authorHeartedComments: [{hearted: true}],
          }
        } else {
          return mappedComment
        }
      })
      return mappedComments;
    })
    } else {
          const token = localStorage.getItem('token');

          fetch(`http://localhost:3000/comments/author-heart/${isAuthor.id}/${comment.id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      },
      method: 'POST'
    })
    .then((res) => res.json())
    .then((res) => console.log(res));
    setComments((prev) => {
      const mappedComments = prev.map((mappedComment) => {
        if(mappedComment.id == comment.id) {
          return {
            ...mappedComment, authorHeartedComments: [],
          }
        } else {
          return mappedComment
        }
      })
      return mappedComments;
    })
    }

  };

  const handleDelete = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    fetch(`http://localhost:3000/comments/delete/${comment.id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    
    setComments((prev) => {
      const removedArr = prev.filter((value, index) => index != commentIndx)
      return removedArr
    })  
  };

  return (
    <li className={styles.listItemCont}>
      <div className={styles.commentTitleUserHeartCont}>
        <div className={styles.titleAndHeartCont}>
          <h3 className={styles.commentHeader}>{comment.commentTitle}</h3>
          {!(comment.authorHeartedComments.length > 0) ? null : (
            <div className={styles.authorHeartAndIconCont}>
              <img className={styles.bookmarkHeartIcon} src={bookmarkHeart} alt="author hearted" />
              <p className={styles.commentAuthorHeart}>{`${blogAuthor} loved!`}</p>
            </div>
          )}
        </div>
        <div className={styles.commenUserAndHeartCont}>
          <div className={styles.profilePicCommentUserCont}>
            <img src={commentProfileIcon} className={styles.commentProfileIcon} alt="profile picture" />
            <p className={styles.commentUser}>{comment.user.username}</p>
          </div>
        </div>
      </div>
      <p>{comment.comment}</p>
      <div className={styles.postedAndLikeCont}>
        <div className={styles.postedTimeStamps}>
          <p>Posted: {formatRelative(comment.createdAt, new Date())}</p>
          {formatRelative(comment.createdAt, new Date()) == formatRelative(comment.modifiedAt, new Date()) ? null : <p>Edited: {formatRelative(comment.modifiedAt, new Date())}</p>
        }
        </div>
        <div className={styles.commentLikeAndDislikeCont}>
          <button onClick={(e) => handleLike(e, comment.id)} type='button' className={`${styles.likeAndParaBtn} ${userCurrentLikeStatus == true ? styles.activeCommentLike : null} ${styles.commentLikeBtn}`}>
            <img className={styles.likeIcon} src={likeIcon} alt="like" />
            <p>{like}</p>
          </button>
          <button onClick={(e) => handleDislike(e, comment.id)} type='button' className={`${styles.likeAndParaBtn} ${userCurrentLikeStatus == false ? styles.activeCommentLike : null} ${styles.commentDislikeBtn}`}>
            <img className={styles.likeIcon} src={dislikeIcon} alt="dislike" />
            <p>{dislike}</p>
          </button>
        </div>
      </div>
      {!openUserLike ? null : (
        <p className={styles.logInMsgParaLink}>You must be <Link to='/login'>logged in</Link> to like a comment</p>
      )}
        {!loadingLikeSelect ? null : (
    <div className={styles.loadingLikeCont}>
      <img className={styles.loadingLikeIcon} src={cachedIcon} alt="loading" />
      <p>Updating Like {updateCount}</p>
    </div>
        )}
        <div className={styles.authorCommentControls}>
          <button onClick={handleFav} className={styles.authorControlBtns}>{comment.authorHeartedComments.length <= 0 ? (<><p>Love</p><img className={styles.bookmarkHeartIcon} src={bookmarkHeart} alt='Favorite' height='25px' width='25px'/></>) : (<><p>Unlove</p><img className={styles.bookmarkBrokenHeartIcon} src={brokenHeartIcon} alt='remove from favorites' height='25px' width='25px'/></>)}</button>
          <button onClick={handleDelete} className={styles.authorControlBtns}><p>Delete Comment</p><img src={deleteIcon} className={styles.deleteIcon} alt="delete" width='25px' height='25'/></button>
        </div>
    </li>
  )
};

export default Comment;