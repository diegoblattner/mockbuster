import type { ApiListResultTotal, ApiMovie } from "shared";

export async function fetchRecommendations(movieId: string | number) {
	const response = await fetch(`/api/movies/${movieId}/recommendations`);
	const result: ApiListResultTotal<ApiMovie> = await response.json();
	return result;
}
