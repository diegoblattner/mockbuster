import { createContext, type ReactNode, useContext, useState } from "react";
import type { ApiMovie } from "shared";

export type AppProps = Readonly<{
	url: string;
	initialMovies: ApiMovie[];
}>;

const AppContext = createContext<AppProps | undefined>(undefined);

export function AppProvider({
	children,
	...props
}: AppProps & { children: ReactNode }) {
	const [state] = useState(props);

	return <AppContext.Provider value={state}>{children}</AppContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAppContext() {
	const data = useContext(AppContext);

	if (!data) throw new Error("useAppContext used outside of AppProvide");

	return data;
}
