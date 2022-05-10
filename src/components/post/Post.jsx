import { useState, useEffect, forwardRef, useImperativeHandle } from 'react'
// Css
import './post.css';

const Post = forwardRef(({ data, user, editPostHandler, deleteHandler }, ref) => {
  // Show - Hide edit
  const [showEdit, setShowEdit] = useState(false);
  const [enableEdit, setEnableEdit] = useState(false);

  // Edited title and content
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');

  // Show post content full height
  const [seeMore, setSeeMore] = useState(false);

  useImperativeHandle(ref, () => {
    return {
      closeEdit
    }
  })

  // Close edit section when user is logged out
  useEffect(() => {
    if(user === null){
      setShowEdit(false);
    }
  }, [user])

  const closeEdit = () => {
    setShowEdit(false);
  }

  // Edit
  const handleEdit = () => {
    if(newTitle !== '' || newContent !== ''){
      const obj = {
        title: newTitle,
        content: newContent,
        likes: data.likes
      }
      editPostHandler(obj, data.id);
      setEnableEdit(!enableEdit);
      setNewContent('');
      setNewTitle('');
    }else{
      setEnableEdit(!enableEdit);
      setNewTitle(data.title);
      setNewContent(data.content)
    }
  }

  // Like
  const handleLike = () => {
    const newObj = {
      title: data.title,
      content: data.content,
      likes: data.likes + 1
    }
    editPostHandler(newObj, data.id)
  }

  return (
    <div className='post-card'>
      {
        enableEdit ?
        <input
          type='text' 
          value={newTitle} 
          onChange={({ target }) => setNewTitle(target.value)} 
        /> :
        <h3>{data.title}</h3>
      }
      {
        enableEdit ?
        <textarea
          value={newContent} 
          onChange={({ target }) => setNewContent(target.value)} 
        /> :
        <p style={{ maxHeight: seeMore ? '' : '150px' }}>
          {data.content}
          <button onClick={() => setSeeMore(!seeMore)}>
            {seeMore ? 'See less' : 'See more'}
          </button>
        </p>
      }
      <div className='like-more-div'>
        <button className='like-btn' onClick={handleLike}>
          {data.likes} Likes
          <i style={{ marginLeft: "5px" }} className="fa-solid fa-thumbs-up"></i>
        </button>
        <button 
          className='more-hide-btn'
          onClick={
            enableEdit ? () => setShowEdit(true) : 
            user && user.username === data.author.username ? () => setShowEdit(!showEdit) : 
            () => setShowEdit(false)
          }
        >
          {showEdit ? 'Hide' : 'More...'}
        </button>
      </div>
      {/* Hidden */}
      <div 
        className='edit'
        style={{ display: showEdit ? 'flex' : 'none' }}
      > 
        <p><span>Author:</span> {data.author?.username}</p>
        <p>{data.date}</p>
        <div>
          <button className='btn-edit' onClick={handleEdit}>
            {enableEdit ? 
            'Save' : 
            'Edit'
            }
            {enableEdit ? 
            <i style={{ marginLeft: "5px" }} className="fa-solid fa-circle-check"></i> : 
            <i style={{ marginLeft: "5px" }} className="fa-solid fa-file-pen"></i>}
          </button>
          <button className='btn-delete' onClick={() => deleteHandler(data.id)}>
            Delete
            <i style={{ marginLeft: "5px" }} className="fa-solid fa-trash"></i>
          </button>
        </div>
      </div>
    </div>
  );
});

export default Post;