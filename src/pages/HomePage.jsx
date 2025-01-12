import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiLoader } from "react-icons/fi";
import SearchBar from "../components/SearchBar";
import NewsCard from "../components/NewsCard";


const HomePage = () => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTopStories = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await fetch(
          `https://api.thenewsapi.com/v1/news/top?api_token=EjHvK9Gizp5fVWwjV5NdK4dQ5TbgNmzuNEjj5tW6&categories=general&language=en`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch articles.");
        }

        const data = await response.json();
        setArticles(data.data);
      } catch (err) {
        console.error("Error fetching articles:", err);
        setError("Failed to load articles. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchTopStories();
  }, []);

  const handleSearchResults = (results) => {
    setArticles(results);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="flex flex-col items-center">
          <FiLoader className="animate-spin text-blue-500" size={50} />
          <p className="mt-4 text-blue-600 font-semibold text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 font-semibold mt-4">
        <p>{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
        >
          Reload
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-gray shadow-md py-4 sticky top-0 z-50">

        <nav className="container mx-auto px-4 flex justify-between items-center max-w-7xl">
          <h1 className="text-2xl font-bold text-blue-600">News Reader</h1>
          <SearchBar onSearchResults={handleSearchResults} />
        </nav>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 flex-1 max-w-7xl">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Top Stories</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <NewsCard key={article.uuid || article.title} article={article} />
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-4 text-center">
        &copy; {new Date().getFullYear()} News Reader App. All rights reserved.
      </footer>
    </div>
  );
};

export default HomePage;
