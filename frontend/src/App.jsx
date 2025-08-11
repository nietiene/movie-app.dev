import React, { useEffect, useState } from "react"
import axios from "axios"
function App() {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
      axios.get("http://localhost:5000/api/movies/popular")
      .then(res => setMovies(res.data.results))
      .catch(err => console.error(err));
    }, [])

  return (

    <div className="max-w-7xl mx-auto p-6">
      <h1>Popular Movies</h1>

      <div>
        {movies.map(movie => (
          <div key={movie.id}>
            <img src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`} alt={movie.title}
              className="w-full h-[400px] object-cover" 
            />

            <div>
              <h3>{movie.title}</h3>
              <p>Release: {movie.release_date}</p>
              <p>Release: {movie.release_date}</p>
              <p>⭐ {movie.vote_average}</p>
            </div>
          </div>
        ))}
      </div>
    </div>

  )
}

export default App
