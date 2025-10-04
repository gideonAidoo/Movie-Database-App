import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      const response = await fetch(`https://www.omdbapi.com/?apikey=f5b3e9&i=${id}&plot=full`);
      const data = await response.json();
      setMovie(data);
    };
    fetchMovieDetails();
  }, [id]);

  if (!movie) return <div className="text-center mt-20 text-white">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center py-10">
      <Link to="/" className="text-blue-400 mb-6 hover:underline">
        ← Back to Search
      </Link>

      <div className="bg-gray-800 rounded-lg shadow-lg flex flex-col md:flex-row max-w-4xl overflow-hidden">
        <img
          src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/400"}
          alt={movie.Title}
          className="w-full md:w-1/3 h-auto object-cover"
        />
        <div className="p-6 flex flex-col gap-3">
          <h1 className="text-3xl font-bold">{movie.Title}</h1>
          <p className="text-gray-400 italic">{movie.Genre}</p>
          <p><span className="font-semibold">Released:</span> {movie.Released}</p>
          <p><span className="font-semibold">Director:</span> {movie.Director}</p>
          <p><span className="font-semibold">Actors:</span> {movie.Actors}</p>
          <p><span className="font-semibold">IMDB Rating:</span> ⭐ {movie.imdbRating}</p>
          <p className="mt-4 text-gray-300">{movie.Plot}</p>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
