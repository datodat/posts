import { Link } from 'react-router-dom';
import './header.css';

const Header = ({ user, logOut }) => {
  return (
    <header className='header'>
      <p>{user ? user.username : 'You are not logged in'}</p>
      <div>
        <Link to='/'>Home</Link>
        {user ? <Link to='/profile'>My Profile</Link> : <Link to='login'>Log in</Link>}
        {user && <Link to='/' onClick={logOut}>Log out</Link>}
      </div>
    </header>
  );
}

export default Header;