import React, { useState, useEffect } from 'react';

const HomePage = () => {
  const [topStories, setTopStories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const url = `https://api.thenewsapi.com/v1/news/top?api_token=MXS6UTKpEBrolKRdRda7IQCcWvGnm9t4bagKLuAj`;
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }
        const { meta, data } = await response.json();
        
        // Process the data as needed
        const processedArticles = data.map(article => ({
          id: article.uuid,
          title: article.title,
          description: article.description,
          snippet: article.snippet,
          url: article.url,
          imageUrl: article.image_url,
          publishedAt: article.published_at,
          source: article.source,
          categories: article.categories,
          relevanceScore: article.relevance_score,
          locale: article.locale
        }));
        
        setTopStories(processedArticles);
      } catch (error) {
        console.error('Failed to fetch top stories:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStories();
  }, []);
  const handleSearch = async () => {
    try {
      const url = `https://api.thenewsapi.com/v1/news/search?api_token=YOUR_API_TOKEN_HERE&search=${encodeURIComponent(searchTerm)}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      const { meta, data } = await response.json();
      
      // Process the search results
      const processedSearchResults = data.map(article => ({
        id: article.uuid,
        title: article.title,
        description: article.description,
        snippet: article.snippet,
        url: article.url,
        imageUrl: article.image_url,
        publishedAt: article.published_at,
        source: article.source,
        categories: article.categories,
        relevanceScore: article.relevance_score,
        locale: article.locale
      }));
      
      setTopStories(processedSearchResults);
    } catch (error) {
      console.error('Failed to fetch search results:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center">
          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-blue-500 inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          <span className="font-bold text-xl">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Search Bar */}
      <div className="flex justify-between items-center bg-gray-200 p-4 mb-8">
        <h1 className="text-xl font-bold">News Reader</h1>
        <div className="flex space-x-2">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search articles..."
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSearch}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          >
            Search
          </button>
        </div>
      </div>

      {/* Articles List */}
      <div className="container mx-auto px-4">
        {topStories.map((story, index) => (
          <div key={index} className="bg-white shadow-md rounded-lg mb-4 p-4">
            <h2 className="font-bold text-xl mb-2">{story.title}</h2>
            <p className="text-gray-700 text-sm mb-2">{story.snippet}</p>
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-500">Source: {story.source}</span>
              <a href={story.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-600">
                Read More
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
