import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App.tsx";

if (import.meta.env.VITE_HYDRATE === "TRUE") {
	hydrateRoot(
		document.getElementById("root")!,
		<StrictMode>
			<App />
		</StrictMode>,
	);
} else {
	createRoot(document.getElementById("root")!).render(
		<StrictMode>
			<App />
		</StrictMode>,
	);
}
