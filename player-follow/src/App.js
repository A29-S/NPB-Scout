import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import TeamOverview from './pages/TeamOverview';
import PlayerOverview from './pages/PlayerOverview';
import PlayerProfile from './pages/PlayerProfile';
import { PlayerDataProvider } from './api/PlayerDataContext';

import './css/home.css';

const App = () => {
 return (
    <>
      <PlayerDataProvider>
       <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/player-overview" element={<PlayerOverview />} />
          <Route path="/team-overview" element={<TeamOverview />} />
          <Route path="/profile" element={<PlayerProfile/>} />
       </Routes>
      </PlayerDataProvider>
    </>
 );
};

export default App;