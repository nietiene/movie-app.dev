import React from "react"
import axios from "axios"
import Movie from "./pages/movie"
import MovieDetail from "./pages/MovieDetail"
import { BrowserRouter, Routes, Route } from "react-router-dom"

function App() {
  return (
   <BrowserRouter>
     <Routes>
      <Route path="/" element={<Movie />} />
      <Route path="/" element={<Movie />} />
     </Routes>
   </BrowserRouter>
  )
}

export default App
