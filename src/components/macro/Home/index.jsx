import './Home.css';
import SearchBar from '../../micro/SearchBar';
import { useNavigate } from 'react-router-dom';

function Home({ handleSearch }) {
  const navigate = useNavigate();

  const handleSearchAndNavigate = (inputUrl) => {
    handleSearch(inputUrl);
    navigate('/results');
  };

  return (
    <div>
      <h1 className="logo">Not Even In Spotify</h1>
      <SearchBar handleSearch={handleSearchAndNavigate} />
    </div>
  );
}

export default Home;
