import express from "express"
import mongoose from "mongoose"
import cron from "node-cron"
import Movie from "./models/movie.js"
import { scrapeCategory } from "./scraper.js"

const app = express()
const PORT = 5000;

mongoose.connect("mongodb+srv://<db_username>:<db_password>@etiene.jjrlz2m.mongodb.net/?retryWrites=true&w=majority&appName=Etiene")