import React, { useState } from 'react';
import '../styles/SearchBar.css';

//Obsługa wprowadzenia lokalizacji.
function SearchBar({ onSearch }) {
  const [inputValue, setInputValue] = useState('');

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (inputValue.trim()) {
      onSearch(inputValue);
      setInputValue('');
    }
  };

  return (
    <div className="search-bar">
      <form onSubmit={handleSubmit} className="search-form">
        <input
          type="text"
          placeholder="Wpisz lokalizację..."
          value={inputValue}
          onChange={handleChange}
          className="search-input"
        />
        <button type="submit" className="search-button">
          🔍
        </button>
      </form>
    </div>
  );
}

export default SearchBar;