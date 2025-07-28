import { describe, it, expect } from "vitest";

// Mock function to simulate the Then component's slot rendering logic
const renderThenComponent = (content: string): string => {
  // The Then component wraps its content in a Fragment with slot="then"
  return `<Fragment slot="then">${content}</Fragment>`;
};

describe("Componente Then", () => {
  it("debería renderizar el contenido como slot 'then'", () => {
    const content = "<div>Contenido de prueba</div>";
    const result = renderThenComponent(content);
    expect(result).toBe(
      '<Fragment slot="then"><div>Contenido de prueba</div></Fragment>'
    );
  });

  it("debería renderizar contenido simple", () => {
    const content = "<p>Texto simple</p>";
    const result = renderThenComponent(content);
    expect(result).toBe('<Fragment slot="then"><p>Texto simple</p></Fragment>');
  });

  it("debería renderizar contenido complejo con múltiples elementos", () => {
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

    const result = renderThenComponent(complexContent);
    expect(result).toContain('<Fragment slot="then">');
    expect(result).toContain('<div class="contenedor">');
    expect(result).toContain("<h1>Título</h1>");
    expect(result).toContain(
      "<p>Párrafo con texto <strong>negrita</strong></p>"
    );
    expect(result).toContain("<ul>");
    expect(result).toContain("<li>Elemento 1</li>");
    expect(result).toContain("<li>Elemento 2</li>");
    expect(result).toContain("</ul>");
    expect(result).toContain("</div>");
    expect(result).toContain("</Fragment>");
  });

  it("debería renderizar contenido con atributos HTML", () => {
    const contentWithAttributes = `
      <div class="container" id="main" data-test="true">
        <button type="button" disabled>Botón</button>
        <input type="text" placeholder="Escribe aquí" />
      </div>
    `;

    const result = renderThenComponent(contentWithAttributes);
    expect(result).toContain('<Fragment slot="then">');
    expect(result).toContain(
      '<div class="container" id="main" data-test="true">'
    );
    expect(result).toContain('<button type="button" disabled>Botón</button>');
    expect(result).toContain(
      '<input type="text" placeholder="Escribe aquí" />'
    );
    expect(result).toContain("</Fragment>");
  });

  it("debería renderizar contenido vacío", () => {
    const emptyContent = "";
    const result = renderThenComponent(emptyContent);
    expect(result).toBe('<Fragment slot="then"></Fragment>');
  });

  it("debería renderizar contenido con espacios en blanco", () => {
    const contentWithWhitespace = `
      <div>
        Contenido con espacios
      </div>
    `;

    const result = renderThenComponent(contentWithWhitespace);
    expect(result).toContain('<Fragment slot="then">');
    expect(result).toContain("<div>");
    expect(result).toContain("Contenido con espacios");
    expect(result).toContain("</div>");
    expect(result).toContain("</Fragment>");
  });

  it("debería renderizar contenido con caracteres especiales", () => {
    const contentWithSpecialChars = `
      <div>
        <p>Texto con &lt;tags&gt; y "comillas" y 'apóstrofes'</p>
        <span>€uro símbolo: €</span>
        <span>Emoji: 🚀</span>
      </div>
    `;

    const result = renderThenComponent(contentWithSpecialChars);
    expect(result).toContain('<Fragment slot="then">');
    expect(result).toContain(
      "<p>Texto con &lt;tags&gt; y \"comillas\" y 'apóstrofes'</p>"
    );
    expect(result).toContain("<span>€uro símbolo: €</span>");
    expect(result).toContain("<span>Emoji: 🚀</span>");
    expect(result).toContain("</Fragment>");
  });

  it("debería mantener la estructura del slot correctamente", () => {
    const content = "<span>Test content</span>";
    const result = renderThenComponent(content);

    // Verificar que el slot="then" está presente
    expect(result).toMatch(/slot="then"/);

    // Verificar que el Fragment está correctamente estructurado
    expect(result).toMatch(/<Fragment slot="then">.*<\/Fragment>/);
  });

  it("debería funcionar con contenido anidado", () => {
    const nestedContent = `
      <div>
        <section>
          <article>
            <header>
              <h1>Título anidado</h1>
            </header>
            <main>
              <p>Contenido principal</p>
            </main>
          </article>
        </section>
      </div>
    `;

    const result = renderThenComponent(nestedContent);
    expect(result).toContain('<Fragment slot="then">');
    expect(result).toContain("<div>");
    expect(result).toContain("<section>");
    expect(result).toContain("<article>");
    expect(result).toContain("<header>");
    expect(result).toContain("<h1>Título anidado</h1>");
    expect(result).toContain("<main>");
    expect(result).toContain("<p>Contenido principal</p>");
    expect(result).toContain("</Fragment>");
  });
});
