// @vitest-environment happy-dom
import { describe, test, expect } from "vitest";
import { getByRole } from "@testing-library/dom";
import ThemeToggle from "./ThemeToggle.astro";
import { renderAstroComponent } from "../test/helpers.ts";

describe("ThemeToggle", () => {
  test("renders button with correct structure", async () => {
    const result = await renderAstroComponent(ThemeToggle, {});

    const button = getByRole(result, "button");
    expect(button).not.toBeNull();
    expect(button?.getAttribute("id")).toBe("theme-toggle-btn");
    expect(button?.getAttribute("type")).toBe("button");
    expect(button?.getAttribute("aria-label")).toBe("Toggle dark mode");
  });

  test("has correct button styling", async () => {
    const result = await renderAstroComponent(ThemeToggle, {});

    const button = getByRole(result, "button");
    expect(button?.classList.contains("h-9")).toBe(true);
    expect(button?.classList.contains("w-9")).toBe(true);
    expect(button?.classList.contains("flex")).toBe(true);
    expect(button?.classList.contains("items-center")).toBe(true);
    expect(button?.classList.contains("justify-center")).toBe(true);
    expect(button?.classList.contains("rounded-full")).toBe(true);
    expect(button?.classList.contains("bg-transparent")).toBe(true);
    expect(button?.classList.contains("hover:bg-secondary/50")).toBe(true);
    expect(button?.classList.contains("transition-colors")).toBe(true);
    expect(button?.classList.contains("focus:outline-none")).toBe(true);
  });

  test("renders moon icon", async () => {
    const result = await renderAstroComponent(ThemeToggle, {});

    const moonIcon = result.querySelector("#moon-icon");
    expect(moonIcon).not.toBeNull();
    expect(moonIcon?.classList.contains("h-4")).toBe(true);
    expect(moonIcon?.classList.contains("w-4")).toBe(true);
    expect(moonIcon?.classList.contains("text-muted-foreground")).toBe(true);
    expect(moonIcon?.classList.contains("hover:text-foreground")).toBe(true);
    expect(moonIcon?.classList.contains("transition-colors")).toBe(true);
    expect(moonIcon?.classList.contains("inline")).toBe(true);
    expect(moonIcon?.classList.contains("dark:hidden")).toBe(true);
  });

  test("renders sun icon", async () => {
    const result = await renderAstroComponent(ThemeToggle, {});

    const sunIcon = result.querySelector("#sun-icon");
    expect(sunIcon).not.toBeNull();
    expect(sunIcon?.classList.contains("h-4")).toBe(true);
    expect(sunIcon?.classList.contains("w-4")).toBe(true);
    expect(sunIcon?.classList.contains("text-muted-foreground")).toBe(true);
    expect(sunIcon?.classList.contains("hover:text-foreground")).toBe(true);
    expect(sunIcon?.classList.contains("transition-colors")).toBe(true);
    expect(sunIcon?.classList.contains("hidden")).toBe(true);
    expect(sunIcon?.classList.contains("dark:inline")).toBe(true);
  });

  test("has correct span wrapper", async () => {
    const result = await renderAstroComponent(ThemeToggle, {});

    const span = result.querySelector("span");
    expect(span).not.toBeNull();
    expect(span?.classList.contains("inline-flex")).toBe(true);
  });

  test("renders with no props", async () => {
    const result = await renderAstroComponent(ThemeToggle, {});

    const button = getByRole(result, "button");
    expect(button).not.toBeNull();
    expect(result.innerHTML).toBeTruthy();
  });

  test("has proper icon visibility classes", async () => {
    const result = await renderAstroComponent(ThemeToggle, {});

    const moonIcon = result.querySelector("#moon-icon");
    const sunIcon = result.querySelector("#sun-icon");

    // Moon icon should be visible by default (light mode)
    expect(moonIcon?.classList.contains("inline")).toBe(true);
    expect(moonIcon?.classList.contains("dark:hidden")).toBe(true);

    // Sun icon should be hidden by default (light mode)
    expect(sunIcon?.classList.contains("hidden")).toBe(true);
    expect(sunIcon?.classList.contains("dark:inline")).toBe(true);
  });

  test("has correct icon styling", async () => {
    const result = await renderAstroComponent(ThemeToggle, {});

    const icons = result.querySelectorAll("svg");
    expect(icons.length).toBe(2);

    icons.forEach((icon) => {
      expect(icon?.classList.contains("h-4")).toBe(true);
      expect(icon?.classList.contains("w-4")).toBe(true);
      expect(icon?.classList.contains("text-muted-foreground")).toBe(true);
      expect(icon?.classList.contains("hover:text-foreground")).toBe(true);
      expect(icon?.classList.contains("transition-colors")).toBe(true);
    });
  });

  test("renders with inline script", async () => {
    const result = await renderAstroComponent(ThemeToggle, {});

    const script = result.querySelector("script");
    expect(script).not.toBeNull();
    expect(script?.textContent).toBeTruthy();
  });

  test("has proper button accessibility", async () => {
    const result = await renderAstroComponent(ThemeToggle, {});

    const button = getByRole(result, "button");
    expect(button?.getAttribute("aria-label")).toBe("Toggle dark mode");
    expect(button?.getAttribute("type")).toBe("button");
  });

  test("renders complete component structure", async () => {
    const result = await renderAstroComponent(ThemeToggle, {});

    // Verificar que todos los elementos están presentes
    const button = getByRole(result, "button");
    const span = result.querySelector("span");
    const moonIcon = result.querySelector("#moon-icon");
    const sunIcon = result.querySelector("#sun-icon");
    const script = result.querySelector("script");

    expect(button).not.toBeNull();
    expect(span).not.toBeNull();
    expect(moonIcon).not.toBeNull();
    expect(sunIcon).not.toBeNull();
    expect(script).not.toBeNull();
  });
});
