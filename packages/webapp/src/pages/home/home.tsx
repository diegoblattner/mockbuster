import { Link } from "react-router";
import { AppRoutes } from "shared";
import { Cta, Hero } from "ui-lib";
import { useAppContext } from "../../app-context";
import { Layout } from "../layout";
import { CategoryCarousel } from "./category-carousel/category-carousel";

export default function Home() {
	const [{ categories, watchlist }] = useAppContext();

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
						<Cta as={Link} to={AppRoutes.Watchlist}>
							Go to your watch list
						</Cta>
					</>
				)}
			</Hero>
			{categories.length > 0 && (
				<section aria-label="Movies by category">
					{categories.map((c, i) => (
						<CategoryCarousel
							key={c.id}
							{...c}
							movies={c.data.results}
							imgLazy={i > 0}
						/>
					))}
				</section>
			)}
		</Layout>
	);
}
