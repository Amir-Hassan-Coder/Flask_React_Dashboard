import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Competitor.css';

const MyResults = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyResults = async () => {
      const userId = localStorage.getItem('user_id'); // Login user ki ID
      if (!userId) {
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get(`http://127.0.0.1:5000/api/competitor/my-results/${userId}`);
        setResults(res.data);
      } catch (err) {
        console.error("Error fetching results:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMyResults();
  }, []);

  if (loading) return <div className="container"><h3>Loading your scores...</h3></div>;

  return (
    <div className="container">
      <div className="card">
        <h1>My AI Evaluation Results</h1>
        
        {results.length === 0 ? (
          <p style={{marginTop: '20px'}}>Aap ne abhi tak koi article submit nahi kiya.</p>
        ) : (
          results.map((res, index) => (
            <div key={index} className="result-item" style={{marginBottom: '40px', borderBottom: '1px solid #eee', paddingBottom: '20px'}}>
              <h3>Topic: {res.topic}</h3>
              <div className="topic-box" style={{textAlign: 'center', marginTop: '20px', background: '#f0fdf4'}}>
                  <h2 style={{fontSize: '2.5rem', color: 'var(--success)'}}>{res.score}/100</h2>
                  <p><strong>Status:</strong> {res.status}</p>
              </div>
              
              <div className="form-group" style={{marginTop: '20px'}}>
                  <h4 style={{color: '#1e40af'}}>AI Feedback:</h4>
                  <p className="card" style={{background: '#f8fafc', fontStyle: 'italic', fontSize: '0.9rem'}}>
                    "{res.feedback}"
                  </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyResults;