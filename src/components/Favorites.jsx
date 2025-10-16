import React, { useEffect, useState } from "react";
import MovieCard from "./MovieCard";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);

  // Load favorites from localStorage when component mounts
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(saved);
  }, []);

  // Handle removing all favorites
  const handleClearFavorites = () => {
    localStorage.removeItem("favorites");
    setFavorites([]);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Your Favorites </h1>

        {favorites.length > 0 && (
          <button
            onClick={handleClearFavorites}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition"
          >
            Remove All
          </button>
        )}
      </div>

      {favorites.length === 0 ? (
        <p className="text-center text-gray-400">
          No favorite movies added yet.
        </p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {favorites.map(
            (movie) =>
              movie?.imdbID && <MovieCard key={movie.imdbID} movie={movie} />
          )}
        </div>
      )}
    </div>
  );
};

export default Favorites;
