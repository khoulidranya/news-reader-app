// components/SearchBar.jsx

import React from 'react';

const SearchBar = ({ onSearch }) => {
  const handleInputChange = (e) => {
    onSearch(e.target.value);
  };

  return (
    <div className="mb-4">
      <input
        type="text"
        placeholder="Search articles..."
        className="w-full p-2 border rounded"
        onChange={handleInputChange}
      />
    </div>
  );
};

export default SearchBar;