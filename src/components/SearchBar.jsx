import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import searchIcon from '../images/search.png';

const SearchBar = (props) => {
  let navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");

  const handleSearchInputChanges = (e) => {
    setSearchValue(e.target.value);
  }

  const callSearchFunction = (e) => {
    e.preventDefault();
    navigate('/search/' + searchValue);
  }

  return (
    <div className="search-bar">
      <form className="test" onSubmit={callSearchFunction}>
        <div className="inner-form">
          <div className="basic-search">
            <div className="input-field">
              <input value={searchValue} onChange={handleSearchInputChanges} type="text" placeholder="Search Shoe" />
              <div className="icon-wrap">
                <img src={searchIcon} width="24" height="24" onClick={callSearchFunction} alt="Search" />
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default SearchBar;
