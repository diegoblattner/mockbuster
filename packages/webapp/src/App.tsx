import "./index.css";
import { BrowserRouter, Route, Routes, StaticRouter } from "react-router";
import { type AppProps, AppProvider } from "./app-context";
import { Home, HomeSuspended, homePath } from "./pages/home";

const RouterComponent = import.meta.env.SSR ? StaticRouter : BrowserRouter;

export default function App(props: AppProps) {
	const HomeComponent = props.url === homePath ? Home : HomeSuspended;

	return (
		<AppProvider {...props}>
			<RouterComponent location={props.url}>
				<Routes location={props.url}>
					<Route index path={homePath} Component={HomeComponent} />
				</Routes>
			</RouterComponent>
		</AppProvider>
	);
}

export type { AppProps };
