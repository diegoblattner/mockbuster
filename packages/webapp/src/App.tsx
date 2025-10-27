import {
	BrowserRouter,
	type LoaderFunction,
	Route,
	Routes,
	StaticRouter,
} from "react-router";
import { AppRoutes } from "shared";
import { AppQueryProvider } from "./api/query-client";
import { AppProvider, type ContextProps } from "./app-context";
import { ScrollTop } from "./components/scroll-top";
import { Home } from "./pages/home";
import { MovieDetails } from "./pages/movie-details";
import { Watchlist } from "./pages/watchlist";

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
			<AppQueryProvider>
				<RouterComponent location={url}>
					<ScrollTop />
					<Routes>
						<Route index Component={Home} loader={loadHomeData} />
						<Route
							path={AppRoutes.MovieDetails}
							Component={MovieDetails}
							loader={loadMovieDetailsData}
						/>
						<Route
							path={AppRoutes.Watchlist}
							Component={Watchlist}
							// loader={loadMovieDetailsData}
						/>
					</Routes>
				</RouterComponent>
			</AppQueryProvider>
		</AppProvider>
	);
}
