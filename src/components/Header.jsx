/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Link } from 'react-router-dom';
import '../style/header.css';
import logo from '../images/nav-logo.png';
import Search from './Search';

// eslint-disable-next-line react/prop-types
const Header = ({ history }) => (
  <nav className="flex-container">
    <div className="nav-container">
      <Link to="/"><img src={logo} alt="logo" /></Link>
      <Search history={history} />
      <ul className="flex-container nav">
        <li><Link to="/">Home</Link></li>
        <li><a href="#">Movies</a></li>
        <li><a href="#">TV Shows</a></li>
        <li><a href="#">Watch List</a></li>
      </ul>
    </div>
  </nav>
);

export default Header;
