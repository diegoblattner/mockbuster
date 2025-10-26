import { expect, test } from "@playwright/test";
import { AppRoutes, homePageCategories } from "shared";
import { mockMovie, SITE_URL } from "../utils";

test("Check home page", async ({ page }) => {
	await page.goto(SITE_URL);

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

test("Toggle movie in watchlist", async ({ page }) => {
	// make sure watchlist is empty first...
	await page.goto(`${SITE_URL}${AppRoutes.Watchlist}`);
	const clearListBtn = await page.getByRole("button");

	if (await clearListBtn.isVisible()) {
		clearListBtn.click();
	}

	await expect(page.getByRole("link", { name: "Watchlist (0)" })).toBeVisible();
	await expect(
		page.getByText("There are movies are no movies saved..."),
	).toBeVisible();
	await expect(
		page.getByRole("button", { name: "Clear watchlist" }),
	).not.toBeAttached();

	// go to home page
	await page.goto(SITE_URL);

	// Click the movie
	await page.getByAltText(mockMovie.title).click();

	// check has navigated
	await expect(
		page.getByRole("heading", { name: mockMovie.title }),
	).toBeVisible();

	await page.getByRole("button", { name: "Add to watchlist" }).click();

	await expect(page.getByRole("link", { name: "Watchlist (1)" })).toBeVisible();
	await expect(
		page.getByRole("button", { name: "Remove from watchlist" }),
	).toBeVisible();
	await expect(page.getByText("Updated!")).toBeVisible(); // checks the toast

	await page.goto(SITE_URL); // navigate to home and click the cta to the watchlist
	await page.getByRole("link", { name: "Go to your watchlist" }).click();

	// checks the item is in the watchlist
	await expect(
		page.getByRole("button", { name: "Clear watchlist" }),
	).toBeVisible();
	await page.getByAltText(mockMovie.title).click();

	// now removes movie from the watchlist
	await page.getByRole("button", { name: "Remove from watchlist" }).click();
	await expect(page.getByRole("link", { name: "Watchlist (0)" })).toBeVisible();
	await expect(
		page.getByRole("button", { name: "Add to watchlist" }),
	).toBeVisible();
	await expect(page.getByText("Updated!")).toBeVisible(); // checks the toast

	// re-check watchlist is empty
	await page.goto(`${SITE_URL}${AppRoutes.Watchlist}`);
	await expect(page.getByRole("link", { name: "Watchlist (0)" })).toBeVisible();
	await expect(
		page.getByText("There are movies are no movies saved..."),
	).toBeVisible();
	await expect(
		page.getByRole("button", { name: "Clear watchlist" }),
	).not.toBeAttached();
});
