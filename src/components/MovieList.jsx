import React from "react";
import MovieCard from "./MovieCard";

const MovieList = ({ movies }) => (
  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
    {movies.length > 0 ? (
      movies.map((movie) => <MovieCard key={movie.imdbID} movie={movie} />)
    ) : (
      <p className="text-center text-gray-400 col-span-full">No movies found.</p>
    )}
  </div>
);

export default MovieList;
