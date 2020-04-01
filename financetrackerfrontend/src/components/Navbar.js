import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export function Navbar() {

  useEffect(() => {
    //ask the backend if we are logged in
    checkLoginStatus();
  }, [])

  const checkLoginStatus = () => {

    const requestOptions = {
      method: 'GET',
      redirect: 'follow',
      credentials: "same-origin"
    };

    fetch("/auth/checkUser", requestOptions)
      .then(response => {
        if (response.status === 200) {
          setUserLoggedIn(true);
        }
      }).catch(error => console.log('error', error));
  }

  const [isUserLoggedIn, setUserLoggedIn] = useState(false);

  const renderNewLinks = () => {
    return (
      <nav className={"navbar navbar-expand-lg navbar-light bg-light"} style={{
        display: "flex"
      }}>
        <ul className="navbar-nav">
          <li className="nav-item active">
          <div className="mainLogo"/>
            <Link className={"nav-link"} alt="Home" to='/'>A.L.F.R.E.D </Link>
          </li>
          <div className="spacer"/>
          <li className="nav-item active">
            <Link className={"nav-link"} to='/login' style={{
              flex: 1
      }}>Profile</Link>
          </li>
          <li className="nav-item active">
            <Link className={"nav-link"} to='/dashboard' style={{
              flex: 1
      }}>Dashboard</Link>
          </li>
        </ul>
      </nav>
    )
  }

  const renderInitialLinks = () => {
    return (
      <nav className={"navbar navbar-expand-lg navbar-light bg-light"}>
        <ul className="navbar-nav">
          <li className="nav-item active">
            <div className="mainLogo"/>
            <Link className={"nav-link"} alt="Home" to='/'>A.L.F.R.E.D </Link>
          </li>
          <div className="spacer"/>
          <li className="nav-item active">
            <Link className={"nav-link"} to='/login'>Login</Link>
          </li>
          <li className="nav-item active">
            <Link className={"nav-link"} to='/signup'>Signup</Link>
          </li>
        </ul>
      </nav>
    )
  }


  return (
    <React.Fragment>
      {isUserLoggedIn === false && renderInitialLinks()}
      {isUserLoggedIn && renderNewLinks()}
    </React.Fragment>
  )
}