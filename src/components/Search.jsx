import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import MovieCard from "../components/MovieCard";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("q");

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const url = query
          ? `https://www.omdbapi.com/?apikey=f5b3e9&s=${query}`
          : `https://www.omdbapi.com/?apikey=f5b3e9&s=batman`; // Default
        const res = await fetch(url);
        const data = await res.json();
        setMovies(data.Search || []);
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, [query]);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 sm:p-10">
      <h1 className="text-3xl sm:text-4xl font-bold mb-8 text-center text-yellow-400">
        {query ? `Search Results for "${query}"` : "Popular Movies 🎥"}
      </h1>

      {loading && (
        <p className="text-center text-gray-400 text-lg animate-pulse">
          Loading movies...
        </p>
      )}

      {!loading && movies.length === 0 && (
        <p className="text-center text-gray-400 text-lg">
          No movies found. Try searching for something else!
        </p>
      )}

      {/* Responsive Movie Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {movies.map((movie) => (
          <MovieCard key={movie.imdbID} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default Home;
