import { Suspense } from "react";
import { homeCategories } from "shared";
import { Hero } from "ui-lib";
import { useAppContext } from "../../app-context";
import { Layout } from "../layout";
import { CategoryCarousel } from "./category-carousel/category-carousel";

export default function Home() {
	const [{ actionMovies, watchlist }] = useAppContext();

	return (
		<Layout>
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
				{watchlist.total_results === 0 && (
					<p>Start adding movies to your watch list and don't miss a beat.</p>
				)}
				{watchlist.total_results > 0 && (
					<>
						<p>Check out the movies you have already saved!</p>
						<button type="button">Go to your watch list</button>
					</>
				)}
			</Hero>
			<section aria-label="Movies by category">
				<CategoryCarousel
					{...homeCategories[0]}
					style="action"
					movies={actionMovies}
					imgLazy={false}
				/>
				<Suspense>
					<CategoryCarousel
						{...homeCategories[1]}
						style="fantasy"
						movies={[]}
						imgLazy={true}
					/>
					<CategoryCarousel
						{...homeCategories[2]}
						style="science"
						movies={[]}
						imgLazy={true}
					/>
				</Suspense>
			</section>
		</Layout>
	);
}
