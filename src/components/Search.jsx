import React, { useState } from "react";

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
      <h1 className="text-4xl font-bold mb-6"> Movie Database</h1>

      {/* Search Form */}
      <form onSubmit={handleSearch} className="flex w-full max-w-md mb-8">
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

      {/* Results */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 w-full max-w-6xl px-5">
        {movies.map((movie) => (
          <div
            key={movie.imdbID}
            className="bg-gray-800 rounded-lg shadow-md overflow-hidden hover:scale-105 transition-transform"
          >
            <img
              src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/300"}
              alt={movie.Title}
              className="w-full h-80 object-cover"
            />
            <div className="p-3 text-center">
              <h2 className="font-semibold">{movie.Title}</h2>
              <p className="text-gray-400">{movie.Year}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;
