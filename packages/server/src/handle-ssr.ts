import type { Express, Response } from "express";
import type { ReactNode } from "react";
import { renderToPipeableStream } from "react-dom/server";
import { serverPropsTagId } from "shared";
import type { AppProps } from "webapp";
import { htmlTemplateEnd, htmlTemplateStart } from "./html-template.ts";
import { preloadData } from "./preload-data.ts";

const TIMEOUT = 20000;
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

export function registerSSRHandler(
	app: Express,
	appRenderer: (props: AppProps) => ReactNode,
) {
	// Serve the app
	app.use("*all", async (req, res) => {
		let didError = false;
		let streamComplete = false;
		const getStatusCode = () => (didError ? 500 : 200);

		res.write(htmlTemplateStart);

		res.statusCode = getStatusCode();
		setHeader(res, "Content-Type", "text/html");
		setHeader(res, "Transfer-Encoding", "chunked");

		let appProps: AppProps | undefined;
		try {
			appProps = await preloadData(req);
		} catch (e) {
			didError = true;
			console.error("error fetch the app data: ", e);
		}
		if (!appProps) {
			res.write(`<div>Invalid request</div>${htmlTemplateEnd}`);
			res.send();
			return;
		}

		// streams the app
		const { pipe, abort } = renderToPipeableStream(appRenderer(appProps), {
			// TODO check if this gets serialized correctly to avoid XXS:
			bootstrapScriptContent: `window["${serverPropsTagId}"] = ${JSON.stringify(appProps)}`,

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
				console.log("All content ready: " + req.baseUrl);
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
}
