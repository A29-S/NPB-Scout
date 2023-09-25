import '../css/playerOverview.css';
import React, { useState } from 'react';
import { LinearProgress } from '@mui/material';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { usePlayerData } from '../api/PlayerDataContext';
import { getTeamLogo, getCardClass } from '../api/TeamLogo';


const PlayerOverview = () => {
  const { players, loading } = usePlayerData();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [teamSearchQuery, setTeamSearchQuery] = useState('');
  const [teamSearchResults, setTeamSearchResults] = useState([]);
  const navigate = useNavigate();

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
    setSelectedPlayer(null);
  }

  const searchPlayersByName = () => {
    const filteredPlayers = players.filter(item =>
      item.name && item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return filteredPlayers;
  }

  const resetSearch = () => {
    setSearchQuery('');
    setTeamSearchQuery('');
    setTeamSearchResults([]);
    setSelectedPlayer(null);
  }

  return (
    <div className="App-po">
      <h1 className='h1-title'>Player Search</h1>
      <div className="back-button-container">
        <Link to="/" className="back-button">Home</Link>
      </div>
      <input
        type="text"
        placeholder="Search by name..."
        value={searchQuery}
        onChange={handleSearchInputChange}
        className="search-input"
      />

      <button className="button-search" onClick={() => setTeamSearchResults(searchPlayersByName())}>
        Search Player
      </button>

      <button className="reset-button" onClick={resetSearch}>
        Clear 
      </button>

      {/* <h3>{searchQuery}</h3> */}

      {loading ? (
        <div className="loading-message">Loading players...</div>
      ) : null}

      {loading && <LinearProgress className="yellow-progress-bar" />}

      <p>
        <ul className="scrollable-list">
          {teamSearchResults.map(item => (
            <li
              key={item.id}
              onClick={() => {
                setSelectedPlayer(item);
                navigate("/profile", { state: { from: item } });
              }}
            >
              {item.name}
              <img src={getTeamLogo(item.team)} alt={`${item.team} Logo`} className="responsive"width="60" height="60" />
            </li>
          ))}
        </ul>
      </p>
    </div>
  );
};

export default PlayerOverview;
