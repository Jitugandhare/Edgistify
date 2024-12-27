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
  backgroundColor: '#1D1F27', // Dark gray-blue background for a modern look
  padding: '10px 20px', // Adequate padding for spacing
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', // Light shadow for depth
  position: 'sticky', // Keep navbar fixed at the top
  top: 0, // Fix to top of the screen
  zIndex: 1000, // Ensure it's above other content
};

const ulStyle = {
  listStyleType: 'none',
  margin: 0,
  padding: 0,
  display: 'flex',
  justifyContent: 'space-around', // Evenly spaced links
  alignItems: 'center',
  flexWrap: 'wrap', // Wrap links on smaller screens
};

const liStyle = {
  margin: '0 15px', // Space out the items
};

const linkStyle = {
  color: '#FFF', // White color for the text
  textDecoration: 'none',
  fontSize: '18px', // Larger font size for readability
  fontWeight: '500', // Slightly bold font for emphasis
  transition: 'color 0.3s ease', // Smooth color transition on hover
  padding: '8px 12px', // Padding around the links for better clickability
  borderRadius: '5px', // Rounded corners for the links
};

const linkHoverStyle = {
  color: '#E74C3C', // Red color for hover effect
  backgroundColor: '#F1F1F1', // Light background on hover
};

// Media Queries for Responsiveness

const responsiveStyles = {
  '@media (max-width: 768px)': {
    ulStyle: {
      flexDirection: 'column', // Stack items vertically on small screens
      alignItems: 'flex-start', // Align to the left
      padding: '10px', // Add padding for spacing
    },
    liStyle: {
      margin: '10px 0', // Adjust spacing when stacked
    },
    linkStyle: {
      fontSize: '16px', // Slightly smaller font size for mobile
    },
  },
  '@media (max-width: 480px)': {
    navbarStyle: {
      padding: '10px', // Reduced padding for small screens
    },
    linkStyle: {
      fontSize: '14px', // Even smaller font size for very small screens
    },
  },
};

// Apply the hover effect dynamically
const HoverLink = ({ to, children }) => {
  return (
    <Link
      to={to}
      style={{
        ...linkStyle,
        ':hover': linkHoverStyle, // Dynamically apply hover styles
      }}
    >
      {children}
    </Link>
  );
};

export default Navbar;
