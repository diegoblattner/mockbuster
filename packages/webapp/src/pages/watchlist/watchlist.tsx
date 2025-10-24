import { Container } from "ui-lib";
import { useAppContext } from "../../app-context";
import { HomeLink } from "../../components/home-link";
import { MovieCardLink } from "../../components/movie-card-link";
import { Layout } from "../layout";

export default function Watchlist() {
	const [{ watchlist }] = useAppContext();

	return (
		<Layout title="Watchlist">
			<Container>
				<HomeLink />
				<h2>Movies in your watchlist ({watchlist.total_results})</h2>
				<div>
					{watchlist.results.map((movie, i) => (
						<MovieCardLink key={movie.id} movie={movie} imgLazy={i > 11} />
					))}
				</div>
			</Container>
		</Layout>
	);
}
