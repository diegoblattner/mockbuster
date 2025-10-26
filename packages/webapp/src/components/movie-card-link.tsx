import { useCallback } from "react";
import { Link } from "react-router";
import type { ApiMovieMain } from "shared";
import { MovieCard } from "ui-lib";
import { useAppContext } from "../hooks/app-context";
import { goToMovieDetails } from "../pages/movie-details";

type MovieCardLinkProps = Readonly<{
	movie: ApiMovieMain;
	imgLazy: boolean;
}>;

export function MovieCardLink({ movie, imgLazy }: MovieCardLinkProps) {
	const [, setValues] = useAppContext();
	const onMovieSelected = useCallback(
		(movie: ApiMovieMain) => {
			setValues((prev) => ({
				...prev,
				selectedMovie: movie,
			}));
		},
		[setValues],
	);

	return (
		<Link
			key={movie.id}
			to={goToMovieDetails(movie.id)}
			onClick={() => onMovieSelected(movie)}
		>
			<MovieCard {...movie} imgLazy={imgLazy} />
		</Link>
	);
}
