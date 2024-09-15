import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Home from './pages/Home';
import Services from './pages/Services';
import Bookings from './pages/Bookings';
import Profile from './pages/Profile';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import './App.css';

const routes = [
  { path: '/', name: 'Home', Component: Home },
  { path: '/services', name: 'Services', Component: Services },
  { path: '/bookings', name: 'Bookings', Component: Bookings },
  { path: '/profile', name: 'Profile', Component: Profile },
  { path: '/login', name: 'Login', Component: Login },
  { path: '/register', name: 'Register', Component: Register },
];

function App() {
  return (
    <Router>
      <div className="app">
        <nav className="navbar">
          <div className="container navbar-container">
            <Link to="/" className="navbar-logo">Your App Name</Link>
            <ul className="navbar-links">
              {routes.slice(1).map(({ path, name }) => (
                <li key={path}><Link to={path}>{name}</Link></li>
              ))}
            </ul>
          </div>
        </nav>

        <main className="main-content">
          <div className="container">
            <Routes>
              {routes.map(({ path, Component }) => (
                <Route key={path} path={path} element={<Component />} />
              ))}
            </Routes>
          </div>
        </main>
      </div>
    </Router>
  );
}

export default App;