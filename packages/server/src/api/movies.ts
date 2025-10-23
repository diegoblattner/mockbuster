import type { Router } from "express";
import { fetchMoviesByGenre } from "../api-tmdb/movies.ts";

export function registerMoviesHandlers(router: Router) {
	router.get("/movies", async (req, res) => {
		try {
			const result = await fetchMoviesByGenre(28);

			res.json(result);
		} catch (e) {
			// unhandled error
			console.error(e);
			res.status(500).json({ error: "Failed to fetch movies..." });
		}
	});
}
