import React from 'react';
import '../css/home.css'; // Import your CSS file
import {
  LinearProgress,
  Card,
  CardContent,
  Typography,
  Button,

} from '@mui/material'; // Import Material-UI components
import Grid from '@mui/material/Grid';
import { BrowserRouter as Router,Routes, Route, Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import '../css/home.css'; // Import your CSS file
import axios from 'axios';

const Home = () => {
  return (
    <div className="App-home">
      <div className="left-half">
        <div className="title">NPB Scout</div>
          <div className="info"> Follow Players, View Stats, Write Reviews </div>
        <div className="buttons">
          <a className="button" href="/player-overview">Search by Player</a>
          <a className="button" href="/team-overview">Search by Team</a>
        </div>
      </div>
      <div className="right-half">
        {/* Content for the right half */}
      </div>
    </div>
  );
};

export default Home;
