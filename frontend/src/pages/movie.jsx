import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaSearch, FaArrowRight, FaArrowLeft } from "react-icons/fa";
import logo from "../assets/logo.png";

const categories = ["", "Action", "Comedy", "Horror", "Romance", "Drama"];

const Movie = () => {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState(""); 
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);

  // fetch movie based on category or search
  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const params = {};
        if (category) params.category = category;
        if (search) params.search = search;

        const res = await axios.get("http://localhost:5000/api/movies", { params });
        setMovies(res.data.results || []);
        setPage(0);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchMovies();
  }, [category, search]);

  const handleSearchChange = e => {
    setSearch(e.target.value);
  };

  // pagination logic: show only 10 movies at a time
  const moviesPerPage = 10;
  const paginatedMovies = movies.slice(page * moviesPerPage, (page + 1) * moviesPerPage);
  const totalPages = Math.ceil(movies.length / moviesPerPage);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-800">
      {/* Fixed Header */}
      <div className="sticky top-0 z-50 bg-gray-900 bg-opacity-90 backdrop-blur-md border-b border-gray-800 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center">
              <img 
                src={logo} 
                alt="MovieHub Logo" 
                className="h-10 w-auto object-contain hover:scale-105 transition-transform cursor-pointer"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              />
            </div>

            <div className="relative w-full md:w-1/2">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="text-gray-400" />
              </div>
              <input 
                type="search"
                value={search}
                onChange={handleSearchChange}
                placeholder="Search movies..."
                className="w-full pl-10 pr-4 py-2 rounded-xl bg-gray-800 bg-opacity-70 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>

            <select 
              value={category}
              onChange={e => setCategory(e.target.value)}
              className="px-4 py-2 rounded-xl bg-gray-800 bg-opacity-70 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWNoZXZyb24tZG93biI+PHBhdGggZD0ibTYgOSA2IDYgNi02Ii8+PC9zdmc+')] bg-no-repeat bg-[center_right_1rem]"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>
                  {cat || "All Categories"}
                </option>
              ))}
            </select>
          </div>

          {/* Category chips - scrollable on mobile */}
          <div className="mt-3 overflow-x-auto pb-2 hide-scrollbar">
            <div className="flex gap-2 w-max">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all flex-shrink-0 ${
                    category === cat 
                      ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md" 
                      : "bg-gray-800 bg-opacity-50 text-gray-300 hover:bg-gray-700 hover:text-white"
                  }`}
                >
                  {cat || "All"}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 pt-24"> {/* Added pt-24 to account for fixed header */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <>
            {/* Movies grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
              {paginatedMovies.map(movie => (
                <div 
                  key={movie.id}
                  onClick={() => navigate(`/movie/${movie.id}`)}
                  className="group cursor-pointer bg-gray-800 bg-opacity-60 rounded-lg sm:rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:scale-[1.03] border border-gray-700 backdrop-blur-sm"
                >
                  <div className="relative pt-[150%] overflow-hidden">
                    <img 
                      src={movie.poster_path 
                        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                        : 'https://via.placeholder.com/300x450?text=No+Poster'}
                      alt={movie.title}
                      className="absolute top-0 left-0 w-full h-full object-cover group-hover:opacity-80 transition-opacity"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/300x450?text=No+Poster';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4">
                      <p className="text-yellow-400 font-bold flex items-center text-sm sm:text-base">
                        ⭐ {movie.vote_average?.toFixed(1)}
                      </p>
                    </div>
                  </div>
                  
                  <div className="p-3 sm:p-4">
                    <h3 className="text-white font-semibold text-sm sm:text-base mb-1 truncate group-hover:text-blue-300 transition-colors">
                      {movie.title}
                    </h3>
                    <p className="text-gray-400 text-xs sm:text-sm">{movie.release_date?.split("-")[0]}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination controls */}
            {movies.length > moviesPerPage && (
              <div className="flex flex-col sm:flex-row justify-between items-center mt-8 gap-4">
                <button
                  onClick={() => setPage(prev => Math.max(prev - 1, 0))}
                  disabled={page === 0}
                  className={`flex items-center px-4 py-2 rounded-lg gap-2 w-full sm:w-auto justify-center ${
                    page === 0 
                      ? 'bg-gray-700 text-gray-500 cursor-not-allowed' 
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  <FaArrowLeft className="text-sm" />
                  Previous
                </button>
                
                <span className="text-gray-300 text-sm sm:text-base">
                  Page {page + 1} of {totalPages}
                </span>
                
                <button
                  onClick={() => setPage(prev => (prev + 1) % totalPages)}
                  disabled={page === totalPages - 1}
                  className={`flex items-center px-4 py-2 rounded-lg gap-2 w-full sm:w-auto justify-center ${
                    page === totalPages - 1 
                      ? 'bg-gray-700 text-gray-500 cursor-not-allowed' 
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  Next
                  <FaArrowRight className="text-sm" />
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Custom scrollbar hide for mobile */}
      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default Movie;