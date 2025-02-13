import React, { memo, useEffect } from 'react'; // Importando useEffect
import './SearchResults.css';
import SearchBar from '../../micro/SearchBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom'; // Melhor substituto para redirecionamento

function SearchResults({ trackInfo, handleSearch, errorMessage }) {
  const navigate = useNavigate(); // Hook de navegação mais moderno

  useEffect(() => {
    if (errorMessage) {
      console.warn('Search error:', errorMessage); // Melhor feedback para desenvolvedores
    }
  }, [errorMessage]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login'); // Redirecionamento correto
  };

  const handleHistoryNavigation = () => {
    navigate('/history');
  };

  return (
    <div className='wrapper'>
      <header className='header'>
        <Link to="/" className="miniLogo-link">
          <h1 className='miniLogo'>NEIS</h1>
        </Link>
        <div className='searchBarWrapper'>
          <SearchBar handleSearch={handleSearch} />
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </div>
        <div className='buttons'>
          <button
            className="historyButton"
            onClick={handleHistoryNavigation}
          >
            History
          </button>
          <button
            className="logoutButton"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </header>

      {trackInfo && (
        <div className='songInfo'>
          <div className='mainInfo'>
            <img
              src={trackInfo.album?.images?.[0]?.url || 'fallback-image-url'}
              alt={`${trackInfo.album?.name || 'Album'} album cover`}
              className='albumCover'
            />
          </div>
          <div className='secondaryInfo'>
            {[
              { label: 'Song Name', value: trackInfo.name },
              { label: 'Album', value: trackInfo.album?.name },
              { label: "Album's total tracks", value: `${trackInfo.album?.total_tracks} songs` },
              { label: 'Release date', value: trackInfo.album?.release_date ? new Date(trackInfo.album.release_date).toLocaleDateString('pt-BR') : 'N/A' },
              { label: 'Artist', value: trackInfo.artists?.map((artist) => artist.name).join(', ') },
              { label: 'Duration', value: `${Math.floor(trackInfo.duration_ms / 60000)}:${((trackInfo.duration_ms % 60000) / 1000).toFixed(0).padStart(2, '0')}` },
              { label: 'Popularity', value: `${trackInfo.popularity}/100` },
              { label: 'Explicit', value: trackInfo.explicit ? 'Yes' : 'No' }
            ].map(({ label, value }, index) => (
              <span key={index}>
                <div className="infoHeader">
                  <strong>{label} <FontAwesomeIcon icon={faCircleInfo} className='info-icon' /></strong>
                </div>
                <div className="infoValue">{value || 'N/A'}</div>
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default memo(SearchResults);
