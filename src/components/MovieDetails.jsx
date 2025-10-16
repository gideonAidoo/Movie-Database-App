import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const res = await fetch(
          `https://www.omdbapi.com/?apikey=f5b3e9&i=${id}&plot=full`
        );
        const data = await res.json();
        setMovie(data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMovieDetails();
  }, [id]);

  if (loading)
    return (
      <p className="text-center mt-10 text-gray-400 text-lg animate-pulse">
        Loading movie details...
      </p>
    );

  if (!movie || movie.Response === "False")
    return (
      <p className="text-center mt-10 text-gray-400 text-lg">
        Movie not found.
      </p>
    );

  return (
    <div className="min-h-screen bg-gray-900 text-white px-6 py-10 sm:px-10 lg:px-20">
      {/* Back Button */}
      <Link
        to="/"
        className="text-yellow-400 hover:underline mb-8 inline-block text-lg"
      >
        ← Back to Movies
      </Link>

      {/* Movie Content */}
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-12">
        {/* Movie Poster */}
        <img
          src={
            movie.Poster !== "N/A"
              ? movie.Poster
              : "https://via.placeholder.com/400x600"
          }
          alt={movie.Title}
          className="w-64 sm:w-80 lg:w-96 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
        />

        {/* Movie Details */}
        <div className="flex-1">
          <h1 className="text-3xl sm:text-4xl font-bold text-white-400 mb-4">
            {movie.Title}
          </h1>

          <div className="text-gray-300 space-y-2">
            <p>
              <span className="font-semibold text-white">Year:</span>{" "}
              {movie.Year}
            </p>
            <p>
              <span className="font-semibold text-white">Genre:</span>{" "}
              {movie.Genre}
            </p>
            <p>
              <span className="font-semibold text-white">Director:</span>{" "}
              {movie.Director}
            </p>
            <p>
              <span className="font-semibold text-white">Actors:</span>{" "}
              {movie.Actors}
            </p>
           
            <p>
              <span className="font-semibold text-white">Rating:</span>{" "}
               {movie.imdbRating}
            </p>
          </div>

          <h2 className="text-2xl text-white-400 mt-8 mb-3">
            Summary
          </h2>
          <p className="text-gray-300 leading-relaxed">{movie.Plot}</p>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
