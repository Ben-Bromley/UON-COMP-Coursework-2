import { test, expect } from "@playwright/test";

const pageUrl: string = "http://127.0.0.1:5500/index.html";

test("Has Specified Title", async ({ page }) => {
	await page.goto(pageUrl);

	// Expect title to contain the given pattern
	await expect(page).toHaveTitle(/COMP1004 \| Driver Search/);
});

test.describe("Search for People", () => {
	test("Search People By Name", async ({ page }) => {
		// got to localhost page
		await page.goto(pageUrl);

		// check title
		await expect(
			page.getByRole("heading", { name: "People Search" })
		).toBeVisible();

		// fill in search and click search button
		await page.getByRole("textbox").fill("Rachel Smith");
		await page.getByRole("button", { name: "Search People" }).click();

		// wait for supabase API
		await page.waitForResponse(
			/amfifubujyvqxfjljkaq.supabase.co\/rest\/v1\/People/
		);

		// check that at least one result is present
		await expect(page.locator(".result-card")).toBeVisible();
	});

	test("Search People By License", async ({ page }) => {
		// got to localhost page
		await page.goto(pageUrl);

		// check title
		await expect(
			page.getByRole("heading", { name: "People Search" })
		).toBeVisible();

		// fill in search and click search button
		await page.getByRole("textbox").fill("SG345PQ");
		await page.getByRole("button", { name: "Search People" }).click();

		// wait for supabase API
		await page.waitForResponse(
			/amfifubujyvqxfjljkaq.supabase.co\/rest\/v1\/People/
		);

		// check that at least one result is present
		await expect(page.locator(".result-card")).toBeVisible();
	});
});

// test.describe("Search for vehicles", () => {});
// test.describe("Register new vehicle", () => {});
