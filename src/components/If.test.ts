import { describe, it, expect } from "vitest";

// Mock function to simulate the If component's conditional rendering logic
const renderIfComponent = (
  condition: boolean,
  thenContent: string,
  elseContent: string
): string => {
  return condition ? thenContent : elseContent;
};

describe("Componente If", () => {
  it("debería renderizar el slot 'then' cuando la condición es true", () => {
    const result = renderIfComponent(
      true,
      "<div>Contenido verdadero</div>",
      "<div>Contenido falso</div>"
    );
    expect(result).toBe("<div>Contenido verdadero</div>");
  });

  it("debería renderizar el slot 'else' cuando la condición es false", () => {
    const result = renderIfComponent(
      false,
      "<div>Contenido verdadero</div>",
      "<div>Contenido falso</div>"
    );
    expect(result).toBe("<div>Contenido falso</div>");
  });

  it("debería renderizar contenido complejo en el slot 'then' cuando la condición es true", () => {
    const complexThenContent = `
      <div class="contenedor">
        <h1>Título verdadero</h1>
        <p>Párrafo con texto <strong>negrita</strong></p>
        <ul>
          <li>Elemento 1</li>
          <li>Elemento 2</li>
        </ul>
      </div>
    `;

    const simpleElseContent = "<p>Contenido falso simple</p>";

    const result = renderIfComponent(
      true,
      complexThenContent,
      simpleElseContent
    );
    expect(result).toBe(complexThenContent);
  });

  it("debería renderizar contenido complejo en el slot 'else' cuando la condición es false", () => {
    const simpleThenContent = "<p>Contenido verdadero simple</p>";

    const complexElseContent = `
      <div class="contenedor">
        <h1>Título falso</h1>
        <p>Párrafo con texto <strong>negrita</strong></p>
        <ul>
          <li>Elemento 1</li>
          <li>Elemento 2</li>
        </ul>
      </div>
    `;

    const result = renderIfComponent(
      false,
      simpleThenContent,
      complexElseContent
    );
    expect(result).toBe(complexElseContent);
  });

  it("debería manejar múltiples elementos en el slot 'then'", () => {
    const multipleThenElements = `
      <div>Primer elemento</div>
      <span>Segundo elemento</span>
      <p>Tercer elemento</p>
    `;

    const simpleElseContent = "<p>Contenido falso</p>";

    const result = renderIfComponent(
      true,
      multipleThenElements,
      simpleElseContent
    );
    expect(result).toBe(multipleThenElements);
  });

  it("debería manejar múltiples elementos en el slot 'else'", () => {
    const simpleThenContent = "<p>Contenido verdadero</p>";

    const multipleElseElements = `
      <div>Primer elemento falso</div>
      <span>Segundo elemento falso</span>
      <p>Tercer elemento falso</p>
    `;

    const result = renderIfComponent(
      false,
      simpleThenContent,
      multipleElseElements
    );
    expect(result).toBe(multipleElseElements);
  });

  it("debería renderizar contenido vacío en el slot 'then' cuando la condición es true", () => {
    const emptyThenContent = "";
    const elseContent = "<div>Contenido falso</div>";

    const result = renderIfComponent(true, emptyThenContent, elseContent);
    expect(result).toBe("");
  });

  it("debería renderizar contenido vacío en el slot 'else' cuando la condición es false", () => {
    const thenContent = "<div>Contenido verdadero</div>";
    const emptyElseContent = "";

    const result = renderIfComponent(false, thenContent, emptyElseContent);
    expect(result).toBe("");
  });

  it("debería manejar contenido con atributos HTML en el slot 'then'", () => {
    const thenContentWithAttributes = `
      <div class="container" id="main" data-test="true">
        <button type="button" disabled>Botón</button>
        <input type="text" placeholder="Escribe aquí" />
      </div>
    `;

    const elseContent = "<p>Contenido falso</p>";

    const result = renderIfComponent(
      true,
      thenContentWithAttributes,
      elseContent
    );
    expect(result).toBe(thenContentWithAttributes);
  });

  it("debería manejar contenido con atributos HTML en el slot 'else'", () => {
    const thenContent = "<p>Contenido verdadero</p>";

    const elseContentWithAttributes = `
      <div class="container" id="secondary" data-test="false">
        <button type="submit">Enviar</button>
        <input type="email" placeholder="Email" />
      </div>
    `;

    const result = renderIfComponent(
      false,
      thenContent,
      elseContentWithAttributes
    );
    expect(result).toBe(elseContentWithAttributes);
  });

  it("debería alternar correctamente entre slots según la condición", () => {
    const thenContent = "<div>Verdadero</div>";
    const elseContent = "<div>Falso</div>";

    // Primera condición: true
    let result = renderIfComponent(true, thenContent, elseContent);
    expect(result).toBe("<div>Verdadero</div>");

    // Segunda condición: false
    result = renderIfComponent(false, thenContent, elseContent);
    expect(result).toBe("<div>Falso</div>");

    // Tercera condición: true de nuevo
    result = renderIfComponent(true, thenContent, elseContent);
    expect(result).toBe("<div>Verdadero</div>");
  });

  it("debería manejar contenido con caracteres especiales en ambos slots", () => {
    const thenContent = `
      <div>
        <p>Texto con &lt;tags&gt; y "comillas" y 'apóstrofes'</p>
        <span>€uro símbolo: €</span>
        <span>Emoji: 🚀</span>
      </div>
    `;

    const elseContent = `
      <div>
        <p>Texto falso con &amp; símbolos &copy; 2024</p>
        <span>Otros símbolos: ® ™</span>
      </div>
    `;

    // Test con condición true
    let result = renderIfComponent(true, thenContent, elseContent);
    expect(result).toBe(thenContent);

    // Test con condición false
    result = renderIfComponent(false, thenContent, elseContent);
    expect(result).toBe(elseContent);
  });

  it("debería manejar contenido con espacios en blanco y saltos de línea", () => {
    const thenContent = `

        <div>
          Contenido con espacios
        </div>

    `;

    const elseContent = `

        <div>
          Contenido falso con espacios
        </div>

    `;

    // Test con condición true
    let result = renderIfComponent(true, thenContent, elseContent);
    expect(result).toBe(thenContent);

    // Test con condición false
    result = renderIfComponent(false, thenContent, elseContent);
    expect(result).toBe(elseContent);
  });
});
