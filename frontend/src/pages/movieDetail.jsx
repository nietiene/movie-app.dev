import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios"

export default function MovieDetail() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [movie, setMovie] = useState(null);
    const [videoKey, setVideoKey] = useState(null);

    useEffect(() => {
        //fetch movie details
        axios.get(`https://api.themoviedb.org/3/movie/${id}`, {
            params: { api_key: "37b186e022267bd499bb77313a4cd229"}
        }).then(res => setMovie(res.data))
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
            
        </button>
    </div>
)

}

