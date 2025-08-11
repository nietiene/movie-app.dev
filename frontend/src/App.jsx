import React, { useEffect, useState } from "react"
import axios from "axios"
function App() {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
      axios.get("ttp://localhost:5000/api/movies/popular")
      .then(res => setMovies(res.data.results))
      .catch(err => console.error(err));
    }, [])

  return (

    <div className="max-w-7xl mx-auto p-6">
      <h1>Popular Movies</h1>

      <div>
        
      </div>
    </div>

  )
}

export default App
