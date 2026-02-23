import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './styles/Global.css';
import Navbar from './components/Shared/Navbar';

// Admin Pages
import CreateComp from './pages/Admin/CreateComp';
import Dashboard from './pages/Admin/Dashboard';
import ViewResults from './pages/Admin/ViewResults';

// Competitor Pages
import BrowseComp from './pages/Competitor/BrowseComp';
import SubmitWork from './pages/Competitor/SubmitWork';
import MyResults from './pages/Competitor/MyResults';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';


function App() {
  return (
    <Router>
      <Navbar />
      <div className="container">
        <Routes>
          {/* Main Home Route - Ab ye Login Page dikhaye ga */}
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register/>} />
         
          {/* Login Route - Alag se bhi login ka path rakhte hain */}
          <Route path="/login" element={<Login />} />
          
          
          {/* Admin Routes */}
          <Route path="/admin/create" element={<CreateComp />} />
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/view-results" element={<ViewResults />} />
          
          {/* Competitor Routes */}
          <Route path="/competitor/browse" element={<BrowseComp />} />
          <Route path="/competitor/submit" element={<SubmitWork />} />
          <Route path="/competitor/results" element={<MyResults />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;