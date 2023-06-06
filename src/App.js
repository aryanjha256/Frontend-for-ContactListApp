import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Contacts from './components/Contacts';
import Home from './components/Home';
import Logout from './components/Logout';

function App() {
  return (
    <Router>
      <div className="app">
        <nav>
          <span><Logout /></span>
        </nav>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/contacts" element={<Contacts />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
