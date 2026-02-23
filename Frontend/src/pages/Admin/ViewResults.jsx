import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Admin.css';

const ViewResults = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const query = new URLSearchParams(useLocation().search);
  const subId = query.get('id');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const res = await axios.get(`http://127.0.0.1:5000/api/admin/submission/${subId}`);
        setData(res.data);
      } catch (err) {
        console.error("Error fetching details:", err);
        alert("Could not load submission details.");
      } finally {
        setLoading(false);
      }
    };
    if (subId) fetchDetails();
  }, [subId]);

  if (loading) return <div className="container"><h3>Loading AI Analysis...</h3></div>;
  if (!data) return <div className="container"><h3>No Data Found.</h3></div>;

  return (
    <div className="container">
      <button onClick={() => navigate(-1)} className="btn-eval" style={{marginBottom: '20px', background: '#334155'}}>
        ← Back to Dashboard
      </button>
      
      <div className="card">
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <h1>Evaluation Report</h1>
          <div className="score-circle" style={{
            background: data.score > 70 ? '#22c55e' : '#eab308',
            color: 'white', padding: '15px', borderRadius: '50%', fontWeight: 'bold'
          }}>
            {data.score}/100
          </div>
        </div>

        <div className="result-info" style={{marginTop: '20px'}}>
          <p><strong>Competitor:</strong> {data.competitor_name}</p>
          <p><strong>Topic:</strong> {data.topic}</p>
        </div>

        <hr style={{margin: '20px 0', opacity: '0.2'}} />

        <h3>Submitted Article:</h3>
        <div className="article-preview" style={{
          background: '#f8fafc', padding: '20px', borderRadius: '8px', 
          border: '1px solid #e2e8f0', lineHeight: '1.6', whiteSpace: 'pre-wrap'
        }}>
          {data.content}
        </div>

        <div className="ai-feedback-box" style={{
          marginTop: '30px', padding: '20px', background: '#eff6ff', 
          borderLeft: '5px solid #3b82f6', borderRadius: '4px'
        }}>
          <h3 style={{color: '#1e40af'}}>🧠 AI Feedback:</h3>
          <p style={{fontStyle: 'italic'}}>{data.feedback}</p>
        </div>
      </div>
    </div>
  );
};

export default ViewResults;