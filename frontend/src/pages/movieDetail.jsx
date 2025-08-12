import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios"

export default function MovieDetail() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [movie, setMovie] = useState(null);
    const [videoKey, setVideoKey] = useState(null);
    const [imdbId, setImdbId] = useState(null)

    useEffect(() => {
        //fetch movie details
        axios.get(`https://api.themoviedb.org/3/movie/${id}`, {
            params: { api_key: "37b186e022267bd499bb77313a4cd229"}
        }).then(res => {
            setMovie(res.data);
            setImdbId(res.data.imdbId);
    })
        .catch(() => navigate("/"))

    axios.get(`https://api.themoviedb.org/3/movie/${id}/videos`, {
        params: { api_key: "37b186e022267bd499bb77313a4cd229" }
    }).then(res => {
        const trailer = res.data.results.find(v => v.site === "YouTube" && v.type === "Trailer");
        if (trailer) setVideoKey(trailer.key);
    }) 
}, [id, navigate])

if (!movie) return <div className="p-6 text-center">Loading...</div>

const fullMovieUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(movie.title + " full movie")}`

return (
    <div className="max-w-4xl mx-auto p-6">
        <button className="mb-4 text-blue-600 underline"
          onClick={() => navigate(-1)}
        >
          ← Back to list 
        </button>

        <h1 className="text-3xl font-bold mb-6">{movie.title}</h1>
        {videoKey ? (
            <div className="aspect-video mb-6 rounded-lg overfolw-hidden shadow-lg">
                <iframe
                  src={`https://www.youtube.com/embed/${videoKey}?autoplay=1`}
                  title="trailer"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                  width="100%"
                  height="100%"
                ></iframe>
            </div>
        ): (
            <p>No trailer available.</p>
        )}

        <a href={fullMovieUrl}
           target="_blank"
           rel="nooper norefreer"
           className="inline-block bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded font-semibold transition"
        >
            ▶ Watch Full Video
        </a>
    </div>
)

}
