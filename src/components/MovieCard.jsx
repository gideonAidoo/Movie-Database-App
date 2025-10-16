import React from "react";
import { useFavorites } from "../context/context/FavoritesContext";
import { Heart } from "lucide-react";

const MovieCard = ({ movie }) => {
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();

  const favorite = isFavorite(movie.imdbID);

  const handleFavoriteClick = () => {
    if (favorite) {
      removeFavorite(movie.imdbID);
      alert(`${movie.Title} removed from favorites!`);
    } else {
      addFavorite(movie);
      alert(`${movie.Title} added to favorites!`);
    }
  };

  return (
    <div className="bg-gray-800 rounded-2xl p-3 shadow-lg hover:shadow-2xl transition-all duration-300 relative">
      <img
        src={movie.Poster}
        alt={movie.Title}
        className="rounded-lg w-full h-80 object-cover"
      />

      <div className="mt-3 text-white">
        <h2 className="text-lg font-semibold">{movie.Title}</h2>
        <p className="text-sm opacity-70">{movie.Year}</p>
      </div>

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
  );
};

export default MovieCard;
