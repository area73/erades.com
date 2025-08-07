import { test, expect } from "@playwright/test";

test.describe("Redirección de idioma en la raíz", () => {
  test("redirige a /es o /en y muestra el idioma activo", async ({ page }) => {
    await page.goto("/");
    // Espera la redirección y extrae el idioma de la URL
    await expect(page).toHaveURL(/\/([a-z]{2})(\/)?$/);
    const url = page.url();
    const match = url.match(/\/([a-z]{2})(\/)?$/);
    expect(match).not.toBeNull();
    const lang = match ? match[1] : "";
    // Busca el botón activo con aria-current="page" y compara el texto
    const activeBtn = page.locator('button[aria-current="page"]').first();
    await expect(activeBtn).toBeVisible();
    const btnText = (await activeBtn.textContent())?.trim().toUpperCase();
    expect(btnText).toBe(lang.toUpperCase());
  });

  test("cambia de idioma y lo comprueba en la URL", async ({ page }) => {
    await page.goto("/");
    // Espera la redirección y extrae el idioma actual
    await expect(page).toHaveURL(/\/([a-z]{2})(\/)?$/);
    const url = page.url();
    const match = url.match(/\/([a-z]{2})(\/)?$/);
    expect(match).not.toBeNull();
    const currentLang = match ? match[1] : "";
    // Determina el idioma alternativo
    const altLang = currentLang === "es" ? "en" : "es";
    // Busca el botón del idioma alternativo (que NO tiene aria-current="page")
    const altBtn = page.locator(
      `button[id="lang-${altLang}"]:not([aria-current="page"])`
    ).first();
    await expect(altBtn).toBeVisible();
    await altBtn.click();
    // Comprueba que la URL cambia al idioma alternativo
    await expect(page).toHaveURL(new RegExp(`/${altLang}(/|$)`));
  });
});
