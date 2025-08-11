import express from "express"
import mongoose from "mongoose"
import cron from "node-cron"
import Movie from "./models/movie.js"
import { scrapeCategory } from "./scraper.js"

const app = express()
const PORT = 5000;

mongoose.connect("mongodb+srv://mongoself:factorise@etiene.jjrlz2m.mongodb.net/movies", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("Mongo DB connected"))
.catch(err => console.error("MongoDB connection Error", err))


app.listen(PORT, () => console.log(`Server running http://localhost:${PORT}`))