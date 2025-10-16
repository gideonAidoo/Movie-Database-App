import React from "react";
import { useFavorites } from "../context/context/FavoritesContext";
import { Link } from "react-router-dom";
import { Trash2 } from "lucide-react";
import { toast } from "react-toastify";

const Favorites = () => {
  const { favorites, removeFavorite } = useFavorites();

  const handleRemove = (id, title) => {
    removeFavorite(id);
    toast.info(`${title} removed from favorites`);
  };

  if (favorites.length === 0) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex flex-col justify-center items-center text-center p-6">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4">No Favorites Yet </h2>
        <p className="text-gray-400 mb-6">Start adding movies you love to your favorites list!</p>
        <Link
          to="/"
          className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold px-5 py-2 rounded-md transition-colors"
        >
          Browse Movies
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 sm:p-10">
      <h1 className="text-3xl sm:text-4xl font-bold mb-8 text-center text-yellow-400">
        Your Favorite Movies 
      </h1>

      {/* Responsive Movie Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {favorites.map((movie) => (
          <div
            key={movie.imdbID}
            className="relative bg-gray-800 rounded-2xl p-3 shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300"
          >
            <Link to={`/movie/${movie.imdbID}`}>
              <img
                src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/300x400"}
                alt={movie.Title}
                className="rounded-lg w-full h-80 object-cover"
              />
              <div className="mt-3 text-white">
                <h2 className="text-lg font-semibold">{movie.Title}</h2>
                <p className="text-sm opacity-70">{movie.Year}</p>
              </div>
            </Link>

            {/* Remove Button */}
            <button
              onClick={() => handleRemove(movie.imdbID, movie.Title)}
              className="absolute top-3 right-3 bg-red-600 hover:bg-red-700 p-2 rounded-full transition-colors"
            >
              <Trash2 size={18} className="text-white" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favorites;
