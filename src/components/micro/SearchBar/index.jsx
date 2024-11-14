import './SearchBar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

function SearchBar() {
  return (
    <div>
      <input type="text" placeholder="Paste a song URL to see more details" />
      <FontAwesomeIcon icon={faMagnifyingGlass} color='#1E1E1E' className='find-icon'/>
    </div>
  );
}

export default SearchBar;