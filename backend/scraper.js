import axios from "axios"
import * as cheerio from "cheerio"
import Movie from "./models/movie.js"

const BASE_URL = "https://agasobanuyelive.com";

export async function scrapeCategory(country = "India") {
    console.log(`Starting scrape for category: ${country}`);
    const url = `${BASE_URL}/category/country/${country.toLowerCase()}/`;
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
                country,
                url: link,
                image
            });
        }
    });

     console.log(`Scrape done for category: ${country}, found movies: ${movies.length}`);

    await saveMovies(movies);
    return movies;

}

async function saveMovies(movies) {
    for (const movie of movies) {
        try {
            console.log(`Saving movie: ${movie.title}`);
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

