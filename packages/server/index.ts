import compression from "compression";
import express, { type Response } from "express";
import { renderToPipeableStream } from "react-dom/server";
import sirv from "sirv";
import { createServer as createViteServer } from "vite";
import { htmlTemplateEnd, htmlTemplateStart } from "./htmlTemplate.ts";

// Create http server
const app = express();

// Constants
const isProduction = process.env.NODE_ENV === "production";
const port = Number(process.env.PORT || 5173);
const base = process.env.BASE || "/";
const TIMEOUT = 2000;

const vite = await createViteServer({
	server: { middlewareMode: true },
	appType: "custom",
});

// Use vite's connect instance as middleware. If you use your own
// express router (express.Router()), you should use router.use
// When the server restarts (for example after the user modifies
// vite.config.js), `vite.middlewares` is still going to be the same
// reference (with a new internal stack of Vite and plugin-injected
// middlewares). The following is valid even after restarts.
app.use(vite.middlewares);

// Load the server entry.ssrLoadModule automatically transforms
// ESM source code to be usable in Node.js! There is no bundling
// required, and provides efficient invalidation similar to HMR.
const { appRenderer } = await vite.ssrLoadModule("./app-renderer");

function setHeader(res: Response, name: string, value: number | string) {
	if (!res.headersSent) {
		res.setHeader(name, value);
	}
}

function handleTimeout(res: Response, abort: (reason?: unknown) => void) {
	// Set up timeout to abort long-running renders
	const timeout = setTimeout(() => {
		console.log("Request timeout, aborting render");
		abort();
		res.status(504).send("Request timeout");
	}, TIMEOUT); // 10 second timeout

	// Clean up timeout when response finishes
	res.on("finish", () => {
		clearTimeout(timeout);
	});

	res.on("close", () => {
		clearTimeout(timeout);
	});
}

// set up compression
if (isProduction) {
	app.use(compression());
}

// static assets
app.use(base, sirv("./dist/client", { extensions: [] }));

// Serve the app
app.use("*all", async (req, res) => {
	let didError = false;
	let streamComplete = false;
	const getStatusCode = () => (didError ? 500 : 200);

	res.write(htmlTemplateStart);

	res.statusCode = getStatusCode();
	setHeader(res, "Content-Type", "text/html");
	setHeader(res, "Transfer-Encoding", "chunked");

	// streams the app
	const { pipe, abort } = renderToPipeableStream(appRenderer(), {
		// bootstrapScripts: [hydrateScriptUrl],

		onShellReady() {
			res.statusCode = getStatusCode();
			setHeader(res, "Content-Type", "text/html");
			setHeader(res, "Transfer-Encoding", "chunked");
			pipe(res);
		},
		onShellError(error) {
			console.error("onShellError: ", error);
			res.statusCode = getStatusCode();

			if (!res.headersSent) {
				res.statusCode = 500;
				res.send("Something went wrong while rendering");
			}
		},
		onAllReady() {
			console.log("All content ready");
			streamComplete = true;

			if (!res.headersSent) {
				// If we haven't started streaming yet, send everything at once
				console.warn("all ready but header not sent");
				res.statusCode = didError ? 500 : 200;

				res.write(htmlTemplateStart);
				pipe(res);
			}

			res.write(htmlTemplateEnd);
		},
		onError(error) {
			didError = true;
			console.error("renderToPipeableStream error: ", error);
			if (!streamComplete) {
				console.error("stream not finished");
			}
		},
	});

	handleTimeout(res, abort);
});

app.listen(port, () =>
	console.log(`Server started at http://localhost:${port}`),
);
