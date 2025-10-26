import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { ReactNode } from "react";

export const queryClient = new QueryClient();

type AppQueryProviderProps = Readonly<{
	children: ReactNode;
}>;

export function AppQueryProvider({ children }: AppQueryProviderProps) {
	return (
		<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
	);
}
