import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Navigation from './components/Navigation';
import Home from './components/Homepage.js';
import Login from './components/Auth/Login';
import Logout from './components/Auth/Logout';
import Register from './components/Auth/Register.js';
import ServiceList from './components/Services/ServiceList';
import ServiceDetail from './components/Services/ServiceDetail';
import BookingCreate from './components/Bookings/BookingCreate';
import BookingList from './components/Bookings/BookingList';
import Profile from './components/Profile';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Navigation />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/services" element={<ServiceList />} />
            <Route path="/services/:id" element={<ServiceDetail />} />
            <Route path="/book/:serviceId" element={<BookingCreate />} />
            <Route path="/bookings" element={<BookingList />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/logout" element={<Logout />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;