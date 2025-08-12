import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaArrowLeft, FaPlay, FaImdb, FaYoutube, FaSearch, FaFilm } from "react-icons/fa";
import { MdLocalMovies } from "react-icons/md";

export default function MovieDetail() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [movie, setMovie] = useState(null);
    const [videoKey, setVideoKey] = useState(null);
    const [imdbId, setImdbId] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        axios.get(`https://api.themoviedb.org/3/movie/${id}`, {
            params: { api_key: import.meta.env.Api_KEY }
        }).then(res => {
            setMovie(res.data);
            setImdbId(res.data.imdb_id);
        })
        .catch(() => navigate("/"));

        axios.get(`https://api.themoviedb.org/3/movie/${id}/videos`, {
            params: { api_key: import.meta.env.Api_KEY }
        }).then(res => {
            const trailer = res.data.results.find(v => v.site === "YouTube" && v.type === "Trailer");
            if (trailer) setVideoKey(trailer.key);
        })
        .finally(() => setLoading(false));
    }, [id, navigate]);

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-blue-900 to-gray-800">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
    );

    if (!movie) return <div className="p-6 text-center bg-gradient-to-br from-gray-900 via-blue-900 to-gray-800">Loading...</div>;

    const streamingOptions = [
        {
            name: "JustWatch",
            url: `https://www.justwatch.com/us/search?q=${encodeURIComponent(movie.title)}`,
            color: "bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900",
            icon: <FaFilm className="mr-2" />
        },
        {
            name: "IMDb",
            url: imdbId ? `https://www.imdb.com/title/${imdbId}/` : null,
            color: "bg-gradient-to-r from-yellow-500 to-yellow-700 hover:from-yellow-600 hover:to-yellow-800",
            icon: <FaImdb className="mr-2" />
        },
        {
            name: "YouTube",
            url: `https://www.youtube.com/results?search_query=${encodeURIComponent(movie.title + " full movie")}`,
            color: "bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900",
            icon: <FaYoutube className="mr-2" />
        },
        {
            name: "Search",
            url: `https://www.google.com/search?q=${encodeURIComponent(movie.title + " watch online")}`,
            color: "bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800",
            icon: <FaSearch className="mr-2" />
        }
    ].filter(option => option.url);

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-800 p-4 sm:p-6">
            <div className="max-w-6xl mx-auto">
                <button 
                    onClick={() => navigate(-1)}
                    className="mb-6 flex items-center text-blue-300 hover:text-blue-200 transition-colors group"
                >
                    <FaArrowLeft className="mr-2 transition-transform group-hover:-translate-x-1" />
                    <span className="group-hover:underline">Back to Movies</span>
                </button>

                <div className="bg-gray-800 bg-opacity-70 backdrop-blur-sm rounded-xl p-6 shadow-2xl mb-6 border border-gray-700">
                    <div className="flex flex-col md:flex-row gap-6">
                        {videoKey && (
                            <div className="md:w-2/3">
                                <div className="aspect-video rounded-xl overflow-hidden shadow-lg">
                                    <iframe
                                        src={`https://www.youtube.com/embed/${videoKey}?autoplay=1`}
                                        title="trailer"
                                        allow="autoplay; encrypted-media"
                                        allowFullScreen
                                        className="w-full h-full"
                                    ></iframe>
                                </div>
                            </div>
                        )}
                        
                        <div className={`${videoKey ? 'md:w-1/3' : 'w-full'}`}>
                            <h1 className="text-3xl md:text-4xl font-bold mb-2 flex items-center">
                                <MdLocalMovies className="mr-3 text-blue-400" />
                                {movie.title}
                                <span className="ml-4 text-yellow-300 text-xl">
                                    ({movie.vote_average?.toFixed(1)}/10)
                                </span>
                            </h1>
                            
                            <p className="text-gray-300 mb-4">{movie.overview}</p>
                            
                            <div className="flex flex-wrap gap-2 mb-4">
                                {movie.genres?.map(genre => (
                                    <span key={genre.id} className="px-3 py-1 bg-blue-900 bg-opacity-50 rounded-full text-sm">
                                        {genre.name}
                                    </span>
                                ))}
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                                <div>
                                    <h4 className="font-semibold text-blue-300">Release Date</h4>
                                    <p className="text-gray-200">{new Date(movie.release_date).toLocaleDateString()}</p>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-blue-300">Runtime</h4>
                                    <p className="text-gray-200">{Math.floor(movie.runtime/60)}h {movie.runtime%60}m</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-gray-800 bg-opacity-70 backdrop-blur-sm rounded-xl p-6 shadow-2xl mb-6 border border-gray-700">
                    <h3 className="text-2xl font-semibold mb-6 flex items-center text-white">
                        <FaPlay className="mr-3 text-red-400" />
                        Where to Watch
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {streamingOptions.map((option, index) => (
                            <a
                                href={option.url}
                                key={index}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`${option.color} text-white px-4 py-3 rounded-lg font-medium transition-all flex items-center justify-center hover:scale-105 transform shadow-lg hover:shadow-xl`}
                            >
                                {option.icon}
                                {option.name}
                            </a>
                        ))}
                    </div>
                </div>

                {movie.tagline && (
                    <div className="text-center italic text-gray-300 text-lg mb-6">
                        "{movie.tagline}"
                    </div>
                )}
            </div>
        </div>
    );
}