import { Suspense, useState } from "react";
import { type ApiMovie, homeCategories } from "shared";
import { Hero } from "ui-lib";
import { useAppContext } from "../../app-context";
import { Layout } from "../layout";
import { CategoryCarousel } from "./category-carousel/category-carousel";

function useWatchList() {
	const [watchList] = useState<ApiMovie[]>([]);

	return watchList;
}

export default function Home() {
	const [{ initialMovies }] = useAppContext();
	const watchList = useWatchList();

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
			<section aria-label="Movies by category">
				<CategoryCarousel
					{...homeCategories[0]}
					style="action"
					movies={initialMovies}
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
