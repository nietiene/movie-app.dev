import React, { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom";
const categories = ["", "Action", "Comedy", "Horror", "Romance", "Drama"];

const  Movie = () => {
const [movies, setMovies] = useState([]);
const navigate = useNavigate();
const [search, setSearch] = useState("");
const [category, setCategory] = useState(""); 
const [page, setPage] = useState(0) // for pagnation

// fetch movie based on category or search
 useEffect(() => {
 const fetchMovies = async () => {
    try {
        const params = {};
        if (category) params.category = category;
        if (search) params.search = search;

        const res = await axios.get("http://localhost:5000/api/movies", { params })
            setMovies(res.data.results || [])
            setPage(0)
    } catch (err) {
        console.error(err);
    }
 };
 
 fetchMovies();
}, [category, search])

const handleSearchChange = e => {
    setSearch(e.target.value)
}


// pagnation logic: show only 8 movies (two row of 4) at a time
const moviePage = 10;
const pagnatatedMovies = movies.slice(page * moviePage, (page + 1) * moviePage);

    return (
        
    <div className="max-w-7xl mx-auto p-6">
        <div className="flex items-center justify-between mb-8">
            <div className="text-2xl font-bold cursor-pointer select-none">
                MyLogo
            </div>

            <input type="search"
               value={search}
               onChange={handleSearchChange}
               placeholder="Search movies..."
               className="border rounded px-3 py-2 w-1/2 max-w-md"
            />

            <select 
              value={category}
              onChange={e => setCategory(e.target.value)}
              className="border rounded px-3 py-2 max-w-xs"
            >
                {categories.map(cat => (
                        <option key={cat} value={cat}>
                          {cat || "All Categorie"}
                        </option>
                    ))
                }
            </select>
        </div>

{/* categories at the top */}
<div className="flex gap-4 mb-6 flex-wrap">
  {categories.map((cat) => (
    <button
      key={cat}
      onClick={() => setCategory(cat)}
      className={`px-4 py-2 rounded ${
        category === cat ? "bg-blue-500 text-white" : "bg-gray-200"
      }`}
    >
      {cat || "All"}
    </button>
  ))}
</div>
  {/* movies gird */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {pagnatatedMovies.map(movie => (
          <div key={movie.id}
             onClick={() => navigate(`/movie/${movie.id}`)}
              className="cursor-poiner bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-xl transition-shadow duration-300">
             <img src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`} alt={movie.title}
                className="w-full h-[400px] object-cover" 
             />

            <div className="p-4">
              <h3 className="text-lg font-semibold mb-1">{movie.title}</h3>
              <p className="text-sm text-gray-500 mb-2">Release: {movie.release_date}</p>
              <p className="text-yellow-500 font-bold">⭐ {movie.vote_average}</p>
            </div>
          </div>
        ))}
      </div>

      {/* next button */}
      {movies.length > moviePage && (
        <div className="flex justify-end mt-4">
          <button
           onClick={() => setPage(prev => (prev + 1) % Math.ceil(movies.length / moviePage))}
           className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Next ➡

          </button>
        </div>
      )}
    </div>

)
}

export default Movie