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
      let url = query
        ? `https://www.omdbapi.com/?apikey=f5b3e9&s=${query}`
        : `https://www.omdbapi.com/?apikey=f5b3e9&s=batman`; // default movie list
      const res = await fetch(url);
      const data = await res.json();
      setMovies(data.Search || []);
      setLoading(false);
    };
    fetchMovies();
  }, [query]);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">
        {query ? `Search Results for "${query}"` : "Popular Movies"}
      </h1>

      {loading && <p className="text-center">Loading...</p>}

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {movies.map((movie) => (
          <MovieCard key={movie.imdbID} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default Home;
