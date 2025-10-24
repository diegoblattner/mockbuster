import type { ApiMovie } from "shared";
import { Carousel, Container } from "ui-lib";
import { MovieCardLink } from "../../../components/movie-card-link";

type CategoryCarouselProps = Readonly<{
	name: string;
	id: number;
	style: string;
	movies: ApiMovie[];
	imgLazy: boolean;
}>;

export function CategoryCarousel({
	name,
	movies = [],
	imgLazy,
}: CategoryCarouselProps) {
	return (
		<Container>
			<Carousel title={name}>
				{movies.length > 0 ? (
					movies.map((movie, i) => (
						<MovieCardLink
							key={movie.id}
							movie={movie}
							imgLazy={imgLazy || i > 5}
						/>
					))
				) : (
					<p>No movies found in {name}...</p>
				)}
			</Carousel>
		</Container>
	);
}
