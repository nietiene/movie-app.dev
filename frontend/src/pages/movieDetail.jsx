import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios"
import { FaArrowLeft, FaPlay, FaImdb, FaYoutube, FaSearch} from "react-icons/fa"
import { SiJustwatch } from "react-icons/si"
import { MdLocalMovies } from "react-icons/md"

export default function MovieDetail() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [movie, setMovie] = useState(null);
    const [videoKey, setVideoKey] = useState(null);
    const [imdbId, setImdbId] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(true);
        //fetch movie details
        axios.get(`https://api.themoviedb.org/3/movie/${id}`, {
            params: { api_key: "37b186e022267bd499bb77313a4cd229"}
        }).then(res => {
            setMovie(res.data);
            setImdbId(res.data.imdb_id);
    })
        .catch(() => navigate("/"));

    axios.get(`https://api.themoviedb.org/3/movie/${id}/videos`, {
        params: { api_key: "37b186e022267bd499bb77313a4cd229" }
    }).then(res => {
        const trailer = res.data.results.find(v => v.site === "YouTube" && v.type === "Trailer");
        if (trailer) setVideoKey(trailer.key);
    }) 
}, [id, navigate]);

if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full"></div>
    </div>
)

if (!movie) return <div className="p-6 text-center">Loading...</div>

const streamingOptions = [
    {
        name: "JustWatch",
        url: `https://www.justwatch.com/us/search?q=${encodeURIComponent(movie.title)}`
    },
    {
        name: "IMDb",
        url: imdbId ? `https://www.imdb.com/title/${imdbId}/`: null
    },
    {
        name: "YouTube",
        url: `https://www.youtube.com/results?search_query=${encodeURIComponent(movie.title + " full movie")}`
    }
].filter(option => option.url);

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

   <div
    className="mt-4">
        <h3 className="flex-xl font-semibold mb-2">Watch full movie on:</h3>
        <div className="flex gap-3">
            {streamingOptions.map((option, index) => (
                <a 
                 href={option.url}
                 key={index}
                 target="_blank"
                 rel="noopener noreferrer"
                 className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-medium transition"
                >
                    {option.name}
                </a>
            ))}
        </div>
    </div>
    </div>
)

}
