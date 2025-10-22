import { useState } from "react";
import { Carousel, Container, Header, Hero, Logo, MovieCard } from "ui-lib";

const HOME_ROUTE = "/";

type Category = "Romance" | "Horror" | "Comedy";

type Movie = {
	id: string;
	title: string;
	year: string;
	synopisis: string;
	img: string;
	trailer: string;
	category: Category;
	watched: boolean;
};

function useWatchList() {
	const [watchList, setWatchList] = useState<Movie[]>([]);

	return watchList;
}

export function Home() {
	const watchList = useWatchList();
	return (
		<div>
			<Header
				logo={<Logo />}
				title="Mockbuster"
				logoHref={HOME_ROUTE}
				logoAriaLabel={"home page"}
				links={null}
			/>
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
						{new Array(10).fill("").map((_, i) => (
							<MovieCard
								key={i}
								img={"img" + i}
								title={"title " + i}
								year="2010"
							/>
						))}
					</Carousel>
				</Container>
			</section>
		</div>
	);
}
