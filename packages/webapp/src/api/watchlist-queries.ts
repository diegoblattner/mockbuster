import { useMutation } from "@tanstack/react-query";
import type { ApiMovie } from "shared";
import { useAppContext } from "../app-context";
import { postWatchlist } from "./watchlist";

export function useMutateWatchlist() {
	const [, setCtx] = useAppContext();

	function updateLocalState(movie: ApiMovie, add: boolean) {
		setCtx((prev) => {
			const newResults = [...prev.watchlist.results];
			if (add) {
				newResults.unshift(movie);
			} else {
				const index = newResults.findIndex((m) => m.id === movie.id);
				newResults.splice(index, 1);
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
	}

	const mutation = useMutation({
		mutationFn: postWatchlist,
		onMutate: ({ movie, add }) => {
			// optmistc update
			updateLocalState(movie, add);
		},
		onError: (error, { movie, add }) => {
			// An error happened!
			console.error("error posting to watchlist", error);
			// revert location state
			updateLocalState(movie, !add);
		},
	});

	return mutation;
}
