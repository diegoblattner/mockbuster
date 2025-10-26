import {
	type ComponentProps,
	createContext,
	type Dispatch,
	type ReactNode,
	type SetStateAction,
	use,
	useState,
} from "react";
import type {
	ApiListResult,
	ApiListResultTotal,
	ApiMovie,
	ApiMovieMain,
} from "shared";
import type { Container } from "ui-lib";

export type ContextProps = {
	categories: {
		id: number;
		name: string;
		style: ComponentProps<typeof Container>["style"];
		data: ApiListResult<ApiMovie>;
	}[];
	selectedMovie: ApiMovieMain | undefined;
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
