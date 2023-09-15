import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  LinearProgress,
  Card,
  CardContent,
  Typography,
  Button,
  CardActions,
  Paper,
  TextField,
  List,
  ListItem,
  ListItemText,
} from '@mui/material'; // Import Material-UI components
import api from './api/axiosConfig';
import './App.css'; // Import your CSS file

//Logos 
import BayStarsLogo from './images/bayStars.png'; 
import BuffaloesLogo from './images/new_buffaloes.png'; 
import CarpLogo from './images/carp.png';
import DragonsLogo from './images/dragons.png';
import GiantsLogo from './images/giants.png';
import GoldenEaglesLogo from './images/goldenEagles.png';
import HamFightersLogo from './images/hamFighters.png';
import MarinesLogo from './images/marines.png';
import SeibuLionsLogo from './images/seibuLions.png';
import SoftbankHawksLogo from './images/softbankHawks.png';
import SwallowsLogo from './images/swallows.png';
import TigersLogo from './images/tigers.png';


function App() {
  const [players, setPlayers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [teamSearchQuery, setTeamSearchQuery] = useState('');
  const [teamSearchResults, setTeamSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState(null); // New state variable to store selected player
  const [reviewBody, setReviewBody] = useState(''); // State variable for review input
  const [reviewName, setReviewName] = useState(''); 


  const teamOptions = [
    'Tigers', 'Giants', 'Carp', 'Bay Stars', 'Dragons',
    'Swallows', 'Buffaloes', 'Softbank Hawks', 'Ham Fighters',
    'Lotte Marines', 'Seibu Lions', 'Golden Eagles'
  ];

  const getPlayers = async () => {
    setLoading(true);
    try {
      const response = await api.get("/api/v1/players");
      console.log(response.data);
      setPlayers(response.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  }

  useEffect(() => {
    getPlayers();
  }, []);

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
    setSelectedPlayer(null); // Reset selected player when typing in the search bar
  }

  const handleTeamSelectChange = (team) => {
    setTeamSearchQuery(team);
    setSelectedPlayer(null); // Reset selected player when changing the team filter
  }

  const searchPlayersByName = () => {
    const filteredPlayers = players.filter(item =>
      item.name && item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return filteredPlayers;
  }

  const searchPlayersByTeam = async () => {
    setLoading(true);
    try {
      const response = await api.get(`/api/v1/players/team/${teamSearchQuery}`);
      console.log(response.data);
      setTeamSearchResults(response.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setTeamSearchResults([]);
      setLoading(false);
    }
  }

  const resetSearch = () => {
    setSearchQuery('');
    setTeamSearchQuery('');
    setTeamSearchResults([]);
    setSelectedPlayer(null);
  }

  const postReview = async () => {
    try {
      const response = await api.post("/api/v1/reviews", {
        reviewBody,
        name: selectedPlayer.name,
      });
      console.log(response.data);
      // Clear the review input fields after posting
      setReviewBody('');
      setReviewName('');
    } catch (err) {
      console.log(err);
    }
  }

  const loadPreviousReviews = () => {
    if (selectedPlayer) {
      // Access reviews from the selected player object
      const reviews = selectedPlayer.review || [];
      setPreviousReviews(reviews);
    }
  }

  

  return (
    <div className="App">
      <h1>NPB-Scout</h1>

      <input
        type="text"
        placeholder="Search by name..."
        value={searchQuery}
        onChange={handleSearchInputChange}
      />

      <button className='button-search' onClick={() => setTeamSearchResults(searchPlayersByName())}>
        Search by Name
      </button>

      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {teamOptions.map((team, index) => (
          <Card key={index} style={{ width: '200px', margin: '10px' }} className={`Card ${getCardClass(team)}`}>
            <CardContent>
            <img
                src={getTeamLogo(team)} // Get the image based on the team name
                alt={`${team} Logo`}
                className="responsive"
              />
              <Typography className="card-text" variant="h6">{team}</Typography>
            </CardContent>
            <CardActions>
              <button
                size="small"
                className="button-card" 
                onClick={() => {
                  handleTeamSelectChange(team);
                  searchPlayersByTeam();
                  setSearchQuery(team);
                } } 
              >
                View Team
              </button>
            </CardActions>
          </Card>
        ))}
      </div>

      <Button variant="outlined" onClick={resetSearch}>
        Reset Search
      </Button>

      {loading && <LinearProgress />} {/* Show LinearProgress while loading */}
      
      {selectedPlayer && (
        <div>
          <h2>Selected Player:</h2>
          <Paper>
            <p>Name: {selectedPlayer.name}</p>
            <p>Team: {selectedPlayer.team}</p>
            Age: {selectedPlayer.age} G: {selectedPlayer.g} AVG: {selectedPlayer.avg} HR: {selectedPlayer.hr} RBI: {selectedPlayer.rbi} OPS: {selectedPlayer.ops} 
            <Button>All Stats</Button>
          </Paper>
          {/* Review form */}
          <h2>Write a Review:</h2>
          <TextField
            label="Review Body"
            value={reviewBody}
            onChange={(e) => setReviewBody(e.target.value)}
            fullWidth
            multiline
            rows={4}
            variant="outlined"
          />
          <Button variant="contained" onClick={postReview}>
            Post Review
          </Button>
          {selectedPlayer.review && selectedPlayer.review.length > 0 && (
              <div>
                <h2>Previous Reviews:</h2>
                <ul>
                  {selectedPlayer.review.map((review, index) => (
                    <li className='past' key={index}> {review.body}</li>
                  ))}
                </ul>
              </div>
            )}
        </div>
      )}

      <h2>Search Results: {searchQuery} </h2>
      <p>
      <ul>
        {teamSearchResults.map(item => (
          <li key={item.id} onClick={() => setSelectedPlayer(item)}>
            {item.name}
          </li>
        ))}
      </ul>
      </p>
    </div>

  );
}

function getTeamLogo(team) {
  switch (team) {
    case 'Tigers':
      return TigersLogo;
    case 'Giants':
      return GiantsLogo;
    case 'Dragons':
      return DragonsLogo;
    case 'Carp':
      return CarpLogo;

    case 'Buffaloes':
      return BuffaloesLogo;
    case 'Bay Stars':
      return BayStarsLogo;
    case 'Lotte Marines':
      return MarinesLogo;
    case 'Softbank Hawks':
      return SoftbankHawksLogo;

    case 'Ham Fighters':
      return HamFightersLogo;
    case 'Swallows':
      return SwallowsLogo;
    case 'Golden Eagles':
      return GoldenEaglesLogo;
    case 'Seibu Lions':
      return SeibuLionsLogo;
     
   
    default:
      return ''; // Return a default image or an empty string if no match is found
  }
}

const getCardClass = (team) => {
  switch (team) {
    case 'Tigers':
      return 'TigersCard';
    case 'Giants':
      return 'GiantsCard';
    case 'Carp':
      return 'CarpCard';
    case 'Bay Stars':
      return 'BayStarsCard';
    case 'Dragons':
      return 'DragonsCard';
    case 'Swallows':
      return 'SwallowsCard';
    case 'Buffaloes':
      return 'BuffaloesCard';
    case 'Softbank Hawks':
      return 'SoftbankHawksCard';
    case 'Ham Fighters':
      return 'HamFightersCard';
    case 'Lotte Marines':
      return 'LotteMarinesCard';
    case 'Seibu Lions':
      return 'SeibuLionsCard';
    case 'Golden Eagles':
      return 'GoldenEaglesCard';
    default:
      return ''; // Return an empty string if no match is found
  }
}

export default App;
