import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Home from './pages/Home';
import Services from './pages/Services';
import Bookings from './pages/Bookings';
import Profile from './pages/Profile';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/bookings" element={<Bookings />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;