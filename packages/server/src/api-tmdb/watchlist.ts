import type { ApiListResultTotal, ApiMovie, ApiStatus } from "shared";
import { fetchTmdbApi } from "./common.ts";

export async function fetchWatchlist(
	accId: string | number,
	page: number = 1,
): Promise<ApiListResultTotal<ApiMovie> | undefined> {
	const params = new URLSearchParams({
		page: page.toString(),
		sort_by: "created_at.desc",
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

export async function clearWatchlist(
	accId: string | number,
): Promise<{ success: boolean }> {
	// TMDB doesn't provide a url to clear the whole lost, so we need to delete one by one
	const [page1, page2] = await Promise.all([
		// considering there shouldn't be more than two pages... for this task...
		fetchWatchlist(accId, 1),
		fetchWatchlist(accId, 2),
	]);
	const movies: ApiMovie[] = [
		...(page1?.results ?? []),
		...(page2?.results ?? []),
	];

	if (movies.length === 0) {
		return { success: true };
	}

	const results = await Promise.all(
		movies.map((m) =>
			addToWatchlist(accId, {
				media_id: m.id,
				media_type: "movie",
				watchlist: false,
			}),
		),
	);

	if (results.every((r) => r?.success)) {
		return { success: true };
	}

	console.error("not all the movies removed... try again");
	return { success: false };
}
