import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaSearch, FaArrowRight } from "react-icons/fa";
import logo from "../assets/logo.jpeg"
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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-800 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header with search and filter */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
          <div className="text-3xl font-bold text-white cursor-pointer select-none">
            Movie<span className="text-purple-400">Hub</span>
          </div>

          <div className="relative w-full md:w-1/2">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input 
              type="search"
              value={search}
              onChange={handleSearchChange}
              placeholder="Search movies..."
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-800 bg-opacity-70 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <select 
            value={category}
            onChange={e => setCategory(e.target.value)}
            className="px-4 py-2 rounded-lg bg-gray-800 bg-opacity-70 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>
                {cat || "All Categories"}
              </option>
            ))}
          </select>
        </div>

        {/* Category chips */}
        <div className="flex gap-3 mb-8 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                category === cat 
                  ? "bg-blue-600 text-white shadow-lg" 
                  : "bg-gray-800 bg-opacity-50 text-gray-300 hover:bg-gray-700"
              }`}
            >
              {cat || "All"}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
          </div>
        ) : (
          <>
            {/* Movies grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {paginatedMovies.map(movie => (
                <div 
                  key={movie.id}
                  onClick={() => navigate(`/movie/${movie.id}`)}
                  className="group cursor-pointer bg-gray-800 bg-opacity-60 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-gray-700 backdrop-blur-sm"
                >
                  <div className="relative pt-[150%] overflow-hidden">
                    <img 
                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
                      alt={movie.title}
                      className="absolute top-0 left-0 w-full h-full object-cover group-hover:opacity-80 transition-opacity"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                      <p className="text-yellow-400 font-bold flex items-center">
                        ⭐ {movie.vote_average?.toFixed(1)}
                      </p>
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <h3 className="text-white font-semibold mb-1 truncate">{movie.title}</h3>
                    <p className="text-gray-400 text-sm">{movie.release_date?.split("-")[0]}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination controls */}
            {movies.length > moviesPerPage && (
              <div className="flex justify-between items-center mt-8">
                <button
                  onClick={() => setPage(prev => Math.max(prev - 1, 0))}
                  disabled={page === 0}
                  className={`flex items-center px-4 py-2 rounded-lg ${page === 0 ? 'bg-gray-700 text-gray-500 cursor-not-allowed' : 'bg-purple-600 text-white hover:bg-purple-700'}`}
                >
                  Previous
                </button>
                
                <span className="text-gray-300">
                  Page {page + 1} of {totalPages}
                </span>
                
                <button
                  onClick={() => setPage(prev => (prev + 1) % totalPages)}
                  disabled={page === totalPages - 1}
                  className={`flex items-center px-4 py-2 rounded-lg ${page === totalPages - 1 ? 'bg-gray-700 text-gray-500 cursor-not-allowed' : 'bg-purple-600 text-white hover:bg-purple-700'}`}
                >
                  Next <FaArrowRight className="ml-2" />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Movie;