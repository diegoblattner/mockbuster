import { useMemo } from "react";
import type { ApiMovie } from "shared";
import { AddListIcon, Container, Cta, MovieOverview } from "ui-lib";
import { useMutateWatchlist } from "../../api/watchlist-queries";
import { useAppContext } from "../../hooks/app-context";
import { Layout } from "../layout";
import { RecommendationsCarousel } from "./recommendations-carousel";

export default function MovieDetails() {
	const [{ selectedMovie, watchlist }] = useAppContext();
	const mutation = useMutateWatchlist();

	if (!selectedMovie) throw new Error("Missing selectedMovie in AppContext");

	const movieInWatchlist = useMemo(
		() => watchlist.results.find(({ id }) => id === selectedMovie.id),
		[watchlist, selectedMovie],
	);

	return (
		<Layout title={selectedMovie.title} showHomeLink>
			<Container>
				<MovieOverview {...selectedMovie}>
					{watchlist.total_results >= 20 && !movieInWatchlist ? (
						<p>There are alreay too many items on your watchlist.</p>
					) : (
						<Cta
							type="button"
							onClick={() =>
								mutation.mutate({
									movie: selectedMovie as ApiMovie,
									add: !movieInWatchlist,
								})
							}
							disabled={mutation.isPending}
							variant={movieInWatchlist ? "outline" : undefined}
						>
							{movieInWatchlist ? (
								"Remove from watchlist"
							) : (
								<>
									Add to watchlist <AddListIcon />
								</>
							)}
						</Cta>
					)}
				</MovieOverview>
				<br />
				<RecommendationsCarousel
					genreId={selectedMovie.genre_ids?.[0] ?? selectedMovie.genre_ids?.[0]}
					movieId={selectedMovie.id}
				/>
			</Container>
		</Layout>
	);
}
