import type { ApiMovie, ApiStatus } from "shared";

type PostWatchlistPayload = { movie: ApiMovie; add: boolean };

export async function postWatchlist({ movie, add }: PostWatchlistPayload) {
	const boolStr = add ? "true" : "false";
	const response = await fetch(`/api/watchlist/movies/${movie.id}/${boolStr}`, {
		method: "POST",
	});
	const result: ApiStatus = await response.json();
	return result.success;
}

export async function clearWatchlist() {
	const response = await fetch(`/api/watchlist/clear`);
	const result: ApiStatus = await response.json();
	return result.success;
}
