import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Navbar from "./components/Navbar";
import Home from "./components/Search";
import MovieDetails from "./components/MovieDetails";
import Favorites from "./components/Favorites";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>

      {/* Toast container for notifications */}
      <ToastContainer position="top-center" autoClose={2000} theme="dark" />
    </Router>
  );
}

export default App;
