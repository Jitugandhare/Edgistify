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
  backgroundColor: '#1D1F27',
  padding: '10px 20px', 
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', 
  position: 'sticky', 
  top: 0, 
  zIndex: 1000, 
};

const ulStyle = {
  listStyleType: 'none',
  margin: 0,
  padding: 0,
  display: 'flex',
  justifyContent: 'space-around', 
  alignItems: 'center',
  flexWrap: 'wrap',
};

const liStyle = {
  margin: '0 15px', 
};

const linkStyle = {
  color: '#FFF', 
  textDecoration: 'none',
  fontSize: '18px', 
  fontWeight: '500', 
  transition: 'color 0.3s ease', 
  padding: '8px 12px', 
  borderRadius: '5px', 
};

const linkHoverStyle = {
  color: '#E74C3C', 
  backgroundColor: '#F1F1F1', 
};

const HoverLink = ({ to, children }) => {
  return (
    <Link
      to={to}
      style={{
        ...linkStyle,
        ':hover': linkHoverStyle, 
      }}
    >
      {children}
    </Link>
  );
};

export default Navbar;
