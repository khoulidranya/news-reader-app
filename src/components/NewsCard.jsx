import React from "react";
import { Link } from "react-router-dom";

const NewsCard = ({ article }) => {
  return (
    <div className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
      {/* Image Thumbnail */}
      <div className="w-full h-48 bg-gray-200">
        <img
          src={article.image_url || "https://via.placeholder.com/150"}
          alt={article.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col justify-between">
        <h2 className="font-semibold text-lg mb-2 text-gray-800">
          {article.title}
        </h2>
        <p className="text-sm text-gray-600 mb-4">
          {article.snippet.length > 100
            ? `${article.snippet.substring(0, 100)}...`
            : article.snippet}
        </p>

        {/* Read More Button */}
        <Link
          to={`/details/${article.uuid}`}
          className="mt-auto bg-blue-600 text-white text-center py-2 px-4 rounded hover:bg-blue-700 transition-colors duration-300"
        >
          Read More
        </Link>
      </div>
    </div>
  );
};

export default NewsCard;
