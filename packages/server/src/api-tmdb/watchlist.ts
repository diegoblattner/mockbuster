import type { ApiListResultTotal, ApiMovie, ApiStatus } from "shared";
import { fetchTmdbApi } from "./common.ts";

export async function fetchWatchlist(
	accId: string | number,
	page: number = 1,
): Promise<ApiListResultTotal<ApiMovie> | undefined> {
	const params = new URLSearchParams({
		page: page.toString(),
		sort_by: "created_at.asc",
	});

	const { data } = await fetchTmdbApi<ApiListResultTotal<ApiMovie>>(
		"GET",
		`/account/${accId}/watchlist/movies`,
		params,
	);

	return data;
}

type WatchlistPayload = {
	media_type: "movie" | "TV";
	media_id: number;
	watchlist: boolean;
};

export async function addToWatchlist(
	accId: string | number,
	media: WatchlistPayload,
) {
	const { data } = await fetchTmdbApi<ApiStatus>(
		"POST",
		`/account/${accId}/watchlist`,
		undefined,
		media,
	);

	return data;
}
