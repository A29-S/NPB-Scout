import React, { useState } from 'react';
import '../css/profile.css';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { getTeamLogo, getCardClass } from '../api/TeamLogo';
import api from '../api/axiosConfig'; // Adjust the path as needed


function PlayerProfile() {
  const location = useLocation();
  const { from } = location.state;
  const [reviewBody, setReviewBody] = useState(''); // State variable for review input
  const [reviewName, setReviewName] = useState(''); 
  const [previousReviews, setPreviousReviews] = useState(from.review || []);

  const postReview = async () => {
    try {
      const response = await api.post("/api/v1/reviews", {
        name: from.name,
      });
      console.log(response.data);
      setPreviousReviews([...previousReviews, { body: reviewBody }]);
      setReviewBody('');
    } catch (err) {
      console.log(err);
    }
  }

  const loadPreviousReviews = () => {
    if (from) {
      // Access reviews from the selected player object
      const reviews = from.review || [];
      setPreviousReviews(reviews);
    }
  }


  return (
    <div className={`${getCardClass(from.team)}`}>
        <h1 className="back-buttons">
        <Link to="/player-overview" className="back-button "> Player Search</Link>
        <Link to="/team-overview" className="back-button ">Team Search</Link>
      </h1>   
    
      <h2 className='name-color'>{from.name}  <img
                src={getTeamLogo(from.team)} // Get the image based on the team name
                alt={`${from.team} Logo`}
                className="responsive"
              /></h2>
      <div className='table-container'>
      <table>
        <thead>
          <tr>
            <th>Age</th>
            <th>Games</th>
            <th>PA</th>
            <th>AB</th>
            <th>R</th>
            <th>H</th>
            <th>2B</th>
            <th>3B</th>
            <th>HR</th>
            <th>RBI</th>
            <th>SB</th>
            <th>CS</th>
            <th>BB</th>
            <th>SO</th>
            <th>BA</th>
            <th>OBP</th>
            <th>SLG</th>
            <th>OPS</th>
            <th>TB</th>
            <th>GDP</th>
            <th>HBP</th>
            <th>SH</th>
            <th>SF</th>
            <th>IBB</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{from.age}</td>
            <td>{from.g}</td>
            <td>{from.pa}</td>
            <td>{from.ab}</td>
            <td>{from.r}</td>
            <td>{from.h}</td>
            <td>{from.doubles}</td>
            <td>{from.triples}</td>
            <td>{from.hr}</td>
            <td>{from.rbi}</td>
            <td>{from.sb}</td>
            <td>{from.cs}</td>
            <td>{from.bb}</td>
            <td>{from.so}</td>
            <td>{from.ba}</td>
            <td>{from.obp}</td>
            <td>{from.slg}</td>
            <td>{from.ops}</td>
            <td>{from.tb}</td>
            <td>{from.gdp}</td>
            <td>{from.hbp}</td>
            <td>{from.sh}</td>
            <td>{from.sf}</td>
            <td>{from.ibb}</td>
          </tr>
        </tbody>
      </table>
      
      <textarea  className='review-field'
            type='text'
            label="Review Body"
            value={reviewBody}
            onChange={(e) => setReviewBody(e.target.value)}
            fullWidth
            multiline
            rows={4}
          />
        
          <button className='post' onClick={postReview} >
            Post Review
          </button>
          {previousReviews.length > 0 && (
          <div>
            <h2 className='name-color'>Reviews:</h2>
            <ul className="scrollable-list2">
              {previousReviews.map((review, index) => (
                <li className='li-review' key={index}> {review.body}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
 
    </div>
  );
}

  

export default PlayerProfile;
