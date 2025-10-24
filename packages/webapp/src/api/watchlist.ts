type FetchResult = { success: boolean };

export async function postWatchlist(movieId: string | number, add: boolean) {
	const boolStr = add ? "true" : "false";
	const response = await fetch(`/api/watchlist/movies/${movieId}/${boolStr}`, {
		method: "POST",
	});
	const result: FetchResult = await response.json();
	return result.success;
}
