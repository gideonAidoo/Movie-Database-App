import React from "react";
import { Link } from "react-router-dom";

const MovieCard = ({ movie }) => {
  return (
    <Link to={`/movie/${movie.imdbID}`}>
      <div className="bg-gray-800 rounded-lg shadow-md overflow-hidden hover:scale-105 transition-transform">
        <img
          src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/300"}
          alt={movie.Title}
          className="w-full h-80 object-cover"
        />
        <div className="p-3 text-center">
          <h2 className="font-semibold">{movie.Title}</h2>
          <p className="text-gray-400">{movie.Year}</p>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
