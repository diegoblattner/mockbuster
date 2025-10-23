import {
	type ApiGenreId,
	type ApiListResult,
	type ApiMovie,
	fetchTmdbApi,
	language,
} from "./common.ts";

export async function fetchMoviesByGenre(
	genreId: ApiGenreId,
	page: number = 1,
) {
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
