import { test, expect } from "@playwright/test";

test.describe("Astro SSR Home", () => {
  test("debe mostrar el título principal en la home", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/Area 73/i);
    await expect(page.locator("h1")).toBeVisible();
  });
});
