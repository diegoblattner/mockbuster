import {
	type ApiListResult,
	type ApiMovie,
	type ApiStatus,
	fetchTmdbApi,
} from "./common.ts";

export async function fetchWatchlist(
	accId: string,
	page: number = 1,
): Promise<ApiListResult<ApiMovie> | undefined> {
	const params = new URLSearchParams({
		page: page.toString(),
		sort_by: "created_at.asc",
	});

	const { data } = await fetchTmdbApi<ApiListResult<ApiMovie>>(
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

export async function addToWatchlist(accId: string, media: WatchlistPayload) {
	const { data } = await fetchTmdbApi<ApiListResult<ApiStatus>>(
		"POST",
		`/account/${accId}/watchlist`,
		undefined,
		media,
	);

	return data;
}
