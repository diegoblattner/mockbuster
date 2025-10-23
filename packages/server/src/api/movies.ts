import express from "express";
import { fetchMoviesByGenre } from "../api-tmdb/movies.ts";
import { ClientSafeError, withErrorHandler } from "./common.ts";

const moviesRouter = express.Router();

moviesRouter.get(
	"/genres/:genreId/movies",
	withErrorHandler(async (req, res) => {
		const genreId = Number(req.params.genreId);

		if (!genreId) throw new ClientSafeError(400, "Invalid genreId");

		const result = await fetchMoviesByGenre(genreId);
		res.json(result);
	}),
);

export { moviesRouter };
