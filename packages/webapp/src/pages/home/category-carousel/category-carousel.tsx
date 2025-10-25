import { type ComponentProps, Fragment, Suspense } from "react";
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
	const Wrapper = imgLazy ? Suspense : Fragment; // suspense categories not visible
	return (
		<Wrapper>
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
		</Wrapper>
	);
}
