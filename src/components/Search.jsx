import React, { useState } from "react";
import MovieCard from "./MovieCard";

const Search = () => {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (query.trim() === "") return;

    const response = await fetch(`https://www.omdbapi.com/?apikey=f5b3e9&s=${query}`);
    const data = await response.json();

    if (data.Search) {
      setMovies(data.Search);
    } else {
      setMovies([]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center py-10">
      <h1 className="text-4xl font-bold mb-6">Movie Database</h1>

      <form onSubmit={handleSearch} className="flex w-full max-w-lg mb-8">
        <input
          type="text"
          placeholder="Search for a movie..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 p-3 rounded-l-md text-black focus:outline-none"
        />
        <button
          type="submit"
          className="bg-blue-600 px-5 rounded-r-md hover:bg-blue-700 transition"
        >
          Search
        </button>
      </form>

      {/* Display movies */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-6">
        {movies.map((movie) => (
          <MovieCard key={movie.imdbID} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default Search;
