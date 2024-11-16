import './SearchResults.css';
import SearchBar from '../../micro/SearchBar';

function SearchResults({ trackInfo, handleSearch, errorMessage }) {
  return (
    <div className='wrapper'>
      <div className='header'>
        <h1 className='miniLogo'>NEIS</h1>
        <div className='searchBarWrapper'>
          <SearchBar handleSearch={handleSearch} />
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </div>
      </div>
      
      {trackInfo && (
        <div className='songInfo'>
          <div>
            <img src={trackInfo.album.images[0].url} alt={`${trackInfo.album.name} album cover`} className='albumCover' />
            <p><strong>Name:</strong> {trackInfo.name}</p>
            <p><strong>Album:</strong> {trackInfo.album.name}</p>
            <p><strong>Artist:</strong> {trackInfo.artists.map((artist) => artist.name).join(', ')}</p>
            <p><strong>Duration:</strong> {Math.floor(trackInfo.duration_ms / 60000)}:{((trackInfo.duration_ms % 60000) / 1000).toFixed(0).padStart(2, '0')}</p>
          </div>
          <div>
            <p><strong>Danceability:</strong> {trackInfo.danceability}</p>
            <p><strong>Energy:</strong> {trackInfo.energy}</p>
            <p><strong>Valence:</strong> {trackInfo.valence}</p>
            <p><strong>Tempo:</strong> {trackInfo.tempo} BPM</p>
            <p><strong>Acousticness:</strong> {trackInfo.acousticness}</p>
            <p><strong>Instrumentalness:</strong> {trackInfo.instrumentalness}</p>
            <p><strong>Liveness:</strong> {trackInfo.liveness}</p>
            <p><strong>Loudness:</strong> {trackInfo.loudness} dB</p>
            <p><strong>Speechiness:</strong> {trackInfo.speechiness}</p>
            <p><strong>Time Signature:</strong> {trackInfo.time_signature}/4</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default SearchResults;