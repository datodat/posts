import { useState } from 'react';
// Css
import './profile.css';

const Profile = ({ formHandler }) => {
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

  return (
    <div className='profile'>
      <div className="profile-left">

      </div>
      <div className="profile-right">
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
    </div>
  );
}

export default Profile;