import React from 'react';

const NewsCard = ({ article }) => {
  return (
    <div className="border rounded p-4">
      <img src={article.image_url} alt={article.title} className="w-full h-40 object-cover mb-2" />
      <h2 className="font-bold text-lg mb-2">{article.title}</h2>
      <p className="text-gray-700 text-sm">{article.snippet}</p>
      <a href={article.url} target="_blank" rel="noopener noreferrer" className="text-blue-500">
        Read More
      </a>
    </div>
  );
};

export default NewsCard;
