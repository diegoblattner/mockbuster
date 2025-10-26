import type { ApiMovie } from "shared";
import { useRecommendationsQuery } from "../../api/movies-queries";
import { CategoryCarousel } from "../../components/category-carousel";

type RecommendationsCarouselProps = Readonly<{
	genreId?: number;
	movieId: number;
}>;
const EMPTY: ApiMovie[] = [];
export function RecommendationsCarousel({
	genreId,
	movieId,
}: RecommendationsCarouselProps) {
	const { data } = useRecommendationsQuery(movieId);

	return (
		<CategoryCarousel
			name="Recommendations"
			imgLazy
			id={genreId}
			movies={data?.results ?? EMPTY}
		/>
	);
}
