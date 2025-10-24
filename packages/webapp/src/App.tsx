import "./index.css";
import {
	BrowserRouter,
	type LoaderFunction,
	Route,
	Routes,
	StaticRouter,
} from "react-router";
import { AppRoutes } from "shared";
import { AppProvider, type ContextProps } from "./app-context";
import { Home } from "./pages/home";
import { MovieDetails } from "./pages/movie-details";

export type AppProps = ContextProps &
	Readonly<{
		url: string;
		loadHomeData?: LoaderFunction;
		loadMovieDetailsData?: LoaderFunction;
	}>;

const RouterComponent = import.meta.env.SSR ? StaticRouter : BrowserRouter;

export default function App({
	url,
	loadHomeData,
	loadMovieDetailsData,
	...ctx
}: AppProps) {
	return (
		<AppProvider {...ctx}>
			<RouterComponent location={url!}>
				<Routes>
					<Route index Component={Home} loader={loadHomeData} />
					<Route
						path={AppRoutes.MovieDetails}
						Component={MovieDetails}
						loader={loadMovieDetailsData}
					/>
				</Routes>
			</RouterComponent>
		</AppProvider>
	);
}
