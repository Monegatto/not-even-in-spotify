import React, { memo } from 'react';
import './Home.css';
import SearchBar from '../../micro/SearchBar';
import { useNavigate } from 'react-router-dom';

function Home({ handleSearch, errorMessage }) {
  const navigate = useNavigate();

  const handleSearchAndNavigate = (inputUrl) => {
    handleSearch(inputUrl, (isValid) => {
      if (isValid) {
        navigate('/results');
      }
    });
  };

  return (
    <div className='home'>
      <h1 className="logo">Not Even In Spotify</h1>
      <SearchBar handleSearch={handleSearchAndNavigate} />
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
}

export default memo(Home);
