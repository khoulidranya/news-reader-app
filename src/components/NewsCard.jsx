import React from "react";
import { Link } from "react-router-dom";

const NewsCard = ({ article }) => {
  return (
    <div className="border rounded p-4">
      <img
        src={article.image_url || "https://via.placeholder.com/150"}
        alt={article.title}
        className="w-full h-40 object-cover mb-2"
      />
      <h2 className="font-bold text-lg mb-2">{article.title}</h2>
      <p className="text-gray-700 text-sm">{article.snippet}</p>
      <Link
        to={`/details/${article.uuid}`} // Use the UUID to navigate
        className="text-blue-500"
      >
        Read More
      </Link>
    </div>
  );
};

export default NewsCard;
