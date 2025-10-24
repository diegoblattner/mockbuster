import { type ComponentProps, StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { serverPropsTagId } from "shared";
import App from "./App.tsx";

if (import.meta.env.VITE_HYDRATE === "TRUE") {
	// @ts-expect-error-next-line accessing a custom prop in window
	const props: ComponentProps<typeof App> = window[serverPropsTagId];

	hydrateRoot(
		document.getElementById("root")!,
		<StrictMode>
			<App {...props} />
		</StrictMode>,
	);
} else {
	createRoot(document.getElementById("root")!).render(
		<StrictMode>
			<App url={window.location.pathname} initialMovies={[]} />
		</StrictMode>,
	);
}
