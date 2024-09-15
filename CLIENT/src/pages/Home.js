import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home">
      <h1>Welcome to Service Marketplace</h1>
      <p>Find the services you need or offer your skills to others.</p>
      <div className="cta-buttons">
        <Link to="/services" className="btn btn-primary">Browse Services</Link>
        <Link to="/register" className="btn btn-secondary">Become a Provider</Link>
      </div>
    </div>
  );
};

export default Home;