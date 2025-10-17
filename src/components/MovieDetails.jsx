import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useFavorites } from "../context/context/FavoritesContext";
import { Heart } from "lucide-react";
import { toast } from "react-toastify";

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  // Favorite context
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const res = await fetch(`https://www.omdbapi.com/?apikey=f5b3e9&i=${id}&plot=full`);
        const data = await res.json();
        setMovie(data);
      } catch (error) {
        console.error("Error fetching movie:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMovieDetails();
  }, [id]);

  if (loading) return <p className="text-center mt-10 text-gray-400">Loading...</p>;
  if (!movie || movie.Response === "False")
    return <p className="text-center mt-10 text-gray-400">Movie not found.</p>;

  const favorite = isFavorite(movie.imdbID);

  const handleFavoriteClick = () => {
    if (favorite) {
      removeFavorite(movie.imdbID);
      toast.info(`${movie.Title} removed from favorites`);
    } else {
      addFavorite(movie);
      toast.success(`${movie.Title} added to favorites`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <Link to="/" className="text-yellow-400 hover:underline mb-6 inline-block">
        ← Back to Movies
      </Link>

      <div className="flex flex-col md:flex-row gap-6 items-center">
        <img
          src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/400"}
          alt={movie.Title}
          className="w-64 md:w-80 rounded-lg shadow-lg"
        />

        <div>
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-4xl font-bold">{movie.Title}</h1>

            <button
              onClick={handleFavoriteClick}
              className={`p-3 rounded-full transition-all ${
                favorite ? "bg-red-500" : "bg-gray-700 hover:bg-red-500"
              }`}
            >
              <Heart
                size={24}
                className={`${favorite ? "fill-white text-white" : "text-white"}`}
              />
            </button>
          </div>

         <div className="mt-6 space-y-2 text-gray-500">
  <p>
    <span className="font-semibold text-white">Year:</span> {movie.Year}
  </p>
  <p>
    <span className="font-semibold text-white">Genre:</span> {movie.Genre}
  </p>
  <p>
    <span className="font-semibold text-white">Director:</span> {movie.Director}
  </p>
  <p>
    <span className="font-semibold text-white">Actors:</span> {movie.Actors}
  </p>
  <p>
    <span className="font-semibold text-white">Runtime:</span> {movie.Runtime}
  </p>
  <p>
    <span className="font-semibold text-white">IMDB Rating:</span> ⭐ {movie.imdbRating}
  </p>
</div>

{/* Movie Summary */}
<p className="text-gray-500 mt-4 leading-relaxed">
  <span className="font-semibold text-white">Summary:</span> {movie.Plot}
</p>

        </div>
      </div>
    </div>
  );
}

export default MovieDetails;
