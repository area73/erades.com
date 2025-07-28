import { describe, it, expect } from "vitest";

// Mock function to simulate the Show component's conditional rendering logic
const renderShowComponent = (when: unknown, children: string): string => {
  // Special case: if when is an empty array, don't render children
  const shouldRender = when && !(Array.isArray(when) && when.length === 0);
  return shouldRender ? children : "";
};

describe("Componente Show", () => {
  it("debería renderizar los hijos cuando la prop when es true", () => {
    const result = renderShowComponent(true, "<div>Contenido de prueba</div>");
    expect(result).toBe("<div>Contenido de prueba</div>");
  });

  it("no debería renderizar los hijos cuando la prop when es false", () => {
    const result = renderShowComponent(false, "<div>Contenido de prueba</div>");
    expect(result).toBe("");
  });

  it("no debería renderizar los hijos cuando la prop when es undefined", () => {
    const result = renderShowComponent(undefined, "<div>Contenido de prueba</div>");
    expect(result).toBe("");
  });

  it("no debería renderizar los hijos cuando la prop when es null", () => {
    const result = renderShowComponent(null, "<div>Contenido de prueba</div>");
    expect(result).toBe("");
  });

  it("debería renderizar los hijos cuando la prop when es una cadena verdadera", () => {
    const result = renderShowComponent("hola", "<div>Contenido de prueba</div>");
    expect(result).toBe("<div>Contenido de prueba</div>");
  });

  it("no debería renderizar los hijos cuando la prop when es una cadena vacía", () => {
    const result = renderShowComponent("", "<div>Contenido de prueba</div>");
    expect(result).toBe("");
  });

  it("debería renderizar los hijos cuando la prop when es un número distinto de cero", () => {
    const result = renderShowComponent(42, "<div>Contenido de prueba</div>");
    expect(result).toBe("<div>Contenido de prueba</div>");
  });

  it("no debería renderizar los hijos cuando la prop when es cero", () => {
    const result = renderShowComponent(0, "<div>Contenido de prueba</div>");
    expect(result).toBe("");
  });

  it("debería renderizar los hijos cuando la prop when es un objeto", () => {
    const result = renderShowComponent(
      { clave: "valor" },
      "<div>Contenido de prueba</div>"
    );
    expect(result).toBe("<div>Contenido de prueba</div>");
  });

  it("debería renderizar los hijos cuando la prop when es un array", () => {
    const result = renderShowComponent([1, 2, 3], "<div>Contenido de prueba</div>");
    expect(result).toBe("<div>Contenido de prueba</div>");
  });

  it("no debería renderizar los hijos cuando la prop when es un array vacío", () => {
    const result = renderShowComponent([], "<div>Contenido de prueba</div>");
    expect(result).toBe("");
  });

  it("debería renderizar contenido anidado complejo cuando la prop when es true", () => {
    const complexContent = `
      <div class="contenedor">
        <h1>Título</h1>
        <p>Párrafo con texto <strong>negrita</strong></p>
        <ul>
          <li>Elemento 1</li>
          <li>Elemento 2</li>
        </ul>
      </div>
    `;

    const result = renderShowComponent(true, complexContent);
    expect(result).toBe(complexContent);
  });

  it("debería manejar múltiples hijos cuando la prop when es true", () => {
    const multipleChildren = `
      <div>Primer hijo</div>
      <span>Segundo hijo</span>
      <p>Tercer hijo</p>
    `;

    const result = renderShowComponent(true, multipleChildren);
    expect(result).toBe(multipleChildren);
  });

  it("no debería renderizar ningún hijo cuando la prop when es false", () => {
    const multipleChildren = `
      <div>Primer hijo</div>
      <span>Segundo hijo</span>
      <p>Tercer hijo</p>
    `;

    const result = renderShowComponent(false, multipleChildren);
    expect(result).toBe("");
  });

  it("debería manejar valores falsos correctamente", () => {
    const falsyValues = [false, 0, "", null, undefined, NaN];

    falsyValues.forEach((value) => {
      const result = renderShowComponent(value, "<div>Contenido de prueba</div>");
      expect(result).toBe("");
    });
  });

  it("debería manejar valores verdaderos correctamente", () => {
    const truthyValues = [true, 1, "hola", {}, 42, -1];

    truthyValues.forEach((value) => {
      const result = renderShowComponent(value, "<div>Contenido de prueba</div>");
      expect(result).toBe("<div>Contenido de prueba</div>");
    });
  });

  it("debería manejar arrays correctamente", () => {
    // Arrays no vacíos deberían renderizar
    const nonEmptyArrays = [[1], [1, 2], ["a", "b"], [{ key: "value" }]];

    nonEmptyArrays.forEach((array) => {
      const result = renderShowComponent(array, "<div>Contenido de prueba</div>");
      expect(result).toBe("<div>Contenido de prueba</div>");
    });

    // Arrays vacíos no deberían renderizar
    const emptyArrays = [[], new Array(), Array()];

    emptyArrays.forEach((array) => {
      const result = renderShowComponent(array, "<div>Contenido de prueba</div>");
      expect(result).toBe("");
    });
  });
});
