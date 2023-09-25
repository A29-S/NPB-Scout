import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/teamOverview.css'; // Import your custom CSS
import api from '../api/axiosConfig';
import { getTeamLogo, getCardClass } from '../api/TeamLogo';

const TeamOverview = () => {
  const [players, setPlayers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [teamSearchQuery, setTeamSearchQuery] = useState('');
  const [teamSearchResults, setTeamSearchResults] = useState([]);

  const teamOptions = [
    'Tigers', 'Giants', 'Carp', 'Bay Stars', 'Dragons',
    'Swallows', 'Buffaloes', 'Softbank Hawks', 'Ham Fighters',
    'Lotte Marines', 'Seibu Lions', 'Golden Eagles'
  ];

  const handleTeamSelectChange = (team) => {
    setTeamSearchQuery(team);
    setSelectedPlayer(null);
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

  return (
    <div className="team-container"> {/* Use your custom CSS class for the container */}
      {teamOptions.map((team, index) => (
        <div key={index} className={`${getCardClass(team)}2`}> {/* Use your custom CSS class for the card */}
          <div className="card-content"> {/* Use your custom CSS class for card content */}
            <img
              src={getTeamLogo(team)}
              alt={`${team} Logo`}
              className="responsive"
            />
            <h6 className="card-text">{team}</h6>
          </div>
          <div className="card-actions"> {/* Use your custom CSS class for card actions */}
            <button
              className="button-card"
              onClick={() => {
                handleTeamSelectChange(team);
                searchPlayersByTeam();
                setSearchQuery(team);
              }}
            >
              View Team
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TeamOverview;
