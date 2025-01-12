import React, { useState, useEffect } from "react";
import { FiLoader } from "react-icons/fi";
import SearchBar from "../components/SearchBar";
import NewsCard from "../components/NewsCard";
import CategoryFilter from "../components/CategoryFilter";

const HomePage = () => {
  const [articles, setArticles] = useState([]); // All articles
  const [filteredArticles, setFilteredArticles] = useState([]); // Articles filtered by category
  const [categories, setCategories] = useState([]); // List of categories for filter
  const [selectedCategory, setSelectedCategory] = useState("all"); // Default category
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch top stories on initial load
  useEffect(() => {
    const fetchTopStories = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await fetch(
          `https://api.thenewsapi.com/v1/news/top?api_token=Ejo0AK5FpWi4LLigU2LeF5x4In0XPoY348bzr7Tz&categories=general&language=en`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch articles.");
        }

        const data = await response.json();

        // Extract unique categories from the articles
        const extractedCategories = [
          "all",
          ...new Set(
            data.data.flatMap((article) =>
              article.categories ? article.categories : []
            )
          ),
        ];

        setArticles(data.data);
        setFilteredArticles(data.data); // Initially show all articles
        setCategories(extractedCategories); // Populate filter options
      } catch (err) {
        console.error("Error fetching articles:", err);
        setError("Failed to load articles. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchTopStories();
  }, []);

  // Handle category filter change
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);

    // Filter articles by category
    if (category === "all") {
      setFilteredArticles(articles); // Show all articles
    } else {
      const filtered = articles.filter((article) =>
        article.categories && article.categories.includes(category)
      );
      setFilteredArticles(filtered);
    }
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
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-md py-4 sticky top-0 z-50 w-full">
        <nav className="flex justify-between items-center px-4">
          <h1 className="text-2xl font-bold text-blue-600">News Reader</h1>
          <SearchBar onSearchResults={setFilteredArticles} />
        </nav>
      </header>

      {/* Category Filter */}
      <div className="w-full px-4 py-4">
        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
        />
      </div>

      {/* Main Content */}
      <main className="w-full px-4 py-8 flex-1">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          {selectedCategory === "all"
            ? "All Articles"
            : `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} News`}
        </h2>
        {filteredArticles.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map((article) => (
              <NewsCard key={article.uuid || article.title} article={article} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500 italic">No articles available in this category.</p>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-4 text-center w-full">
        &copy; {new Date().getFullYear()} News Reader App by Ranya Khoulid for ALX. All rights reserved.
      </footer>
    </div>
  );
};

export default HomePage;
