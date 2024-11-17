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
              <p><strong>Song Name:</strong> {trackInfo.name}</p>
              <p><strong>Album:</strong> {trackInfo.album.name}</p>
              <p><strong>Artist:</strong> {trackInfo.artists.map((artist) => artist.name).join(', ')}</p>
              <p><strong>Duration:</strong> {Math.floor(trackInfo.duration_ms / 60000)}:{((trackInfo.duration_ms % 60000) / 1000).toFixed(0).padStart(2, '0')}</p>
            </div>
            
            <div className='secondaryInfo'>
              <p title='Danceability describes how suitable a track is for dancing based on a combination of musical elements including tempo, rhythm stability, beat strength, and overall regularity. A value of 0.0 is least danceable and 1.0 is most danceable.'>
                <div className="infoHeader">
                  <strong>Danceability <FontAwesomeIcon icon={faCircleInfo} width={'5px'} className='info-icon' /></strong>
                </div>
                <div className="infoValue">{trackInfo.danceability}</div>
              </p>
              <p title='Energy is a measure from 0.0 to 1.0 and represents a perceptual measure of intensity and activity. Typically, energetic tracks feel fast, loud, and noisy. For example, death metal has high energy, while a Bach prelude scores low on the scale. Perceptual features contributing to this attribute include dynamic range, perceived loudness, timbre, onset rate, and general entropy.'>
                <div className="infoHeader">
                  <strong>Energy <FontAwesomeIcon icon={faCircleInfo} width={'5px'} className='info-icon' /></strong>
                </div>
                <div className="infoValue">{trackInfo.energy}</div>
              </p>
              <p title=''>
                <div className="infoHeader">
                  <strong>Valence <FontAwesomeIcon icon={faCircleInfo} width={'5px'} className='info-icon' /></strong>
                </div>
                <div className="infoValue">{trackInfo.valence}</div>
              </p>
              <p title=''>
                <div className="infoHeader">
                  <strong>Tempo <FontAwesomeIcon icon={faCircleInfo} width={'5px'} className='info-icon' /></strong>
                </div>
                <div className="infoValue">{trackInfo.tempo} BPM</div>
              </p>
              <p title=''>
                <div className="infoHeader">
                  <strong>Acousticness <FontAwesomeIcon icon={faCircleInfo} width={'5px'} className='info-icon' /></strong>
                </div>
                <div className="infoValue">{trackInfo.acousticness}</div>
              </p>
              <p title=''>
                <div className="infoHeader">
                  <strong>Instrumentalness <FontAwesomeIcon icon={faCircleInfo} width={'5px'} className='info-icon' /></strong>
                </div>
                <div className="infoValue">{trackInfo.instrumentalness}</div>
              </p>
              <p title=''>
                <div className="infoHeader">
                  <strong>Liveness <FontAwesomeIcon icon={faCircleInfo} width={'5px'} className='info-icon' /></strong>
                </div>
                <div className="infoValue">{trackInfo.liveness}</div>
              </p>
              <p title=''>
                <div className="infoHeader">
                  <strong>Loudness <FontAwesomeIcon icon={faCircleInfo} width={'5px'} className='info-icon' /></strong>
                </div>
                <div className="infoValue">{trackInfo.loudness} dB</div>
              </p>
              <p title=''>
                <div className="infoHeader">
                  <strong>Speechiness <FontAwesomeIcon icon={faCircleInfo} width={'5px'} className='info-icon' /></strong>
                </div>
                <div className="infoValue">{trackInfo.speechiness}</div>
              </p>
              <p title=''>
                <div className="infoHeader">
                  <strong>Time Signature <FontAwesomeIcon icon={faCircleInfo} width={'5px'} className='info-icon' /></strong>
                </div>
                <div className="infoValue">{trackInfo.time_signature}/4</div>
              </p>
            </div>
          </div>
        )}
      </div>
    );
  }

  export default memo(SearchResults);
