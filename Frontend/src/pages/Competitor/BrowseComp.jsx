import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Competitor.css';

const BrowseComp = () => {
  const [competitions, setCompetitions] = useState([]);
  const [loading, setLoading] = useState(true);

  // Page load hote hi data mangwao
  useEffect(() => {
    const fetchCompetitions = async () => {
      try {
        const res = await axios.get('http://127.0.0.1:5000/api/competitor/competitions');
        setCompetitions(res.data);
      } catch (err) {
        console.error("Data mangwanay mein masla:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCompetitions();
  }, []);

  if (loading) return <div className="container"><h3>Loading competitions...</h3></div>;

  return (
    <div className="container">
      <div className="card">
        <h1>Active Competitions</h1>
        <p>Select a topic and submit your best article for AI evaluation.</p>
        
        <div className="competitions-grid" style={{marginTop: '30px'}}>
          {competitions.length === 0 ? (
            <p>Abhi koi competition active nahi hai.</p>
          ) : (
            competitions.map((comp) => (
              <div key={comp.id} className="topic-box" style={{marginBottom: '20px', borderLeft: '5px solid var(--primary)'}}>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                  <div>
                    <h3>{comp.title}</h3>
                    <p>{comp.description.substring(0, 100)}...</p>
                    <small><strong>Criteria:</strong> {comp.criteria}</small>
                  </div>
                  {/* Join button ab Submit page par le jaye ga aur ID pass kare ga */}
                  <Link to={`/competitor/submit?id=${comp.id}&title=${comp.title}`}>
                    <button className="btn-submit-work" style={{float: 'none'}}>Write Article</button>
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default BrowseComp;