import Comment from './Comment.jsx';

const Comments = ({stylesComments, comments, blog, setComments}) => {

  if(blog != null) {
    return (
      <ul className={stylesComments.BlogUl}>
      {comments.map((comment, indx) => <Comment key={comment.id} setComments={setComments} commentIndx={indx} comment={comment} blogAuthor={blog.author.user.username}/>)}
    </ul>
    )
  }


};

export default Comments;