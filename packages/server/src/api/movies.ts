import express from "express";
import {
	fetchMoviesByGenre,
	fetchRecommendations,
} from "../api-tmdb/movies.ts";
import { ClientSafeError, withErrorHandler } from "./common.ts";

const moviesRouter = express.Router();

moviesRouter.get(
	"/genres/:genreId/movies",
	withErrorHandler(async (req, res) => {
		const genreId = Number(req.params.genreId);

		if (!genreId || genreId < 0)
			throw new ClientSafeError(400, "Invalid genreId");

		const result = await fetchMoviesByGenre(genreId);
		res.json(result);
	}),
);

moviesRouter.get(
	"/movies/:movieId/recommendations",
	withErrorHandler(async (req, res) => {
		const movieId = Number(req.params.movieId);

		if (!movieId || movieId < 0)
			throw new ClientSafeError(400, "Invalid genreId");

		const result = await fetchRecommendations(movieId);
		res.json(result);
	}),
);

export { moviesRouter };
