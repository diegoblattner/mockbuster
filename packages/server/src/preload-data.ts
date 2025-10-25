import type { Request } from "express";
import { type ApiMovieDetails, accountId, homePageCategories } from "shared";
import type { AppProps } from "webapp";
import { fetchMovie, fetchMoviesByGenre } from "./api-tmdb/movies.ts";
import { fetchWatchlist } from "./api-tmdb/watchlist.ts";

export async function preloadData(req: Request): Promise<AppProps> {
	const allCategories = homePageCategories.map((c) => fetchMoviesByGenre(c.id));

	// fetch all data at once
	let movieDetailsPromise = Promise.resolve<ApiMovieDetails | undefined>(
		undefined,
	);
	if (req.baseUrl.startsWith("/movies/")) {
		const movieId = req.baseUrl.split("/movies/")[1];
		const movieIdParsed = Number(movieId);
		if (!movieIdParsed || movieIdParsed <= 0) {
			throw new Error("Invalid movie id"); // TODO throw a 400 instead
		}
		movieDetailsPromise = fetchMovie(movieIdParsed);
	}

	const [movieDetails, watchlist, ...movies] = await Promise.all([
		movieDetailsPromise,
		fetchWatchlist(accountId),
		...allCategories,
	]);

	return {
		url: req.baseUrl,
		categories: homePageCategories.map((c, i) => ({
			...c,
			data: movies[i] ?? {
				page: 1,
				results: [],
			},
		})),
		watchlist: watchlist ?? {
			page: 1,
			results: [],
			total_pages: 0,
			total_results: 0,
		},
		selectedMovie: movieDetails,
	};
}
