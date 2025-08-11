import React, { useEffect, useState } from "react"
import axios from "axios"

const  Movie = () => {
    return (
        
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-8 text-center">Popular Movies</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {movies.map(movie => (
          <div key={movie.id}
           className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-xl transition-shadow duration-300">
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
    </div>

)
}