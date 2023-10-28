import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';


function NavBar() {
  const { setIsLoggedIn , isLoggedIn } = useAuth();

  const history = useNavigate();

  useEffect(() => {
    statusCheck(); // Check the login status when the component mounts
  }, []);

  const statusCheck = () => {
    fetch('api/v1/user/verify')
      .then((response) => response.json())
      .then((data) => {
        setIsLoggedIn(data.success);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const logout = () => {
    fetch('/api/v1/user/signout')
      .then((response) => response.json())
      .then(() => {
        alert('Logout');
        setIsLoggedIn(false);
        history('/');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="navbar">
      <div className="blog-name">Blog Website</div>
      <div className="menu">
        <ul>
          <Link to="/">HOME</Link>
          {isLoggedIn ? (
            <>
              <Link to="/myblogs">MY BLOGS</Link>
              <li onClick={logout}>LOGOUT</li>
            </>
          ) : (
            <>
              <Link to="/signin">SIGNIN</Link>
              <Link to="/signup">SIGNUP</Link>
            </>
          )}
        </ul>
      </div>
    </div>
  );
}

export default NavBar;
