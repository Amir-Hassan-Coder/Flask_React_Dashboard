import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Admin.css';

const Dashboard = () => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const res = await axios.get('http://127.0.0.1:5000/api/admin/submissions');
        setSubmissions(res.data);
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchSubmissions();
  }, []);

  return (
    <div className="container">
      <div className="card">
        <h1>Admin Dashboard</h1>
        
        <Link to="/admin/create">
          <button className="btn-launch" style={{ color:"white", backgroundColor: "black", width: 'auto', padding: '10px 20px', marginBottom: '20px'}}>
            + Create New Competition
          </button>
        </Link>

        {loading ? (
          <p>Loading data from database...</p>
        ) : (
          <table className="submissions-table">
            <thead>
              <tr>
                <th>Competitor</th>
                <th>Topic</th>
                <th>Status</th>
                <th>Score</th>
                <th style={{textAlign: 'center'}}>Actions</th> {/* Column width adjust ki */}
              </tr>
            </thead>
            <tbody>
              {submissions.length === 0 ? (
                <tr><td colSpan="5" style={{textAlign: 'center'}}>No submissions found in database.</td></tr>
              ) : (
                submissions.map((sub) => (
                  <tr key={sub.id}>
                    <td>{sub.competitor_name}</td>
                    <td>{sub.topic}</td>
                    <td>{sub.status}</td>
                    <td>{sub.score ? `${sub.score}/100` : "---"}</td>
                    <td style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
                    
                      {/* Button 1: Admin View (Pura data dekhne ke liye) */}
                      <Link to={`/admin/view-results?id=${sub.id}`}>
                        <button className="btn-eval" style={{background: '#64748b'}}>View Details</button>
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Dashboard;