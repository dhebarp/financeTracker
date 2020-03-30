import React from 'react';
import { Link } from 'react-router-dom';

export function Navbar() {

  return (
    <React.Fragment>
      <nav className={"navbar navbar-expand-lg navbar-light bg-light"}>
        <ul className="navbar-nav">
          <li className="nav-item active">
            <Link className={"nav-link"} alt="Home" to='/'>A.L.F.R.E.D </Link>
          </li>
          <li className="nav-item active">
            <Link className={"nav-link"} to='/login'>Login</Link>
          </li>
          <li className="nav-item active">
            <Link className={"nav-link"} to='/signup'>Signup</Link>
          </li>
        </ul>
      </nav>
    </React.Fragment>
  )
}