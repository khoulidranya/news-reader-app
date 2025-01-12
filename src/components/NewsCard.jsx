import React from "react";
import { Link } from "react-router-dom";
import "../index.css";

const NewsCard = ({ article }) => {
  const imageUrl = article.image_url || "https://png.pngtree.com/png-vector/20210604/ourmid/pngtree-gray-network-placeholder-png-image_3416659.jpg";
  const authorImage = article.author_image || "/author.svg";

  return (
    <div className="max-w-sm w-full lg:max-w-full lg:flex border-gray-400 border rounded overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 bg-white">
      {/* Image Section */}
      <div
        className="h-48 lg:h-auto lg:w-48 flex-none bg-cover text-center overflow-hidden rounded-t lg:rounded-t-none lg:rounded-l"
        style={{
          backgroundImage: `url(${imageUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        title={article.title || "News Image"}
      ></div>

      {/* Content Section */}
      <div className="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
        <div className="mb-8">
          <p className="text-sm text-gray-600 flex items-center">
            <svg
              className="fill-current text-gray-500 w-4 h-4 mr-2"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M4 8V6a6 6 0 1 1 12 0v2h1a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-8c0-1.1.9-2 2-2h1zm5 6.73V17h2v-2.27a2 2 0 1 0-2 0zM7 6v2h6V6a3 3 0 0 0-6 0z" />
            </svg>
            Members only
          </p>
          <div className="text-gray-900 font-bold text-xl mb-2">
            {article.title || "Untitled Article"}
          </div>
          <p className="text-gray-700 text-base">
            {article.snippet
              ? article.snippet.length > 100
                ? `${article.snippet.substring(0, 100)}...`
                : article.snippet
              : "No description available."}
          </p>
        </div>

        {/* Category Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {article.categories && article.categories.length > 0 ? (
            article.categories.map((category, index) => (
              <span
                key={index}
                className="inline-block bg-gray-200 text-gray-800 px-3 py-1 text-sm rounded-full"
              >
                {category}
              </span>
            ))
          ) : (
            <span className="inline-block bg-gray-200 text-gray-800 px-3 py-1 text-sm rounded-full">
              Uncategorized
            </span>
          )}
        </div>

        {/* Author and Published Date */}
        <div className="flex items-center">
          <img
            className="w-10 h-10 rounded-full mr-4"
            src={authorImage}
            alt={article.author || "Author Avatar"}
          />
          <div className="text-sm">
            <p className="text-gray-900 leading-none">
              {article.author || "Unknown Author"}
            </p>
            <p className="text-gray-600">
              {article.published_at
                ? new Date(article.published_at).toLocaleDateString()
                : "Unknown Date"}
            </p>
          </div>
        </div>

        {/* Read More Button */}
        <div className="mt-4">
          <Link
            to={`/details/${article.uuid}`}
            className="block bg-blue-600 text-white py-2 px-4 rounded text-center hover:bg-blue-700 transition-colors duration-300"
            aria-label={`Read more about ${article.title || "this article"}`}
          >
            Read More
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
