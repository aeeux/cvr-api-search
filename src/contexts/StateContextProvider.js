import React, { createContext, useContext, useState } from 'react';

const StateContext = createContext();
const baseUrl = 'https://cvr-dev.p.rapidapi.com/api/cvr';

export const StateContextProvider = ({ children }) => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const getResults = async (url) => {
    setLoading(true);

    const res = await fetch(`${baseUrl}${url}`, {
      method: 'GET',
      headers: {
        'x-rapidapi-host': 'cvr-dev.p.rapidapi.com',
        'x-rapidapi-key': '68320ee1c8mshdfe9c1e54c79b7ap16f4ebjsn072c57e0f68a',
      },
    });

    const data = await res.json();

    setResults(data);
    setLoading(false);
  };

  return (
    <StateContext.Provider value={{ getResults, results, searchTerm, setSearchTerm, loading }}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
