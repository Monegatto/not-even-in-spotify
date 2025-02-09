  import React, { memo } from 'react';
  import './SearchResults.css';
  import SearchBar from '../../micro/SearchBar';
  import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
  import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';
  import { Link } from 'react-router-dom';

  function SearchResults({ trackInfo, handleSearch, errorMessage }) {
    return (
      <div className='wrapper'>
        <div className='header'>
          <Link to="/" className="miniLogo-link">
            <h1 className='miniLogo'>NEIS</h1>
          </Link>
          <div className='searchBarWrapper'>
            <SearchBar handleSearch={handleSearch} />
            {errorMessage && <p className="error-message">{errorMessage}</p>}
          </div>
        </div>
  
        {trackInfo && (
          <div className='songInfo'>
            <div className='mainInfo'>
              <img src={trackInfo.album.images[0].url} alt={`${trackInfo.album.name} album cover`} className='albumCover' />
            </div>
            
            <div className='secondaryInfo'>
              <span>
                <div className="infoHeader">
                  <strong>Song Name <FontAwesomeIcon icon={faCircleInfo} width={'5px'} className='info-icon' /></strong>
                </div>
                <div className="infoValue">{trackInfo.name}</div>
              </span>
              <span>
                <div className="infoHeader">
                  <strong>Album <FontAwesomeIcon icon={faCircleInfo} width={'5px'} className='info-icon' /></strong>
                </div>
                <div className="infoValue">{trackInfo.album.name}</div>
              </span>
              <span>
                <div className="infoHeader">
                  <strong>Album's total tracks <FontAwesomeIcon icon={faCircleInfo} width={'5px'} className='info-icon' /></strong>
                </div>
                <div className="infoValue">{trackInfo.album.total_tracks} songs</div>
              </span>
              <span>
                <div className="infoHeader">
                  <strong>Release date <FontAwesomeIcon icon={faCircleInfo} width={'5px'} className='info-icon' /></strong>
                </div>
                <div className="infoValue">{new Date(trackInfo.album.release_date).toLocaleDateString('pt-BR')}</div>
              </span>
              <span>
                <div className="infoHeader">
                  <strong>Artist <FontAwesomeIcon icon={faCircleInfo} width={'5px'} className='info-icon' /></strong>
                </div>
                <div className="infoValue">{trackInfo.artists.map((artist) => artist.name).join(', ')}</div>
              </span>
              <span>
                <div className="infoHeader">
                  <strong>Duration <FontAwesomeIcon icon={faCircleInfo} width={'5px'} className='info-icon' /></strong>
                </div>
                <div className="infoValue">{Math.floor(trackInfo.duration_ms / 60000)}:{((trackInfo.duration_ms % 60000) / 1000).toFixed(0).padStart(2, '0')}</div>
              </span>
              <span>
                <div className="infoHeader">
                  <strong>Popularity <FontAwesomeIcon icon={faCircleInfo} width={'5px'} className='info-icon' /></strong>
                </div>
                <div className="infoValue">{trackInfo.popularity + '/100'}</div>
              </span>
              <span>
                <div className="infoHeader">
                  <strong>Explicit <FontAwesomeIcon icon={faCircleInfo} width={'5px'} className='info-icon' /></strong>
                </div>
                <div className="infoValue">{trackInfo.explicit ? 'Yes' : 'No'}</div>
              </span>
            </div>
          </div>
        )}
      </div>
    );
  }

  export default memo(SearchResults);
