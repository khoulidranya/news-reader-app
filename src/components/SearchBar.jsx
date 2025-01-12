import React, { useState } from 'react';
import axios from 'axios';

const SearchBar = ({ onSearchResults }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const apiToken = 'MXS6UTKpEBrolKRdRda7IQCcWvGnm9t4bagKLuAj';
  const apiUrl = 'https://api.thenewsapi.com/v1/news/all';

  // Handle search logic
  const handleSearch = async () => {
    const trimmedSearchTerm = searchTerm.trim();

    if (!trimmedSearchTerm) {
      setError('Please enter a valid search term.');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.get(apiUrl, {
        params: {
          api_token: apiToken,
          search: trimmedSearchTerm,
        },
      });

      const results = response.data.data;

      if (results.length === 0) {
        setError('No results found for your search.');
      } else {
        onSearchResults(results); // Pass results to parent component
        setSearchTerm(''); // Clear input after successful search
      }
    } catch (err) {
      console.error('Error searching news:', err);
      setError('Failed to search news. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Trigger search on "Enter" key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="mb-4">
      <label htmlFor="search-input" className="sr-only">
        Search for news
      </label>
      <input
        id="search-input"
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Search for news..."
        aria-label="Search for news"
        className="w-full p-2 border rounded"
      />
      <button
        onClick={handleSearch}
        disabled={isLoading}
        className={`mt-2 px-4 py-2 text-white rounded ${
          isLoading
            ? 'bg-gray-300 cursor-not-allowed'
            : 'bg-blue-500 hover:bg-blue-600'
        }`}
      >
        {isLoading ? 'Searching...' : 'Search'}
      </button>
      {error && <p className="mt-2 text-red-500">{error}</p>}
    </div>
  );
};

export default SearchBar;
