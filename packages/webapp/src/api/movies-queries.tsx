import { useQuery } from "@tanstack/react-query";
import { fetchRecommendations } from "./movies";

const keys = {
	recommendations: "recommendations",
} as const;

export function useRecommendationsQuery(movieId: string | number) {
	const query = useQuery({
		queryKey: [keys.recommendations],
		queryFn: () => fetchRecommendations(movieId),
	});

	return query;
}
