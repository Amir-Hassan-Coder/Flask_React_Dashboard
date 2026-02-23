// src/pages/Auth/Login.jsx mein change:
import axios from 'axios';

const handleLogin = async (e) => {
    e.preventDefault();
    try {
        const res = await axios.post('http://127.0.0.1:5000/api/auth/login', { email, password });
        console.log(res.data);
        navigate(res.data.role === 'Admin' ? '/admin/dashboard' : '/competitor/browse');
    } catch (err) {
        alert("Login Failed!");
    }
};