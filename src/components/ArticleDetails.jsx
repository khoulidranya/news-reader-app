import React, { useState, useEffect } from "react"; // Import useState and useEffect
import { useParams } from "react-router-dom";

const ArticleDetails = () => {
  const { id } = useParams(); // UUID from the URL
  const [article, setArticle] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Fetch the article using the UUID
        const response = await fetch(
          `https://api.thenewsapi.com/v1/news/uuid/${id}?api_token=EjHvK9Gizp5fVWwjV5NdK4dQ5TbgNmzuNEjj5tW6`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch the article.");
        }

        const data = await response.json();
        setArticle(data);
      } catch (err) {
        console.error("Error fetching article:", err);
        setError("Failed to load the article. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticle();
  }, [id]);

  if (isLoading) {
    return <div className="text-center">Loading...</div>;
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

  if (!article) {
    return <div className="text-center">Article not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">{article.title}</h1>
      <img
        src={article.image_url || "https://via.placeholder.com/150"}
        alt={article.title}
        className="w-full h-64 object-cover mb-4"
      />
      <p className="text-xl mb-4">{article.description || article.snippet}</p>
      <p className="mb-4">Published: {new Date(article.published_at).toLocaleString() || "Unknown"}</p>
      <p className="mb-4">Source: {article.source || "Unknown"}</p>
      <div className="mb-4">
        Categories:{" "}
        {article.categories && article.categories.length > 0 ? (
          article.categories.map((category) => (
            <span
              key={category}
              className="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded mr-2 text-sm"
            >
              {category}
            </span>
          ))
        ) : (
          "None"
        )}
      </div>
      <a
        href={article.url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 underline"
      >
        Read Full Article
      </a>
    </div>
  );
};

export default ArticleDetails;
