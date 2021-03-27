import React from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import {useSelector} from 'react-redux';

function Nav() {
  const user = useSelector((store) => store.user);

  let loginLinkData = {
    path: '',
    text: '',
  };

  if (user.id != null) {
    loginLinkData.path = '/profile';
    loginLinkData.text = 'Profile';
  }

  return (
    <div className="nav">
      <Link to="/landing">
        <h1 className="nav-title">TaskProof</h1>
      </Link>
      <h2 className="users-name">{user.firstname} {user.lastname}</h2>
        <div>
          <Link className="navLink" to={loginLinkData.path}>
            {loginLinkData.text}
          </Link>
      
          {user.id && (
            <LogOutButton className="navLink" />
          )}
        </div>
      </div>
  );
}

export default Nav;
