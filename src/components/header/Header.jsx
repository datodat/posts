import { useState } from 'react';
import { Link } from 'react-router-dom';
// Css
import './header.css';

const Header = ({ user, logOut }) => {
  const [showNav, setShowNav] = useState(false);

  // If window width is more than 400px showNav set to false
  window.addEventListener('resize', () => {
    if(window.innerWidth > 400){
      setShowNav(false);
    }
  })

  const logOutHandler = () => {
    logOut();
    setShowNav(false);
  }

  return (
    <header className='header'>
      {/* Username or info text */}
      <div>
        {user ? user.username : 'You are not logged in'}
      </div>
      {/* Open - Close icons for responsive navbar */}
      <i
        onClick={() => setShowNav(!showNav)} 
        style={{ display: showNav ? 'none' : '' }} 
        id='icon-open'
        className="fa-solid fa-bars"
      ></i>
      <i
        onClick={() => setShowNav(!showNav)} 
        style={{ display: showNav ? '' : 'none' }} 
        id='icon-close'
        className="fa-solid fa-xmark"
      ></i>
      {/* Navbar */}
      <nav 
        className={showNav ? 'nav-responsive' : ''}
      >
        <ul>
          <li>
            <Link onClick={() => setShowNav(false)} to='/'>Home</Link>
          </li>
          <li>
            {/* My profile link if user is logged in, else Log in link */}
            {user ? 
              <Link onClick={() => setShowNav(false)} to='/profile'>My Profile</Link> : 
              <Link onClick={() => setShowNav(false)} className='log-in' to='login'>Log in</Link>}
          </li>
            {/* Log out button if user is logged in */}
          <li>
            {user && <Link className='log-out' to='/' onClick={logOutHandler}>Log out</Link>}
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;