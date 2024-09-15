import React from 'react';
import { Link } from 'react-router-dom';

const Layout = ({ children }) => {
  return (
    <div>
      <header>
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/services">Services</Link></li>
            <li><Link to="/bookings">Bookings</Link></li>
            <li><Link to="/profile">Profile</Link></li>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
          </ul>
        </nav>
      </header>
      <main>{children}</main>
      <footer>
        <p>&copy; 2024 Service Marketplace. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Layout;