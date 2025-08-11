import axios from "axios"
import * as cheerio from "cheerio"
import Movie from "./models/movie.js"

const BASE_URL = "https://agasobanuyelive.com";

export async function scrapeCategory(country = "India") {
    const url = `${BASE_URL}/movies?category=${country}`;
    const { data } = await axios.get(url);
    const $ = cheerio.load(data)

    const movies = [];
    $(".col-lg-2.col-md-3.col-sm-4.col-6").each((_, el) => {
        const title = $(el).find("h6").text().trim();
        const link = BASE_URL + $(el).find("a").attr("href")
        const image = $(el).find("img").attr("src")

        if (title && link) {
            movies.push({
                title,
                category: country,
                url: link,
                image
            });
        }
    });

    await saveMovies(movies);
    return movies;

}

async function saveMovies(movies) {
    for (const movie of movies) {
        try {
            await Movie.updateOne(
               { url: movie.url },
               { $setOnInsert: movie },
               { upsert: true }
            );
        } catch (err) {
            console.error(`Error saving movies: ${movie.title}`, err.message);
        }
    }
};

