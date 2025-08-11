import React from "react"
import axios from "axios"
import Movie from "./pages/movie"
import MovieDetail from "./pages/movieDetail"
import { BrowserRouter, Routes, Route } from "react-router-dom"

function App() {
  return (
   <BrowserRouter>
     <Routes>
      <Route path="/" element={<Movie />} />
      <Route path="/movie/:id" element={<MovieDetail />} />
     </Routes>
   </BrowserRouter>
  )
}

export default App
