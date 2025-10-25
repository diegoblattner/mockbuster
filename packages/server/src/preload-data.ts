import type { Request } from "express";
import { AppRoutes, accountId, homePageCategories } from "shared";
import type { AppProps } from "webapp";
import { fetchMovie, fetchMoviesByGenre } from "./api-tmdb/movies.ts";
import { fetchWatchlist } from "./api-tmdb/watchlist.ts";

async function loadHomeData(_req: Request): Promise<AppProps> {
	const allCategories = homePageCategories.map((c) => fetchMoviesByGenre(c.id));
	const [watchlist, ...movies] = await Promise.all([
		fetchWatchlist(accountId),
		...allCategories,
	]);

	return {
		url: "/",
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
		categories: [],
		watchlist: watchlist ?? {
			page: 1,
			results: [],
			total_pages: 0,
			total_results: 0,
		},
		selectedMovie: movieDetails,
	};
}

async function loadWatchlistData(req: Request): Promise<AppProps> {
	const watchlist = await fetchWatchlist(accountId);

	return {
		url: req.baseUrl,
		categories: [],
		watchlist: watchlist ?? {
			page: 1,
			results: [],
			total_pages: 0,
			total_results: 0,
		},
		selectedMovie: undefined,
	};
}

export async function preloadData(req: Request): Promise<AppProps> {
	if (!req.baseUrl || req.baseUrl === AppRoutes.Home) {
		return loadHomeData(req);
	} else if (req.baseUrl.startsWith("/movies/")) {
		return loadMovieDetailsData(req);
	} else if (req.baseUrl === AppRoutes.Watchlist) {
		return loadWatchlistData(req);
	}

	console.log("request unhandled:::: ", req.baseUrl);
	// TODO: route validation - use react-router????
	throw new Error("unhandled route path... possibly 404??");
}
