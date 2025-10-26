import type { ApiMovie, ApiStatus } from "shared";

type PostWatchlistPayload = { movie: ApiMovie; add: boolean };

const url = import.meta.env.URL ?? "http://localhost";
const port = import.meta.env.PORT ?? 5174;
export const SITE_URL = `${url}:${port}`;

export async function postWatchlist({ movie, add }: PostWatchlistPayload) {
	const boolStr = add ? "true" : "false";
	const response = await fetch(
		`${SITE_URL}/api/watchlist/movies/${movie.id}/${boolStr}`,
		{
			method: "POST",
		},
	);
	const result: ApiStatus = await response.json();
	return result.success;
}

export async function clearWatchlist() {
	const response = await fetch(`/api/watchlist/clear`);
	const result: ApiStatus = await response.json();
	return result.success;
}
