import { Container, Grid } from "ui-lib";
import { useAppContext } from "../../app-context";
import { MovieCardLink } from "../../components/movie-card-link";
import { Layout } from "../layout";

export default function Watchlist() {
	const [{ watchlist }] = useAppContext();

	return (
		<Layout title="Watchlist" showHomeLink>
			<Container>
				<Grid
					title={`Movies in your watchlist (${watchlist.total_results})`}
					emptyText="There are movies are no movies saved..."
				>
					{watchlist.results.map((movie, i) => (
						<MovieCardLink key={movie.id} movie={movie} imgLazy={i > 11} />
					))}
				</Grid>
			</Container>
		</Layout>
	);
}
