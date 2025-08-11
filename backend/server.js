import express from "express";
import axios from "axios";
import cors from "cors";

const app = express();
const PORT = 5000;

app.use(cors())

const TMDB_API_KEY = "37b186e022267bd499bb77313a4cd229";

// Fetch all popular movies from TMDB and forward to frontend