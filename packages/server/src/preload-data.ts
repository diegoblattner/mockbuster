import type { Request } from "express";
import { accountId, homeCategories } from "shared";
import type { AppProps } from "webapp";
import { fetchMovie, fetchMoviesByGenre } from "./api-tmdb/movies.ts";
import { fetchWatchlist } from "./api-tmdb/watchlist.ts";

async function loadHomeData(_req: Request): Promise<AppProps> {
	const [movies, watchlist] = await Promise.all([
		fetchMoviesByGenre(homeCategories[0].id),
		fetchWatchlist(accountId),
	]);

	return {
		url: "/",
		actionMovies: movies?.results ?? [],
		watchlist: watchlist ?? {
			page: 1,
			results: [],
			total_pages: 0,
			total_results: 0,
		},
		selectedMovie: undefined,
	};
}

async function loadMovieDetailsData(req: Request): Promise<AppProps> {
	// TODO: route validation - use react-router????
	const movieId = req.baseUrl.split("/movies/")[1];
	const [movieDetails, watchlist] = await Promise.all([
		fetchMovie(movieId),
		fetchWatchlist(accountId),
	]);

	return {
		url: req.baseUrl,
		actionMovies: [],
		watchlist: watchlist ?? {
			page: 1,
			results: [],
			total_pages: 0,
			total_results: 0,
		},
		selectedMovie: movieDetails,
	};
}

export async function preloadData(req: Request): Promise<AppProps> {
	if (!req.baseUrl || req.baseUrl === "/") {
		return loadHomeData(req);
	} else if (req.baseUrl.startsWith("/movies/")) {
		return loadMovieDetailsData(req);
	}

	console.log("request unhandled:::: ", req.baseUrl);
	// TODO: route validation - use react-router????
	throw new Error("unhandled route path... possibly 404??");
}
