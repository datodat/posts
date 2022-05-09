import { useState } from 'react';
// Post
import Post from '../post/Post';
// Css
import './home.css';

const Home = ({ user, posts, formHandler }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const [titleError, setTitleError] = useState('');
  const [contentError, setContentError] = useState('');


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

  const phoneForm = () => {
    return (
      <div className='phone-form-div'>
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
    );
  }

  return (
    <div className='home'>
      <div className="home-left">
        {posts.length > 0 ?
          posts.map(i => <Post key={i.id} data={i} />) :
          <p>No posts</p>
        }
      </div>
      <div className="home-right">
        {user ? 
          phoneForm() : 
          <p className='not-logged-info'>
            You must be logged in to add phone!
          </p>}
      </div>
    </div>
  );
}

export default Home;