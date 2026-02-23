import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">AI-Eval Dashboard</Link>
      </div>
      <div className="navbar-links">
        <Link to="/admin/dashboard">Admin Panel</Link>
        <Link to="/admin/create">Create Competition</Link>
        <Link to="/competitor/browse">Competitor Portal</Link>
        <Link to="/competitor/results">My Results</Link>
        <Link to="/login" className="login-btn">Login</Link>
        <Link to="/register" className="login-btn">Register Fist</Link>
      </div>
    </nav>
  );
};

export default Navbar;