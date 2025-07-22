import { test, expect } from "@playwright/test";

test.describe("Buscador", () => {
  test("buscar 'func' y comprobar resultados", async ({ page }) => {
    // Ir a la home en español
    await page.goto("/es");

    // Esperar a que el input de búsqueda esté visible
    const searchInput = page.getByPlaceholder("Buscar en el blog...");
    await expect(searchInput).toBeVisible();

    // Escribir 'func' y presionar Enter
    await searchInput.fill("func");
    await searchInput.press("Enter");

    // Esperar la navegación a la página de resultados
    await page.waitForURL(/\/es\/search\?.*q=func/);
    expect(page.url()).toMatch(/\/es\/search\?.*q=func/);

    // Comprobar que aparece el texto de resultados
    // Ejemplo: Mostrando 2 de 2 resultados para func
    const resultsInfo = page.locator("text=Mostrando ");
    await expect(resultsInfo).toContainText(
      /Mostrando \d+ de \d+ resultados[\s\S]*func/
    );

    // Guardar el número total de resultados antes de filtrar
    const textBefore = await resultsInfo.textContent();
    const matchBefore =
      textBefore &&
      textBefore.match(/Mostrando \d+ de (\d+) resultados[\s\S]*func/);
    const totalBefore = matchBefore ? parseInt(matchBefore[1], 10) : null;

    // Hacer clic en la categoría 'design patterns'
    const categoryLink = page
      .getByRole("link", { name: "design patterns", exact: true })
      .first();
    await categoryLink.click();

    // Esperar a que cambie el texto de resultados
    await expect(resultsInfo).not.toHaveText(textBefore ?? "");
    const textAfter = await resultsInfo.textContent();
    const matchAfter =
      textAfter &&
      textAfter.match(/Mostrando (\d+) de (\d+) resultados[\s\S]*func/);
    const shownAfter = matchAfter ? parseInt(matchAfter[1], 10) : null;
    const totalAfter = matchAfter ? parseInt(matchAfter[2], 10) : null;

    // Comprobar que el número de resultados es menor
    expect(totalAfter).not.toBeNull();
    expect(totalBefore).not.toBeNull();
    expect(totalAfter).toBeLessThan(totalBefore!);

    // Comprobar que el texto ha cambiado
    expect(textAfter).not.toBe(textBefore);

    // Comprobar que el número mostrado coincide con la cantidad de blogposts visibles
    const blogPosts = page.locator('[data-testid="blog-card"]');
    await expect(blogPosts).toHaveCount(shownAfter ?? 0);
  });

  test("ordenar por título muestra los posts en orden alfabético", async ({
    page,
  }) => {
    // Ir a la página de búsqueda con una query que devuelva varios posts
    await page.goto("/es/search?q=func");

    // Esperar a que los blogposts estén visibles
    const blogPosts = page.locator('[data-testid="blog-card"]');
    const count = await blogPosts.count();
    expect(count).toBeGreaterThan(1);

    // Obtener los títulos en el orden inicial
    const getTitles = async () => {
      return await blogPosts
        .locator('[data-testid="blog-card-title"]')
        .allTextContents();
    };
    const titlesBefore = await getTitles();

    // Seleccionar 'Por título' en el selector de orden
    const sortSelect = page.locator('select[name="sortBy"]');
    await sortSelect.selectOption("title");

    // Esperar a que el orden cambie
    await page.waitForTimeout(500); // Breve espera para el reordenamiento
    const titlesAfter = await getTitles();

    // Comprobar que el orden ha cambiado
    expect(titlesAfter).not.toEqual(titlesBefore);

    // Comprobar que titlesAfter está ordenado alfabéticamente
    const sorted = [...titlesAfter].sort((a, b) => a.localeCompare(b));
    expect(titlesAfter).toEqual(sorted);
  });
});
