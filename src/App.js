import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
// Css
import './App.css';
// Components
import Header from './components/header/Header';
import Profile from './components/profile/Profile';
import LogIn from './components/logIn/LogIn';
import Home from './components/home/Home';
// Axios
import axios from 'axios';

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storageUser = window.localStorage.getItem('user');
    if(storageUser){
      setUser(JSON.parse(storageUser));
    }
  }, [])

  const loginHandler = (obj) => {
    axios.post('http://localhost:3001/api/login', obj)
      .then(res => {
        window.localStorage.removeItem('user');
        window.localStorage.setItem('user', JSON.stringify(res.data));
        setUser(res.data)
      })
      .catch(error => alert('Username or password incorrect!'))
  }

  const signupHandler = (obj) => {
    axios.post('http://localhost:3001/api/users', obj)
      .then(res => console.log(res))
      .catch(error => alert('Username already exsits!'))
  }

  const logOut = () => {
    setUser(null);
    window.localStorage.removeItem('user');
  }

  return (
    <div className='container'>
      <Router>
        <Header user={user} logOut={logOut} />

        <Routes>
          <Route path='/login' element={user ? <Navigate replace to='/profile' /> : <LogIn loginHandler={loginHandler} signupHandler={signupHandler} />} />
          <Route path='/profile' element={user ? <Profile /> : <Navigate replace to="/login" />} />
          <Route path='/' element={<Home />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;