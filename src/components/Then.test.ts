// @vitest-environment happy-dom
import { describe, test, expect } from "vitest";
import { getByText } from "@testing-library/dom";
import Then from "./Then.astro";
import { renderAstroComponent } from "../test/helpers.ts";

describe("Then", () => {
  test("renders with slot content", async () => {
    const result = await renderAstroComponent(Then, {
      slots: {
        default: "Contenido del slot",
      },
    });

    const content = getByText(result, "Contenido del slot");
    expect(content).not.toBeNull();
  });

  test("renders with empty slot", async () => {
    const result = await renderAstroComponent(Then, {
      slots: {
        default: "",
      },
    });

    const div = result.querySelector("div");
    expect(div).not.toBeNull();
    expect(div?.getAttribute("data-then-marker")).toBe("");
  });

  test("renders with HTML content in slot", async () => {
    const result = await renderAstroComponent(Then, {
      slots: {
        default: "<span>HTML content</span>",
      },
    });

    const span = result.querySelector("span");
    expect(span).not.toBeNull();
    expect(span?.textContent).toBe("HTML content");
  });

  test("has correct data attribute", async () => {
    const result = await renderAstroComponent(Then, {
      slots: {
        default: "Test content",
      },
    });

    const div = result.querySelector("div");
    expect(div?.getAttribute("data-then-marker")).toBe("");
  });

  test("renders with complex content", async () => {
    const result = await renderAstroComponent(Then, {
      slots: {
        default:
          "Contenido complejo con <strong>HTML</strong> y <em>formato</em>",
      },
    });

    const strong = result.querySelector("strong");
    const em = result.querySelector("em");

    expect(strong).not.toBeNull();
    expect(em).not.toBeNull();
    expect(strong?.textContent).toBe("HTML");
    expect(em?.textContent).toBe("formato");
  });

  test("renders with special characters", async () => {
    const result = await renderAstroComponent(Then, {
      slots: {
        default: "Contenido con caracteres especiales: áéíóú ñ",
      },
    });

    const content = getByText(
      result,
      "Contenido con caracteres especiales: áéíóú ñ"
    );
    expect(content).not.toBeNull();
  });

  test("renders with numbers", async () => {
    const result = await renderAstroComponent(Then, {
      slots: {
        default: "12345",
      },
    });

    const content = getByText(result, "12345");
    expect(content).not.toBeNull();
  });

  test("renders with multiple elements", async () => {
    const result = await renderAstroComponent(Then, {
      slots: {
        default: "<p>Párrafo 1</p><p>Párrafo 2</p>",
      },
    });

    const paragraphs = result.querySelectorAll("p");
    expect(paragraphs.length).toBe(2);
    expect(paragraphs[0]?.textContent).toBe("Párrafo 1");
    expect(paragraphs[1]?.textContent).toBe("Párrafo 2");
  });

  test("renders with no slot content", async () => {
    const result = await renderAstroComponent(Then, {});

    const div = result.querySelector("div");
    expect(div).not.toBeNull();
    expect(div?.getAttribute("data-then-marker")).toBe("");
    expect(div?.textContent?.trim()).toBe("");
  });

  test("has correct structure", async () => {
    const result = await renderAstroComponent(Then, {
      slots: {
        default: "Test",
      },
    });

    const div = result.querySelector("div");
    expect(div).not.toBeNull();
    expect(div?.tagName).toBe("DIV");
    expect(div?.getAttribute("data-then-marker")).toBe("");
  });

  test("renders with long content", async () => {
    const longContent =
      "Este es un contenido muy largo que debería renderizarse correctamente sin problemas. ".repeat(
        10
      );

    const result = await renderAstroComponent(Then, {
      slots: {
        default: longContent,
      },
    });

    const div = result.querySelector("div");
    expect(div).not.toBeNull();
    expect(div?.textContent).toContain("Este es un contenido muy largo");
  });
});
