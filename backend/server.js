import express from "express";
import axios from "axios";
import cors from "cors";

const app = express();
const PORT = 5000;

app.use(cors())

const TMDB_API_KEY = "37b186e022267bd499bb77313a4cd229";

// Fetch all popular movies from TMDB and forward to frontend

app.get('/api/movies/popular', async (req, res) => {
    try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/popular`, {
            params: {
                api_key: TMDB_API_KEY,
                language: "en-US",
                page: 1
            }
        });
        res.json(response.data);
    } catch (error) { 
        res.status(500).json({ error: "Failed to fetch movies" });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})