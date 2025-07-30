// @vitest-environment happy-dom
import { describe, test, expect } from "vitest";
import { getByText } from "@testing-library/dom";
import If from "./If.astro";
import { renderAstroComponent } from "../test/helpers.ts";

describe("If.astro", () => {
  describe("cuando la condición es verdadera", () => {
    test("debería renderizar el contenido then cuando la condición es verdadera", async () => {
      // Arrange
      const thenContent = "<p>This is the then content</p>";
      const elseContent = "<p>This is the else content</p>";
      const slotContent = `<div data-then-marker class="test">${thenContent}</div><div data-else-marker class="test">${elseContent}</div>`;

      // Act
      const result = await renderAstroComponent(If, {
        props: { condition: true },
        slots: {
          default: slotContent,
        },
      });

      // Assert
      expect(result.innerHTML).toContain("This is the then content");
      expect(result.innerHTML).not.toContain("This is the else content");
    });

    test("debería manejar contenido then con atributos adicionales", async () => {
      // Arrange
      const thenContent = "<span>Then with attributes</span>";
      const slotContent = `<div data-then-marker class="test" id="then-div">${thenContent}</div>`;

      // Act
      const result = await renderAstroComponent(If, {
        props: { condition: true },
        slots: {
          default: slotContent,
        },
      });

      // Assert
      expect(result.innerHTML).toContain("Then with attributes");
      expect(result.innerHTML).not.toContain("data-then-marker");
    });

    test("debería manejar HTML anidado en el contenido then", async () => {
      // Arrange
      const thenContent = `<div class="nested"><p>Nested content</p><span>More content</span></div>`;
      const slotContent = `<div data-then-marker>${thenContent}</div>`;

      // Act
      const result = await renderAstroComponent(If, {
        props: { condition: true },
        slots: {
          default: slotContent,
        },
      });

      // Assert
      expect(result.innerHTML).toContain("Nested content");
      expect(result.innerHTML).toContain("More content");
    });
  });

  describe("cuando la condición es falsa", () => {
    test("debería renderizar el contenido else cuando la condición es falsa", async () => {
      // Arrange
      const thenContent = "<p>This is the then content</p>";
      const elseContent = "<p>This is the else content</p>";
      const slotContent = `<div data-then-marker>${thenContent}</div><div data-else-marker>${elseContent}</div>`;

      // Act
      const result = await renderAstroComponent(If, {
        props: { condition: false },
        slots: {
          default: slotContent,
        },
      });

      // Assert
      expect(result.innerHTML).toContain("This is the else content");
      expect(result.innerHTML).not.toContain("This is the then content");
    });

    test("debería manejar contenido else con atributos adicionales", async () => {
      // Arrange
      const elseContent = "<span>Else with attributes</span>";
      const slotContent = `<div data-else-marker class="test" id="else-div">${elseContent}</div>`;

      // Act
      const result = await renderAstroComponent(If, {
        props: { condition: false },
        slots: {
          default: slotContent,
        },
      });

      // Assert
      expect(result.innerHTML).toContain("Else with attributes");
      expect(result.innerHTML).not.toContain("data-else-marker");
    });
  });

  describe("casos extremos", () => {
    test("debería manejar marcador then faltante", async () => {
      // Arrange
      const elseContent = "<p>Else content only</p>";
      const slotContent = `<div data-else-marker>${elseContent}</div>`;

      // Act
      const result = await renderAstroComponent(If, {
        props: { condition: true },
        slots: {
          default: slotContent,
        },
      });

      // Assert
      expect(result.innerHTML).toBe("");
    });

    test("debería manejar marcador else faltante", async () => {
      // Arrange
      const thenContent = "<p>Then content only</p>";
      const slotContent = `<div data-then-marker>${thenContent}</div>`;

      // Act
      const result = await renderAstroComponent(If, {
        props: { condition: false },
        slots: {
          default: slotContent,
        },
      });

      // Assert
      expect(result.innerHTML).toBe("");
    });

    test("debería manejar contenido vacío en los marcadores", async () => {
      // Arrange
      const slotContent = `<div data-then-marker></div><div data-else-marker></div>`;

      // Act
      const result = await renderAstroComponent(If, {
        props: { condition: true },
        slots: {
          default: slotContent,
        },
      });

      // Assert
      expect(result.innerHTML).toBe("");
    });

    test("debería manejar HTML malformado", async () => {
      // Arrange
      const slotContent = `<div data-then-marker><p>Unclosed paragraph<div data-else-marker>Else content</div>`;

      // Act
      const result = await renderAstroComponent(If, {
        props: { condition: true },
        slots: {
          default: slotContent,
        },
      });

      // Assert
      expect(result.innerHTML).toContain("Unclosed paragraph");
    });
  });

  describe("validación de props", () => {
    test("debería manejar condición booleana verdadera", async () => {
      // Arrange
      const slotContent = `<div data-then-marker><p>Content</p></div>`;

      // Act
      const result = await renderAstroComponent(If, {
        props: { condition: true },
        slots: {
          default: slotContent,
        },
      });

      // Assert
      expect(result.innerHTML).toContain("Content");
    });

    test("debería manejar condición booleana falsa", async () => {
      // Arrange
      const slotContent = `<div data-else-marker><p>Content</p></div>`;

      // Act
      const result = await renderAstroComponent(If, {
        props: { condition: false },
        slots: {
          default: slotContent,
        },
      });

      // Assert
      expect(result.innerHTML).toContain("Content");
    });
  });
});
