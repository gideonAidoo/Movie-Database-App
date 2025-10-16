import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

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
          <h1 className="text-4xl font-bold mb-4">{movie.Title}</h1>
          <p className="text-gray-400 mb-2">Year: {movie.Year}</p>
          <p className="text-gray-400 mb-2">Genre: {movie.Genre}</p>
          <p className="text-gray-400 mb-2">Director: {movie.Director}</p>
          <p className="text-gray-400 mb-2">Actors: {movie.Actors}</p>
          <p className="text-gray-400 mb-2">IMDB Rating: {movie.imdbRating}</p>
          <h2 className=" mt-6 mb-2 text-gray-400">Summary</h2>
          <p className="text-gray-300 leading-relaxed">{movie.Plot}</p>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
