import React from "react";

function Navbar() {
  return (
    <nav className="bg-gray-900 p-4 flex  justify-center">

      {/* Right side - Navigation Links */}
      <div>
        <a
          href="/"
          className="text-white font-medium hover:text-gray-200 transition-colors"
        >
          Home
        </a>
      </div>
    </nav>
  );
}

export default Navbar;
