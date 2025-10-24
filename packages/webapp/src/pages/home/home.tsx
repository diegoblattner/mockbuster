import { useState } from "react";
import type { ApiMovie } from "shared";
import { Carousel, Container, Hero, MovieCard, Page } from "ui-lib";
import { useAppContext } from "../../app-context";

const HOME_ROUTE = "/";

function useWatchList() {
	const [watchList] = useState<ApiMovie[]>([]);

	return watchList;
}

export default function Home() {
	const { initialMovies } = useAppContext();
	const watchList = useWatchList();
	return (
		<Page logoHref={HOME_ROUTE} logoAriaLabel={"home page"} links={null}>
			<Hero
				mainText={
					<>
						Find the movie you want to watch.
						<br />
						Right now!
					</>
				}
				subtext="The best movies and the best reviews to guide you on your next binge watch session!"
			>
				{watchList.length === 0 && (
					<p>Start adding movies to your watch list and don't miss a beat.</p>
				)}
				{watchList.length > 0 && (
					<p>
						<div>Check out the movies you have already saved!</div>
						<button type="button">Go to your watch list</button>
					</p>
				)}
			</Hero>
			<section>
				<Container>
					<Carousel title="Romance">
						{initialMovies.length > 0 ? (
							initialMovies.map((movie) => (
								<MovieCard key={movie.id} {...movie} />
							))
						) : (
							<p>No movies found...</p>
						)}
					</Carousel>
				</Container>
			</section>
		</Page>
	);
}
