import { useCallback, useMemo, useState } from "react";
import type { ApiMovie } from "shared";
import { AddListIcon, Container, Cta, MovieOverview } from "ui-lib";
import { postWatchlist } from "../../api/watchlist";
import { useAppContext } from "../../app-context";
import { Layout } from "../layout";

function useMutateWatchlist() {
	const [updatingWatchlist, setUpdatingWatchlist] = useState(false);
	const [, setCtx] = useAppContext();

	const toggleWatchlist = useCallback(
		async (movie: ApiMovie) => {
			setUpdatingWatchlist(true);
			function toggle() {
				let movieInWatchlist: ApiMovie | undefined;
				setCtx((prev) => {
					movieInWatchlist = prev.watchlist.results.find(
						({ id }) => id === movie.id,
					);

					const newResults = [...prev.watchlist.results];
					if (movieInWatchlist) {
						const index = newResults.findIndex(
							(m) => m.id === movieInWatchlist!.id,
						);
						newResults.splice(index, 1);
					} else {
						newResults.unshift(movie);
					}
					return {
						...prev,
						watchlist: {
							...prev.watchlist,
							total_results: newResults.length,
							results: newResults,
						},
					};
				});
				return movieInWatchlist;
			}

			// optmistic update:
			let success = true;
			const movieInWatchlist = toggle(); // update current state

			try {
				success = await postWatchlist(movie.id, !movieInWatchlist);
			} catch (e) {
				console.error("error mutating watchlist", e);
				success = false;
			} finally {
				if (!success) {
					toggle(); // revert current state
				}
				setUpdatingWatchlist(false);
			}
		},
		[setCtx],
	);

	return {
		mutating: updatingWatchlist,
		toggleWatchlist,
	};
}

export default function MovieDetails() {
	const [{ selectedMovie, watchlist }] = useAppContext();
	const { mutating, toggleWatchlist } = useMutateWatchlist();

	if (!selectedMovie) throw new Error("Missing selectedMovie in AppContext");

	const movieInWatchlist = useMemo(
		() => watchlist.results.find(({ id }) => id === selectedMovie.id),
		[watchlist, selectedMovie],
	);

	return (
		<Layout title={selectedMovie.title} showHomeLink>
			<Container>
				<MovieOverview {...selectedMovie}>
					{watchlist.total_results >= 20 ? (
						<p>There are alreay too many items in your watchlist.</p>
					) : (
						<Cta
							type="button"
							onClick={() => toggleWatchlist(selectedMovie as ApiMovie)}
							disabled={mutating}
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
			</Container>
		</Layout>
	);
}
