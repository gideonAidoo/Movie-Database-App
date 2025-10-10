import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const MovieDetails = () => {
  const { id } = useParams(); // Get IMDb ID from URL
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      const res = await fetch(`https://www.omdbapi.com/?apikey=f5b3e9&i=${id}&plot=full`);
      const data = await res.json();
      setMovie(data);
    };
    fetchMovieDetails();
  }, [id]);

  if (!movie) return <div className="text-center text-white mt-10">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center py-10">
      <Link to="/" className="text-blue-500 mb-6 underline">← Back to Search</Link>

      <div className="flex flex-col md:flex-row bg-gray-800 rounded-lg shadow-lg overflow-hidden max-w-4xl">
        <img
          src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/400"}
          alt={movie.Title}
          className="w-full md:w-1/3 object-cover"
        />
        <div className="p-6 md:w-2/3">
          <h2 className="text-3xl font-bold mb-2">{movie.Title}</h2>
          <p className="text-gray-400 mb-2">{movie.Year} • {movie.Genre}</p>
          <p className="mb-3"><strong>Director:</strong> {movie.Director}</p>
          <p className="mb-3"><strong>Actors:</strong> {movie.Actors}</p>
          <p className="mb-3"><strong>IMDB Rating:</strong> ⭐ {movie.imdbRating}</p>
          <p className="text-gray-300 mt-4">{movie.Plot}</p>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
