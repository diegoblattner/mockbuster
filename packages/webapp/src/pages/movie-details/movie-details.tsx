import { useAppContext } from "../../app-context";
import { Layout } from "../layout";

export default function MovieDetails() {
	const [{ selectedMovie }] = useAppContext();

	if (!selectedMovie) throw new Error("Missing selectedMovie in AppContext");

	return (
		<Layout title={selectedMovie.title}>
			<div>{selectedMovie.title}</div>
			<div>{selectedMovie.overview}</div>
		</Layout>
	);
}
