import type { ApiMovie } from "shared";

type PostWatchlistPayload = { movie: ApiMovie; add: boolean };
type FetchResult = { success: boolean };

export async function postWatchlist({ movie, add }: PostWatchlistPayload) {
	const boolStr = add ? "true" : "false";
	const response = await fetch(`/api/watchlist/movies/${movie.id}/${boolStr}`, {
		method: "POST",
	});
	const result: FetchResult = await response.json();
	return result.success;
}
