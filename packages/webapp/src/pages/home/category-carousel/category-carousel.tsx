import { useCallback } from "react";
import { Link } from "react-router";
import type { ApiMovie } from "shared";
import { Carousel, Container, MovieCard } from "ui-lib";
import { useAppContext } from "../../../app-context";
import { goToMovieDetails } from "../../movie-details";

type CategoryCarouselProps = Readonly<{
	name: string;
	id: number;
	style: string;
	movies: ApiMovie[];
}>;

export function CategoryCarousel({ name, movies = [] }: CategoryCarouselProps) {
	const [, setValues] = useAppContext();
	const onMovieSelected = useCallback(
		(movie: ApiMovie) => {
			setValues((prev) => ({
				...prev,
				selectedMovie: movie,
			}));
		},
		[setValues],
	);

	return (
		<Container>
			<Carousel title={name}>
				{movies.length > 0 ? (
					movies.map((movie) => (
						<Link
							key={movie.id}
							to={goToMovieDetails(movie.id)}
							onClick={() => onMovieSelected(movie)}
						>
							<MovieCard {...movie} />
						</Link>
					))
				) : (
					<p>No movies found in {name}...</p>
				)}
			</Carousel>
		</Container>
	);
}
