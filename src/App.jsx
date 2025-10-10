import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Search from "./components/Search";
import MovieDetails from "./components/MovieDetails";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer"; // ✅ added

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        {/* Navbar at top */}
        <Navbar />

        {/* Main content */}
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Search />} />
            <Route path="/movie/:id" element={<MovieDetails />} />
          </Routes>
        </div>

        {/* Footer at bottom */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
