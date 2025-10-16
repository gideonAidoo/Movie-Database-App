import React from "react";
import { Link } from "react-router-dom";
import { useFavorites } from "../context/context/FavoritesContext";
import { Heart } from "lucide-react";
import { toast } from "react-toastify";

const MovieCard = ({ movie }) => {
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();
  const favorite = isFavorite(movie.imdbID);

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    e.preventDefault();

    if (favorite) {
      removeFavorite(movie.imdbID);
      toast.info(`${movie.Title} removed from favorites`);
    } else {
      addFavorite(movie);
      toast.success(`${movie.Title} added to favorites`);
    }
  };

  return (
    <Link to={`/movie/${movie.imdbID}`} className="w-full">
      <div className="bg-gray-800 rounded-2xl p-3 shadow-lg hover:shadow-2xl transition-all duration-300 relative hover:scale-105 flex flex-col">
        {/* Poster */}
        <div className="relative w-full">
          <img
            src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/300x400"}
            alt={movie.Title}
            className="rounded-lg w-full h-64 sm:h-72 md:h-80 lg:h-96 object-cover"
          />
          <button
            onClick={handleFavoriteClick}
            className={`absolute top-3 right-3 p-2 rounded-full transition-colors ${
              favorite ? "bg-red-500" : "bg-gray-700 hover:bg-red-500"
            }`}
          >
            <Heart
              size={22}
              className={`${favorite ? "fill-white text-white" : "text-white"}`}
            />
          </button>
        </div>

        {/* Text content */}
        <div className="mt-3 text-white text-center sm:text-left">
          <h2 className="text-base sm:text-lg md:text-xl font-semibold truncate">{movie.Title}</h2>
          <p className="text-xs sm:text-sm opacity-70">{movie.Year}</p>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
