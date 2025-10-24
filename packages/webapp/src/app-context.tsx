import {
	createContext,
	type Dispatch,
	type ReactNode,
	type SetStateAction,
	use,
	useState,
} from "react";
import type { ApiListResultTotal, ApiMovie, ApiMovieDetails } from "shared";

export type ContextProps = {
	actionMovies: ApiMovie[];
	selectedMovie: ApiMovie | ApiMovieDetails | undefined;
	watchlist: ApiListResultTotal<ApiMovie>;
};

type ContextWithDipatch = [
	ContextProps,
	Dispatch<SetStateAction<ContextProps>>,
];

const AppContext = createContext<ContextWithDipatch | undefined>(undefined);

export function AppProvider({
	children,
	...props
}: ContextProps & { children: ReactNode }) {
	const stateAndSetter = useState(props);
	return (
		<AppContext.Provider value={stateAndSetter}>{children}</AppContext.Provider>
	);
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAppContext() {
	const data = use(AppContext);

	if (!data) throw new Error("useAppContext used outside of AppProvide");

	return data;
}
