import { useState, useEffect } from 'react';
// Css
import './profile.css';
// Component
import Post from '../post/Post';

const Profile = ({ posts, user, formHandler, editPostHandler, deleteHandler, refForProfile }) => {
  // Adding new post
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  // Validate post
  const [titleError, setTitleError] = useState('');
  const [contentError, setContentError] = useState('');
  // User's posts
  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    if(posts.length > 0 && user !== null){
      setUserPosts(posts.filter(i => i.author.username === user.username ));
    }else{
      setUserPosts([]);
    }
  }, [posts]) //eslint-disable-line

  const handlePost = (e) => {
    e.preventDefault();
    setTitleError('');
    setContentError('');

    if(title === ''){
      setTitleError('* This field is required');
    }
    if(content === ''){
      setContentError('* This field is required');
    }

    if(title !== '' && content !== ''){
      const postObj = {
        title,
        content
      }
      formHandler(postObj);
      setTitle('');
      setContent('');
    }
  }

  return (
    <div className='profile'>
      <div className="profile-form-div">
        <div className='post-form-div'>
          <form onSubmit={handlePost}>
            <h4>Add new post</h4>
            <div>
              <input 
                style={{ borderColor: titleError ? '#fa3b3b' : '#999999' }}
                type='text' 
                placeholder='Title'
                value={title}
                onChange={({ target }) => setTitle(target.value)}
                maxLength="30"
              />
              {titleError && <p className='error'>{titleError}</p>}
            </div>
            <div>
              <textarea
                style={{ borderColor: contentError ? '#fa3b3b' : '#999999' }}
                type='text' 
                placeholder='Content'
                value={content}
                onChange={({ target }) => setContent(target.value)}
                maxLength="500"
              />
              {contentError && <p className='error'>{contentError}</p>}
            </div>
            <button type='submit'>
              add post
            </button>
          </form>
        </div>
      </div>
      {/*  */}
      <div className='profile-posts'>
        <h4>My posts</h4>
        {userPosts.length > 0 && userPosts.map(i => {
          return (
            <Post 
              key={i.id}
              data={i}
              user={user}
              editPostHandler={editPostHandler}
              deleteHandler={deleteHandler}
              ref={refForProfile}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Profile;