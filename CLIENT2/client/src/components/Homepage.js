import React from 'react';
import { Link } from 'react-router-dom';

function Homepage() {
  return (
    <div className="homepage">
      <h1>Welcome to Service Booking App</h1>
      <p>Find and book services easily!</p>
      <div className="cta-buttons">
        <Link to="/services" className="btn btn-primary">Browse Services</Link>
        <Link to="/register" className="btn btn-secondary">Sign Up</Link>
      </div>
    </div>
  );
}

export default Homepage;