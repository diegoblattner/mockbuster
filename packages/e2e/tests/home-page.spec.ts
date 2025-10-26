import { expect, test } from "@playwright/test";
import { homePageCategories } from "shared";
import { checkConsoleErrors } from "../utils";

const URL = process.env.URL ?? "http://localhost";
const PORT = process.env.PORT ?? 5174;

const url = `${URL}:${PORT}`;

test("Check home page", async ({ page }) => {
	await checkConsoleErrors(page, async () => {
		await page.goto(url);

		// Expect a title "to contain" a substring.
		await expect(page).toHaveTitle(/Mockbuster/);
		// header link to watchlist
		await expect(page.getByRole("link", { name: /Watchlist/ })).toBeVisible();

		for (const c of homePageCategories) {
			await expect(page.getByRole("heading", { name: c.name })).toBeVisible();
		}

		// expect homePageCategories.length * 20 movies in the page
		const allLinks = await page.getByRole("link").all();
		const allHrefs = await Promise.all(
			allLinks.map((link) => link.getAttribute("href")),
		);
		expect(allHrefs.filter((v) => v?.startsWith("/movies/")).length).toEqual(
			homePageCategories.length * 20,
		);

		// expect carousel buttons are visible
		const carousselArrowsVisible = (page.viewportSize()?.width ?? 0) >= 400;
		const btnNames = ["scroll backwards", "scroll forward"];
		for (const name of btnNames) {
			const btns = await page.getByRole("button", { name }).all();
			expect(btns.length).toEqual(
				carousselArrowsVisible ? homePageCategories.length : 0,
			);
		}
		// TODO test carousel scroll
	});
});

test("navigate to watchlist", async ({ page }) => {
	await checkConsoleErrors(page, async () => {
		await page.goto(url);

		// Click the get started link.
		await page.getByRole("link", { name: /Watchlist/ }).click();

		// Expects page to have a heading with the name of Installation.
		await expect(
			page.getByRole("heading", { name: /Movies on your watchlist/ }),
		).toBeVisible();
	});
});
