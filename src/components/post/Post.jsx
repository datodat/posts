import React, { useState } from 'react'
// Css
import './post.css';

const Post = ({ data }) => {
  const [showEdit, setShowEdit] = useState(false);

  return (
    <div className='post-card'>
      <h3>{data.title}</h3>
      <p>{data.content}</p>
      <button onClick={() => setShowEdit(!showEdit)}>
        {showEdit ? 'Hide' : 'More'}
      </button>
      <div 
        className='edit'
        style={{ display: showEdit ? 'flex' : 'none' }}
      > 
        <p><span>Author:</span> {data.author.username}</p>
        <p>{data.date}</p>
        <div>
          <button className='btn-edit'>Edit</button>
          <button className='btn-delete'>Delete</button>
        </div>
      </div>
    </div>
  );
}

export default Post;