import { Container, Cta, Grid } from "ui-lib";
import { useClearWatchlistMutation } from "../../api/watchlist-queries";
import { MovieCardLink } from "../../components/movie-card-link";
import { useAppContext } from "../../hooks/app-context";
import { Layout } from "../layout";

export default function Watchlist() {
	const [{ watchlist }] = useAppContext();
	const mutation = useClearWatchlistMutation();
	const total = watchlist.total_results;

	return (
		<Layout title="Watchlist" showHomeLink>
			<Container>
				<Grid
					title={`Movies on your watchlist (${total})`}
					emptyText="There are movies are no movies saved..."
				>
					{watchlist.results.map((movie, i) => (
						<MovieCardLink key={movie.id} movie={movie} imgLazy={i > 11} />
					))}
				</Grid>
				<br />
				{total > 0 && (
					<Cta variant="outline" onClick={() => mutation.mutate()}>
						Clear watchlist
					</Cta>
				)}
			</Container>
		</Layout>
	);
}
