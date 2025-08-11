import mongoose from "mongoose"

const movieSchema = new mongoose.Schema({
    title: String,
    category: String,
    url: { type: String, unique: true },
    image: String,
    added_at: { type: Date, default: Date.now }
});