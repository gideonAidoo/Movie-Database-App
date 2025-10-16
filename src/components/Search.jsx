import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import MovieList from "../components/MovieList";

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
          : `https://www.omdbapi.com/?apikey=f5b3e9&s=popular`;
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
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">
        {query ? `Search Results for "${query}"` : "Popular Movies"}
      </h1>

      {loading ? (
        <p className="text-center text-gray-400">Loading movies...</p>
      ) : (
        <MovieList movies={movies} />
      )}
    </div>
  );
};

export default Home;
