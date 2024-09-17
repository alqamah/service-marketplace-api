import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext.js';
import Navigation from './components/Navigation.js';
import Home from './components/Homepage.js';
import Login from './components/Auth/Login.js';
import Logout from './components/Auth/Logout.js';
import Register from './components/Auth/Register.js';
import ServiceList from './components/Services/ServiceList.js';
import ServiceDetail from './components/Services/ServiceDetail.js';
import BookingCreate from './components/Bookings/BookingCreate.js';
import BookingList from './components/Bookings/BookingList.js';
import Profile from './components/Profile.js';
import EditBooking from './components/Bookings/EditBooking';

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
            <Route path="/bookings/:id/edit" element={<EditBooking />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/logout" element={<Logout />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;