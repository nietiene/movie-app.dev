import express from "express"
import mongoose from "mongoose"
import cron from "node-cron"
import Movie from "./models/movie.js"
import { scrapeCategory } from "./scraper.js"
import movie from "./models/movie.js"

const app = express()
const PORT = 5000;

mongoose.connect("mongodb+srv://mongoself:factorise@etiene.jjrlz2m.mongodb.net/movies", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("Mongo DB connected"))
.catch(err => console.error("MongoDB connection Error", err))

app.get('/movies', async (req, res) => {
    const { category } = req.query
    let movies;
    if (category) {
        movie = await movies.find({ category }).sort({ added_at: -1 });
    } else {
        movies = await Movie.find().sort({ added_at: -1 });
    }

    res.json(movies);
});

// manual scrape
app.get("/scrape", async (req, res) => {
    const category = req.query.category || "Indian";
    const movies = await scrapeCategory(category);
    res.json({ message: `Scraped ${movies.length} movies in ${category}`});
})

app.listen(PORT, () => console.log(`Server running http://localhost:${PORT}`))