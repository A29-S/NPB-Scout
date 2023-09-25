// PlayerDataContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import api from './axiosConfig';

const PlayerDataContext = createContext();

export const usePlayerData = () => {
  return useContext(PlayerDataContext);
};

export const PlayerDataProvider = ({ children }) => {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getPlayers = async () => {
      try {
        const response = await api.get('/api/v1/players');
        setPlayers(response.data);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };

    getPlayers();
  }, []);

  return (
    <PlayerDataContext.Provider value={{ players, loading }}>
      {children}
    </PlayerDataContext.Provider>
  );
};
