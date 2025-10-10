import React, { useState } from "react";
import MovieCard from "./MovieCard";

const Search = () => {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();

    if (query.trim() === "") return;

    setLoading(true);
    setError("");
    setMovies([]);

    try {
      const response = await fetch(`https://www.omdbapi.com/?apikey=f5b3e9&s=${query}`);
      const data = await response.json();

      if (data.Response === "True") {
        setMovies(data.Search);
      } else {
        setError("No movies found. Try another title!");
      }
    } catch (err) {
      setError("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
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

      {/* Loading Spinner */}
      {loading && (
        <div className="flex justify-center items-center h-32">
          <div className="w-10 h-10 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
        </div>
      )}

      {/* Error Message */}
      {error && <p className="text-red-400 mt-4">{error}</p>}

      {/* Movie Grid */}
      {!loading && !error && movies.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-6">
          {movies.map((movie) => (
            <MovieCard key={movie.imdbID} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;
