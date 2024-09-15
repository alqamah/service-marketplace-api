import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './components/Home';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register.js';
import ServiceList from './components/Services/ServiceList';
import ServiceDetail from './components/Services/ServiceDetail';
import BookingCreate from './components/Bookings/BookingCreate';
import BookingList from './components/Bookings/BookingList';
import Profile from './components/Profile';

function App() {
  return (
    <Router>
      <div className="App">
        <Navigation />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route exact path="/services" component={ServiceList} />
          <Route path="/services/:id" component={ServiceDetail} />
          <Route path="/book/:serviceId" component={BookingCreate} />
          <Route path="/bookings" component={BookingList} />
          <Route path="/profile" component={Profile} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;