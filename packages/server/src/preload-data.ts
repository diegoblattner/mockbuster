import type { Request } from "express";
import type { AppProps } from "webapp";
import { fetchMovie, fetchMoviesByGenre } from "./api-tmdb/movies.ts";

async function loadHomeData(req: Request): Promise<AppProps> {
	const movies = await fetchMoviesByGenre(28);

	return {
		url: "/",
		initialMovies: movies?.results ?? [],
		selectedMovie: undefined,
	};
}

async function loadMovieDetailsData(req: Request): Promise<AppProps> {
	// TODO: route validation - use react-router????
	const movieId = req.baseUrl.split("/movies/")[1];
	const movieDetails = await fetchMovie(movieId);

	return {
		url: req.baseUrl,
		initialMovies: [],
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
