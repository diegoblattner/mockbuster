import express from "express";
import { addToWatchlist, fetchWatchlist } from "../api-tmdb/watchlist.ts";
import { ClientSafeError, withErrorHandler } from "./common.ts";

// TODO should come from the logged user
const accountId = 1234;

const watchlistRouter = express.Router();

watchlistRouter.get(
	"/watchlist",
	withErrorHandler(async (_req, res) => {
		const result = await fetchWatchlist(accountId);
		res.json(result);
	}),
);

watchlistRouter.post(
	"/watchlist/movies/:movieId/:add",
	withErrorHandler(async (req, res) => {
		const movieId = Number(req.params.movieId);
		const addOrRemove = req.params.add?.toLowerCase() === "true";

		if (!movieId) throw new ClientSafeError(400, "Invalid movieId");

		const result = await addToWatchlist(accountId, {
			media_id: movieId,
			media_type: "movie",
			watchlist: addOrRemove,
		});

		res.json(result);
	}),
);

export { watchlistRouter };
