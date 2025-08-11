import axios from "axios"
import * as cheerio from "cheerio"
import Movie from "./models/movie.js"

const BASE_URL = "https://oshakurfilms.com";

export async function scrapeCategory(category = "Indian") {
    const url = `${BASE_URL}/movies?category=${category}`;
    const { data } = await axios.get(url);
    const $ = cheerio.load(data)

    const movies = [];
    $(".col-lg-2.col-md-3.col-sm-4.col-6").each((_, el) => {
        const title = $(el).find("h6").text().trim();
        const link = BASE_URL + $(el).find("a").attr("href")
        const image = $(el).find("img").attr("src")

        if (title && link) {
            movie.push({
                title,
                category,
                url: link,
                image
            });
        }
    });

    await saveMovies(movies);

}

async function saveMovies(movies) {
    for (const movie of movies)
    { url: movie.url },
    { $setOnInsert: movie },
    { upsert: true }
};
