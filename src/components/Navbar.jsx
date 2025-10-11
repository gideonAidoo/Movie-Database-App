import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import logo from "../assets/images/logo.png";

const Navbar = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim() === "") return;

    navigate(`/?q=${query}`);
    setQuery("");
  };

  return (
    <nav className="bg-gray-900 text-white shadow-md py-4 sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between px-6 flex-wrap gap-4">
        {/* Left Section - Logo */}
        <Link to="/" className="flex items-center space-x-3">
          <img src={logo} alt="Logo" className="w-20 h-20 rounded-full" />
          <h1 className="text-2xl font-bold text-yellow-400">First<span className="text-slate-400">Man</span> Movies</h1>
        </Link>

        {/* Middle Section - Search Bar */}
        <form
          onSubmit={handleSearch}
          className="relative flex-1 max-w-2xl mx-4"
        >
          <input
            type="text"
            placeholder="Search for a movie..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-4 pr-10 py-2 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 transition"
          />
          {/* Search icon on the right inside the input */}
          <button
            type="submit"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-yellow-400 hover:text-yellow-500"
          >
            <FiSearch size={20} />
          </button>
        </form>

        {/* Right Section - Nav Links */}
        <div className="flex space-x-6">
          <Link
            to="/"
            className="hover:text-yellow-400 transition-colors duration-200"
          >
            Home
          </Link>
          <Link
            to="/favorites"
            className="hover:text-yellow-400 transition-colors duration-200"
          >
            Favorites ⭐
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
