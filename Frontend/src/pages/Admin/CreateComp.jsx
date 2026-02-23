import React, { useState } from 'react';
import axios from 'axios'; // Axios import kiya
import './Admin.css';

const CreateComp = () => {
  const [formData, setFormData] = useState({ title: '', description: '', criteria: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Backend API ko call kar rahe hain
      const response = await axios.post('http://127.0.0.1:5000/api/admin/create-competition', formData);
      
      alert(response.data.message); // "Competition created successfully!"
      setFormData({ title: '', description: '', criteria: '' }); // Form clear kiya
    } catch (error) {
      console.error("Error creating competition:", error);
      alert("Masla aa gaya! Check karen server chal raha hai?");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h1>Create New Competition</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Title</label>
            <input 
              type="text" 
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})} 
              required 
            />
          </div>
          <div className="form-group">
            <label>Guidelines</label>
            <textarea 
              rows="5" 
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})} 
              required 
            />
          </div>
          <div className="form-group">
            <label>Criteria</label>
            <input 
              type="text" 
              value={formData.criteria}
              onChange={(e) => setFormData({...formData, criteria: e.target.value})} 
            />
          </div>
          <button type="submit" className="btn-submit" disabled={loading}>
            {loading ? "Launching..." : "Launch Competition"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateComp;