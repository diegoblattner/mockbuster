import type { ComponentProps } from "react";
import type { ApiMovie } from "shared";
import { Carousel, Container } from "ui-lib";
import { MovieCardLink } from "../../../components/movie-card-link";

type CategoryCarouselProps = Readonly<{
	name: string;
	id: number;
	style: ComponentProps<typeof Container>["style"];
	movies: ApiMovie[];
	imgLazy: boolean;
}>;

export function CategoryCarousel({
	name,
	movies = [],
	style,
	imgLazy,
}: CategoryCarouselProps) {
	return (
		<Container style={style}>
			<Carousel title={name} emptyText={`No movies found in ${name}...`}>
				{movies.map((movie, i) => (
					<MovieCardLink
						key={movie.id}
						movie={movie}
						imgLazy={imgLazy || i > 5}
					/>
				))}
			</Carousel>
		</Container>
	);
}
