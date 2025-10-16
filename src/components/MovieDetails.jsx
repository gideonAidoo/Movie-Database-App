import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);

  // Load movie details
  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await fetch(`https://www.omdbapi.com/?apikey=f5b3e9&i=${id}&plot=full`);
        const data = await res.json();
        setMovie(data);
        setLoading(false);

        //Check if it's already a favorite
        const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
        const alreadyFavorite = favorites.some((fav) => fav.imdbID === data.imdbID);
        setIsFavorite(alreadyFavorite);
      } catch (error) {
        console.error("Error fetching movie:", error);
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  // Add to favorites
  const handleAddFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    if (favorites.some((fav) => fav.imdbID === movie.imdbID)) {

      const updated = favorites.filter((fav) => fav.imdbID !== movie.imdbID);
      localStorage.setItem("favorites", JSON.stringify(updated));
      setIsFavorite(false);
    } else {
      // Add to favorites
      favorites.push(movie);
      localStorage.setItem("favorites", JSON.stringify(favorites));
      setIsFavorite(true);
    }
  };

  if (loading) return <p className="text-center mt-10 text-white">Loading...</p>;
  if (!movie || movie.Response === "False")
    return <p className="text-center mt-10 text-gray-400">Movie not found.</p>;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <Link to="/" className="text-yellow-400 underline mb-4 inline-block border-b border-yellow-400">
        ← Back to Home
      </Link>

      <div className="flex flex-col md:flex-row gap-6 items-center">
        <img
          src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/400"}
          alt={movie.Title}
          className="w-64 md:w-80 rounded-lg shadow-lg"
        />

        <div>
          <h1 className="text-4xl font-bold mb-4">{movie.Title}</h1>
          <p className="text-gray-400 mb-2">Year: {movie.Year}</p>
          <p className="text-gray-400 mb-2">Genre: {movie.Genre}</p>
          <p className="text-gray-400 mb-2">Director: {movie.Director}</p>
          <p className="text-gray-400 mb-4">Actors: {movie.Actors}</p>
          <p className="text-gray-300 mb-6">{movie.Plot}</p>

          <button
            onClick={handleAddFavorite}
            className={`px-6 py-2 rounded-lg font-semibold transition ${
              isFavorite
                ? "bg-yellow-500 text-black hover:bg-yellow-400"
                : "bg-gray-700 text-white hover:bg-yellow-500"
            }`}
          >
            {isFavorite ? "★ Remove from Favorites" : "☆ Add to Favorites"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
