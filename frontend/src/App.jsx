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

  )
}

export default App
