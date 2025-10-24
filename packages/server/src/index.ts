import assert from "node:assert";
import compression from "compression";
import express from "express";
import sirv from "sirv";
import { createServer as createViteServer } from "vite";
import { errorHandlerRouter } from "./api/common.ts";
import { moviesRouter } from "./api/movies.ts";
import { watchlistRouter } from "./api/watchlist.ts";
import { registerSSRHandler } from "./handle-ssr.ts";

process.loadEnvFile("../../.env"); // loads .env from the root diretory

assert(!!process.env.TMDB_API_TOKEN, "TMDB_API_TOKEN not set in .env");

// Create http server
const app = express();

// Constants
const isProduction = process.env.NODE_ENV === "production";
const port = Number(process.env.PORT ?? 5174);
const base = process.env.BASE_URL ?? "/";

const vite = await createViteServer({
	server: { middlewareMode: true },
	appType: "custom",
});

// Use vite's connect instance as middleware.
if (!isProduction) {
	app.use(vite.middlewares);
}

// Load the server entry.ssrLoadModule automatically transforms
// ESM source code to be usable in Node.js! There is no bundling
// required, and provides efficient invalidation similar to HMR.
const { appRenderer } = await vite.ssrLoadModule("src/app-renderer.tsx");

// blocks request from chrome's devtools (automatic workspace folders feature)
app.get("/.well-known/appspecific/com.chrome.devtools.json", (_, res) => {
	return res.status(204).end();
});

// set up compression
if (isProduction) {
	app.use(compression());
}

// static assets
app.use(base, sirv("dist/client", { extensions: [] }));

app.use("/api", [moviesRouter, watchlistRouter, errorHandlerRouter]);

registerSSRHandler(app, appRenderer);

app.listen(port, () =>
	console.log(`Server started at http://localhost:${port}`),
);
