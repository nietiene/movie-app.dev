import express from "express";
import axios from "axios";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
    origin: "http://localhost:5173"
}))

const TMDB_API_KEY = process.env.TMDB_API_KEY;

// Fetch all popular movies from TMDB and forward to frontend

app.get('/api/movies', async (req, res) => {
    const { category, search } = req.query;
    try {
        let url, params;
        
        if (search) {
            url = `https://api.themoviedb.org/3/search/movie`;
            params = { api_key: TMDB_API_KEY, query: search, language: "en-US", page: 1};
        } else if (category) {
            // genre
            url = "https://api.themoviedb.org/3/discover/movie";
            params = {
                api_key: TMDB_API_KEY,
                language: "en-US",
                sort_by: "popularity.desc",
                page: 1,
                with_genres: mapCategoryToGenreId(category)
            };
        } else { 
            url = "https://api.themoviedb.org/3/movie/popular";
            params = { api_key: TMDB_API_KEY, language: "en-US", page: 1 };
        };

        const response = await axios.get(url, { params });

        res.json(response.data);
    } catch (error) { 
        console.error(error)
        res.status(500).json({ error: "Failed to fetch movies" });
    }
});

function mapCategoryToGenreId(cat) {
    const map = {
        Action: 28,
        Comedy: 35,
        Horror: 27,
        Romance: 10749,
        Drama: 18,
        Indian: 99
    };
    return map[cat] || "";
}

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})