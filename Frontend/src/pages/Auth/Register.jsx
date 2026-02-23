import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Register.css';

const Register = () => {
  const [formData, setFormData] = useState({ username: '', email: '', password: '', role: 'Competitor' });
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://127.0.0.1:5000/api/auth/register', formData);
      alert("Account Created! Please Login.");
      navigate('/login');
    } catch (err) {
      alert("Registration Failed: " + err.response.data.message);
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleRegister} className="auth-card">
        <h1>Register</h1>
        <input type="text" placeholder="Username" onChange={(e) => setFormData({...formData, username: e.target.value})} required />
        <input type="email" placeholder="Email" onChange={(e) => setFormData({...formData, email: e.target.value})} required />
        <input type="password" placeholder="Password" onChange={(e) => setFormData({...formData, password: e.target.value})} required />
        <button type="submit">Create Account</button>
      </form>
    </div>
  );
};
export default Register;