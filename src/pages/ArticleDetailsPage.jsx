import React from 'react';
import { useLocation, Link } from 'react-router-dom';

const ArticleDetailsPage = () => {
  const { state: { article } } = useLocation();

  return (
    <div className="p-4">
      <Link to="/" className="text-blue-500">← Back to Home</Link>
      <h1 className="text-2xl font-bold mt-4">{article.title}</h1>
      <img
        src={article.image_url || 'https://via.placeholder.com/150'}
        alt={article.title}
        className="w-full h-96 object-cover mt-4"
      />
      <p className="text-sm text-gray-600 mt-2">{new Date(article.published_at).toLocaleString()}</p>
      <p className="text-lg mt-4">{article.description || article.snippet}</p>
      <p className="mt-4 text-sm text-gray-600"><b>Author:</b> {article.author || 'Unknown'}</p>
      <p className="mt-2 text-sm text-gray-600"><b>Source:</b> {article.source || 'Unknown'}</p>
      <a href={article.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 mt-4 block">
        Read Full Article
      </a>
    </div>
  );
};

export default ArticleDetailsPage;
