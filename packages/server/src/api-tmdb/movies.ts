import {
	type ApiListResult,
	type ApiMovie,
	type ApiMovieDetails,
	language,
} from "shared";
import { fetchTmdbApi } from "./common.ts";

export async function fetchMoviesByGenre(genreId: number, page: number = 1) {
	const params = new URLSearchParams({
		include_adult: "false",
		with_genres: genreId.toString(),
		language,
		page: page.toString(),
	});

	const { data } = await fetchTmdbApi<ApiListResult<ApiMovie>>(
		"GET",
		"/discover/movie",
		params,
	);

	return data;
}

export async function fetchMovie(movieId: number | string) {
	const { data } = await fetchTmdbApi<ApiMovieDetails>(
		"GET",
		`/movie/${movieId}`,
	);

	return data;
}

export async function fetchRecommendations(movieId: number | string) {
	const { data } = await fetchTmdbApi<ApiListResult<ApiMovie>>(
		"GET",
		`/movie/${movieId}/recommendations`,
	);

	return data;
}
