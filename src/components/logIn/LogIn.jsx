import { useState, forwardRef, useImperativeHandle } from 'react';
// Helper
import { usernameValidator, nameValidator, passwordValidator } from './helper';
import './login.css';

const LogIn = forwardRef(({ loginHandler, signupHandler }, ref) => {
  // Switch sign up - log in
  const [switchSignup, setSwitchSignup] = useState(false);

  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  // Error notifications in input
  const [usernameError, setUsernameError] = useState('');
  const [nameError, setNameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  // Notifications after submit
  const [notification, setNotification] = useState('');
  const [notificationClass, setNotificationClass] = useState('');

  useImperativeHandle(ref, () => {
    return {
      handleSuccess,
      handleError
    }
  })

  const handleSuccess = (text) => {
    setNotification(text);
    setNotificationClass('text-success')
    setTimeout(() => {
      setNotification('');
      setNotificationClass('');
      setSwitchSignup(!switchSignup);
    }, 3000)
  }

  const handleError = (text) => {
    setNotification(text);
    setNotificationClass('text-error');
    setTimeout(() => {
      setNotification('');
      setNotificationClass('');
    }, 3000)
  }

  const handleLogin = (e) => {
    e.preventDefault();
    setUsernameError('');
    setNameError('');
    setPasswordError('');

    if(!usernameValidator(username)){
      setUsernameError('* Username must be at least 4 character');
    }
    if(!passwordValidator(password)){
      setPasswordError('* Password must be at least 8 character');
    }

    if(usernameValidator(username) &&
       passwordValidator(password)){
      
      const obj = {
        username,
        password
      }
      loginHandler(obj);
      setUsername('');
      setName('');
      setPassword('');
    }
  }

  const handleSignup = (e) => {
    e.preventDefault();
    setUsernameError('');
    setNameError('');
    setPasswordError('');

    if(!usernameValidator(username)){
      setUsernameError('* Username must be at least 4 character');
    }
    if(!nameValidator(name)){
      setNameError('* Name must be at least 2 character');
    }
    if(!passwordValidator(password)){
      setPasswordError('* Password must be at least 8 character');
    }

    if(usernameValidator(username) &&
       nameValidator(name) &&
       passwordValidator(password)){
      
      const obj = {
        username,
        name,
        password
      }
      signupHandler(obj);
      setUsername('');
      setName('');
      setPassword('');
    }
  }

  const changeForm = (e) => {
    e.preventDefault();
    setUsername('');
    setName('');
    setPassword('');
    setUsernameError('');
    setNameError('');
    setPasswordError('');
    setSwitchSignup(!switchSignup);
  }

  const loginForm = () => {
    return (
      <div className='form-div'>
        <form onSubmit={handleLogin}>
          <h4>Log In</h4>
          {notification && <p className={notificationClass}>{notification}</p>}
          <div>  
            <input
              style={{ borderColor: usernameError ? '#fa3b3b' : '#919191' }}
              onChange={({ target }) => setUsername(target.value)}
              value={username} 
              type='text' 
              placeholder='Username'
              maxLength='30'
            />
            {usernameError && <p className='error-p'>{usernameError}</p>}
          </div>

          <div>  
            <input
              style={{ borderColor: passwordError ? '#fa3b3b' : '#919191' }}
              onChange={({ target }) => setPassword(target.value)}
              value={password} 
              type='password' 
              placeholder='Password'
              maxLength='30'
            />
            {passwordError && <p className='error-p'>{passwordError}</p>}
          </div>

          <button 
            className='submit-btn'
            type='submit'
            onClick={handleLogin}
          >
            Log in
          </button>
          <button
            type='button'
            className='change-btn'
            onClick={changeForm}
          >
            Don't have account? Sign up
          </button>
        </form>
      </div>
    );
  }

  const signupForm = () => {
    return (
      <div className='form-div'>
        <form onSubmit={handleSignup}>
          <h4>Sign Up</h4>
          {notification && <p className={notificationClass}>{notification}</p>}
          <div>  
            <input
              style={{ borderColor: usernameError ? '#fa3b3b' : '#919191' }}
              onChange={({ target }) => setUsername(target.value)}
              value={username} 
              type='text' 
              placeholder='Username'
              maxLength='30'
            />
            {usernameError && <p className='error-p'>{usernameError}</p>}
          </div>

          <div>  
            <input
              style={{ borderColor: nameError ? '#fa3b3b' : '#919191' }}
              onChange={({ target }) => setName(target.value)}
              value={name} 
              type='text' 
              placeholder='Name'
              maxLength='30'
            />
            {nameError && <p className='error-p'>{nameError}</p>}
          </div>

          <div>  
            <input
              style={{ borderColor: passwordError ? '#fa3b3b' : '#919191' }}
              onChange={({ target }) => setPassword(target.value)}
              value={password} 
              type='password' 
              placeholder='Password' 
              maxLength='30'
            />
            {passwordError && <p className='error-p'>{passwordError}</p>}
          </div>

          <button
            className='submit-btn' 
            type='submit'
            onClick={handleSignup}
          >
            Sign up
          </button>
          <button
            type='button'
            className='change-btn'
            onClick={changeForm}
          >
            Already member? Log in
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className='login'>
      {switchSignup ? signupForm() : loginForm()}
    </div>
  );
})

export default LogIn;