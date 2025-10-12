import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { toast } from "react-toastify";

const MovieCard = ({ movie }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = () => {
    setIsFavorite((prev) => {
      const newState = !prev;

      if (newState) {
        toast.success(`${movie.Title} added to favorites ❤️`);
      } else {
        toast.info(`${movie.Title} removed from favorites 💔`);
      }

      return newState;
    });
  };

  return (
    <div className="bg-gray-800 rounded-lg shadow-md overflow-hidden hover:scale-105 transition-transform">
      <Link to={`/movie/${movie.imdbID}`}>
        <img
          src={
            movie.Poster !== "N/A"
              ? movie.Poster
              : "https://via.placeholder.com/300x400"
          }
          alt={movie.Title}
          className="w-full h-72 object-cover"
        />
      </Link>

      <div className="p-3 flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">{movie.Title}</h3>
          <p className="text-gray-400">{movie.Year}</p>
        </div>

        <button onClick={toggleFavorite} className="text-yellow-400">
          {isFavorite ? <FaHeart /> : <FaRegHeart />}
        </button>
      </div>
    </div>
  );
};

export default MovieCard;
