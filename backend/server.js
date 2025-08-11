import express from "express"
import mongoose from "mongoose"
import cron from "node-cron"
import Movie from "./models/movie.js"
import { scrapeCategory } from "./scraper.js"

const app = express()