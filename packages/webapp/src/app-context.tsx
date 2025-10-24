import {
	createContext,
	type Dispatch,
	type ReactNode,
	type SetStateAction,
	useContext,
	useState,
} from "react";
import type { ApiMovie, ApiMovieDetails } from "shared";

export type ContextProps = {
	initialMovies: ApiMovie[];
	selectedMovie: ApiMovie | ApiMovieDetails | undefined;
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
	const data = useContext(AppContext);

	if (!data) throw new Error("useAppContext used outside of AppProvide");

	return data;
}
