import React from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import {useSelector} from 'react-redux';

function Nav() {
  const user = useSelector((store) => store.user);

  let loginLinkData = {
    path: '/login',
    text: 'Login / Register',
  };

  if (user.id != null) {
    loginLinkData.path = '/home';
    loginLinkData.text = 'Home';
  }

  return (
    <div className="nav">
      <Link to="/calendar">
        <h2 className="nav-title">TaskProof</h2>
      </Link>
      <div>
        {user.id && (
          <>
            <LogOutButton className="navLink" />
          </>
        )}
      </div>
    </div>
  );
}

export default Nav;
