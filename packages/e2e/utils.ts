import { expect, type Page } from "@playwright/test";

export async function checkConsoleErrors(page: Page, fn: () => void) {
	const consoleErrors: string[] = [];
	page.on("console", (msg: { type: () => string; text: () => string }) => {
		if (msg.type() === "error") {
			console.log(`RECEIVED CONSOLE ERROR: "${msg.text()}"`);
			consoleErrors.push(msg.text());
		}
	});

	await fn();

	// expects no errors in the console
	expect(consoleErrors.length).toEqual(0);
}
