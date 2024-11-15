import './Home.css';
import SearchBar from '../../micro/SearchBar';

function Home({ handleSearch }) {
  return (
    <div>
      <h1 className="hero">Not Even In Spotify</h1>
      <SearchBar handleSearch={handleSearch} />
    </div>
  );
}

export default Home;
