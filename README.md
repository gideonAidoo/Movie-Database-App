FirstMan Movies

A modern and responsive movie search web app built with React.js and the OMDb API, allowing users to explore movies, view detailed information, and save their favorites with a sleek UI.


Features

1. Search Functionality — Find movies instantly by title.
2. Movie Details Page — View full plot, cast, genre, and release year.
3. Favorites System — Add or remove movies from your favorites list.
4  Persistent Storage — Favorites are saved using localStorage.
5  Toast Notifications — Beautiful alerts when movies are liked/unliked.
6. Responsive UI — Works perfectly across all devices.
7.  Dark Mode Design — Stylish layout with modern hover effects.


 Tech Stack

React.js (Vite)

React Router DOM

Tailwind CSS

OMDb API (https://www.omdbapi.com)

Local Storage


⚙️ Installation & Setup

Follow these steps to run the project locally:

# Clone the repository
git clone https://github.com/yourusername/firstman-movies.git

# Navigate into the project directory
cd firstman-movies

# Install dependencies
npm install

# Start the development server
npm run dev


Then visit http://localhost:5173/ in your browser.


Folder Structure
src/
│
├── assets/
│   └── images/
│       └── logo.png
│
├── components/
│   └── MovieCard.jsx
│   └── Navbar.jsx
│
├── context/
│   └── FavoritesContext.jsx
│
├── pages/
│   └── Home.jsx
│   └── Favorites.jsx
│   └── MovieDetails.jsx
│
├── App.jsx
└── main.jsx


 How It Works

The user searches for a movie using the search bar in the Navbar.

The app fetches results from the OMDb API.

Each movie card can be clicked to view movie details.

The user can like or remove a movie from favorites.

All favorites are stored in localStorage for persistence.



