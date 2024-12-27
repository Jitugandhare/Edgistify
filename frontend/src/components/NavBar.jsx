import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav style={navbarStyle}>
      <ul style={ulStyle}>
      
        <li style={liStyle}>
          <Link to="/register" style={linkStyle}>Register</Link>
        </li>
        <li style={liStyle}>
          <Link to="/login" style={linkStyle}>Login</Link>
        </li>
        <li style={liStyle}>
          <Link to="/cart" style={linkStyle}>Cart</Link>
        </li>
        <li style={liStyle}>
          <Link to="/orders" style={linkStyle}>Orders</Link>
        </li>
      </ul>
    </nav>
  );
};


const navbarStyle = {
  backgroundColor: '#333',
  padding: '10px',
};

const ulStyle = {
  listStyleType: 'none',
  margin: 0,
  padding: 0,
  display: 'flex',
  justifyContent: 'space-around',
};

const liStyle = {
  margin: '0 10px',
};

const linkStyle = {
  color: 'white',
  textDecoration: 'none',
  fontSize: '16px',
};

export default Navbar;
