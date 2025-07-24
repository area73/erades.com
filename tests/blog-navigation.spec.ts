import { test, expect } from "@playwright/test";

test.describe("Navegación a blogpost desde la home", () => {
  test("debe navegar al primer blogpost y verificar el encabezado", async ({
    page,
  }) => {
    await page.goto("/");
    const firstPost = page.locator('[aria-label="grid-card"]').first();
    const postTitle = await firstPost
      .locator('[aria-label="blog-card-title"]')
      .textContent();
    await firstPost.click();
    // Espera a que la navegación termine y verifica el encabezado
    const header = page.locator("h1");
    await expect(header).toBeVisible();
    await expect(header).toHaveText(postTitle || "");
  });
});
