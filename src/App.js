import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
// Css
import './App.css';
// Components
import Header from './components/header/Header';
import Profile from './components/profile/Profile';
import LogIn from './components/logIn/LogIn';
import Home from './components/home/Home';
// Services
import userService from './services/user';
import postService from './services/post';
import loginService from './services/login';

const App = () => {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState(null);

  const [goTop, setGoTop] = useState(true);

  const postRef = useRef();
  const loginRef = useRef();

  // Window scroll listener
  useEffect(() => {
    window.addEventListener('scroll', () => {
      if(window.scrollY > 400){
        setGoTop(true);
      }else{
        setGoTop(false);
      }
    })
  }, [])

  // Get posts from server every first render
  useEffect(() => {
    postService
      .getAll()
        .then(res => setPosts(res))
        .catch(error => console.log(error))
  }, [])

  // Checks localstorage every first render
  useEffect(() => {
    const storageUser = window.localStorage.getItem('user');
    if(storageUser){
      setUser(JSON.parse(storageUser));
    }
  }, [])

  // Go tob btn handler when scrolling
  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }

  // Log in handler
  const loginHandler = (obj) => {
    loginService
      .logIn(obj)
        .then(res => {
          window.localStorage.removeItem('user');
          window.localStorage.setItem('user', JSON.stringify(res));
          setUser(res);
        })
        .catch(() => loginRef.current.handleError('Invalid username or password'))
  }

  // Sign up handler
  const signupHandler = (obj) => {
    userService
      .signUp(obj)
        .then(() => loginRef.current.handleSuccess('Registered successfully, please log in'))
        .catch(() => loginRef.current.handleError('Username already exsits'));
  }

  // Log out handler
  const logOut = () => {
    setUser(null);
    window.localStorage.removeItem('user');
    postRef.current.closeEdit();
  }

  // Add new post
  const formHandler = (obj) => {
    const token = `bearer ${user.token}`;
    const config = {
      headers: { Authorization: token },
    }

    postService
      .create(obj, config)
        .then(() => {
          postService
            .getAll()
              .then(res => setPosts(res))
              .catch(error => console.log(error))
        })
        .catch(error => console.log(error))
  }

  // Edit post
  const editHandler = (obj, id) => {
    postService
      .update(id, obj)
        .then(res => {
          setPosts(posts.map(i => i.id === id ? res : i))
        })
        .catch(error => console.log(error))
  }

  // Delete post
  const deleteHandler = id => {
    postService
      .deletePost(id)
        .then(() => setPosts(posts.filter(i => i.id !== id)))
        .catch(error => console.log(error))
  }

  return (
    <div className='container'>
      <div 
        className='go-top-btn' 
        style={{ display: goTop ? 'flex' : 'none' }}
        onClick={goToTop}
      >
        <i className="fa-solid fa-arrow-up"></i>
      </div>
      <Router>
        {/* Header */}
        <Header 
          user={user} 
          logOut={logOut} 
        />

        <Routes>
          {/* Log-in route, if user is already logged in redirect to profile */}
          <Route path='/login' element={user ? 
            <Navigate replace to='/profile' /> : 
            <LogIn 
              loginHandler={loginHandler} 
              signupHandler={signupHandler} 
              ref={loginRef}
            />} 
          />
          {/* Profile route, is user is not logged in redirect to log-in */}
          <Route path='/profile' element={user ? 
            <Profile 
              posts={posts}
              user={user} 
              formHandler={formHandler}
              editPostHandler={editHandler}
              deleteHandler={deleteHandler}
              refForProfile={postRef}
            /> : 
            <Navigate replace to="/login" />} 
          />
          {/* Home */}
          <Route 
            path='/' 
            element={
            <Home 
              user={user} 
              posts={posts}
              editPostHandler={editHandler}
              deleteHandler={deleteHandler}
              refForPost={postRef}
            />} 
          />
        </Routes>
        
      </Router>
    </div>
  );
}

export default App;