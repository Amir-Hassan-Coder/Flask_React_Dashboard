import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import axios from 'axios';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('Competitor'); // Default role
    const navigate = useNavigate();

    const handleLogin = async (e) => {
  e.preventDefault();
  try {
    const res = await axios.post('http://127.0.0.1:5000/api/auth/login', { email, password });
    
    // Yahan hum User ki ID aur Name browser mein save kar rahe hain
    localStorage.setItem('user_id', res.data.user_id);
    localStorage.setItem('username', res.data.username);
    localStorage.setItem('role', res.data.role);

    alert("Welcome " + res.data.username);
    navigate(res.data.role === 'Admin' ? '/admin/dashboard' : '/competitor/browse');
  } catch (err) {
    alert("Invalid Credentials");
  }
};

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h1>Welcome Back</h1>
                <p>Please login to your account</p>

                <div className="role-selector">
                    <button 
                        className={`role-btn ${role === 'Admin' ? 'active' : ''}`}
                        onClick={() => setRole('Admin')}
                    >
                        Admin
                    </button>
                    <button 
                        className={`role-btn ${role === 'Competitor' ? 'active' : ''}`}
                        onClick={() => setRole('Competitor')}
                    >
                        Competitor
                    </button>
                </div>

                <form onSubmit={handleLogin}>
                    <div className="form-group">
                        <label>Email Address</label>
                        <input 
                            type="email" 
                            placeholder="user@example.com" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required 
                        />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input 
                            type="password" 
                            placeholder="••••••••" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required 
                        />
                    </div>
                    <button type="submit" className="login-submit-btn">
                        Login as {role}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;