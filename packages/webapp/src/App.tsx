import { Home } from "./pages/home/home";
import "./index.css";
import type { ApiMovie } from "shared";

export type AppProps = Readonly<{
	initialMovies: ApiMovie[];
}>;

export default function App({ initialMovies = [] }: AppProps) {
	return <Home movies={initialMovies} />;
}
