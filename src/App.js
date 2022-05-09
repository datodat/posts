import React, { useState, useEffect } from 'react';
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

  // Log in handler
  const loginHandler = (obj) => {
    loginService
      .logIn(obj)
        .then(res => {
          window.localStorage.removeItem('user');
          window.localStorage.setItem('user', JSON.stringify(res));
          setUser(res)
        })
        .catch(() => alert('Username or password incorrect!'))
  }

  // Sign up handler
  const signupHandler = (obj) => {
    userService
      .signUp(obj)
        .then(res => console.log(res))
        .catch(() => alert('Username already exsits!'))
  }

  // Log out handler
  const logOut = () => {
    setUser(null);
    window.localStorage.removeItem('user');
  }

  // Add new post
  const formHandler = (obj) => {
    const token = `bearer ${user.token}`;
    const config = {
      headers: { Authorization: token },
    }

    postService
      .create(obj, config)
        .then(res => setPosts(posts.concat(res)))
        .catch(error => console.log(error))
  }

  return (
    <div className='container'>
      <Router>
        {/* Header */}
        <Header user={user} logOut={logOut} />

        <Routes>
          {/* Log-in route, if user is already logged in redirect to profile */}
          <Route path='/login' element={user ? 
            <Navigate replace to='/profile' /> : 
            <LogIn 
              loginHandler={loginHandler} 
              signupHandler={signupHandler} 
            />} 
          />
          {/* Profile route, is user is not logged in redirect to log-in */}
          <Route path='/profile' element={user ? 
            <Profile /> : 
            <Navigate replace to="/login" />} 
          />
          {/* Home */}
          <Route 
            path='/' 
            element={
            <Home 
              user={user} 
              posts={posts}
              formHandler={formHandler} 
            />} 
          />
        </Routes>
        
      </Router>
    </div>
  );
}

export default App;