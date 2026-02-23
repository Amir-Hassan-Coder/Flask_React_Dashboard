import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Competitor.css';

const SubmitWork = () => {
  const [content, setContent] = useState('');
  const [submitting, setSubmitting] = useState(false);
  
  // URL se ID aur Title nikaalna
  const query = new URLSearchParams(useLocation().search);
  const compId = query.get('id');
  const compTitle = query.get('title');
  const navigate = useNavigate();

  const handleArticleSubmit = async (e) => {
  e.preventDefault();
  
  // Browser ki memory se ID uthayi
  const loggedInUserId = localStorage.getItem('user_id');

  if (!loggedInUserId) {
    alert("Please login first!");
    return;
  }

  try {
    const payload = {
      content: content,
      comp_id: compId,
      user_id: parseInt(loggedInUserId) // Ab ye wahi ID hai jisne login kiya
    };

    const res = await axios.post('http://127.0.0.1:5000/api/competitor/submit-article', payload);
    alert(`Success! Your Score: ${res.data.score}`);
    navigate('/competitor/results');
  } catch (err) {
    alert("Submission failed!");
  }
};

  return (
    <div className="container">
      <div className="card">
        <h1>Submit for: {compTitle || "Competition"}</h1>
        <p>Write your article below (Minimum 50 words recommended).</p>

        <form onSubmit={handleArticleSubmit}>
          <div className="form-group">
            <textarea 
              className="article-textarea"
              placeholder="Type your article here..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              style={{minHeight: '300px', marginTop: '20px'}}
            />
          </div>
          <button 
            type="submit" 
            className="btn-submit-work" 
            disabled={submitting}
          >
            {submitting ? "AI is Evaluating..." : "Submit Article"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SubmitWork;