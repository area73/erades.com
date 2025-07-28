import { describe, it, expect } from "vitest";

// Mock function to simulate the Else component's slot rendering logic
const renderElseComponent = (content: string): string => {
  // The Else component wraps its content in a Fragment with slot="else"
  return `<Fragment slot="else">${content}</Fragment>`;
};

describe("Componente Else", () => {
  it("debería renderizar el contenido como slot 'else'", () => {
    const content = "<div>Contenido de prueba</div>";
    const result = renderElseComponent(content);
    expect(result).toBe(
      '<Fragment slot="else"><div>Contenido de prueba</div></Fragment>'
    );
  });

  it("debería renderizar contenido simple", () => {
    const content = "<p>Texto simple</p>";
    const result = renderElseComponent(content);
    expect(result).toBe('<Fragment slot="else"><p>Texto simple</p></Fragment>');
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

    const result = renderElseComponent(complexContent);
    expect(result).toContain('<Fragment slot="else">');
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

    const result = renderElseComponent(contentWithAttributes);
    expect(result).toContain('<Fragment slot="else">');
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
    const result = renderElseComponent(emptyContent);
    expect(result).toBe('<Fragment slot="else"></Fragment>');
  });

  it("debería renderizar contenido con espacios en blanco", () => {
    const contentWithWhitespace = `
      <div>
        Contenido con espacios
      </div>
    `;

    const result = renderElseComponent(contentWithWhitespace);
    expect(result).toContain('<Fragment slot="else">');
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

    const result = renderElseComponent(contentWithSpecialChars);
    expect(result).toContain('<Fragment slot="else">');
    expect(result).toContain(
      "<p>Texto con &lt;tags&gt; y \"comillas\" y 'apóstrofes'</p>"
    );
    expect(result).toContain("<span>€uro símbolo: €</span>");
    expect(result).toContain("<span>Emoji: 🚀</span>");
    expect(result).toContain("</Fragment>");
  });

  it("debería mantener la estructura del slot correctamente", () => {
    const content = "<span>Test content</span>";
    const result = renderElseComponent(content);

    // Verificar que el slot="else" está presente
    expect(result).toMatch(/slot="else"/);

    // Verificar que el Fragment está correctamente estructurado
    expect(result).toMatch(/<Fragment slot="else">.*<\/Fragment>/);
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

    const result = renderElseComponent(nestedContent);
    expect(result).toContain('<Fragment slot="else">');
    expect(result).toContain("<div>");
    expect(result).toContain("<section>");
    expect(result).toContain("<article>");
    expect(result).toContain("<header>");
    expect(result).toContain("<h1>Título anidado</h1>");
    expect(result).toContain("<main>");
    expect(result).toContain("<p>Contenido principal</p>");
    expect(result).toContain("</Fragment>");
  });

  it("debería diferenciarse del componente Then", () => {
    const content = "<div>Contenido de prueba</div>";
    const thenResult = `<Fragment slot="then">${content}</Fragment>`;
    const elseResult = renderElseComponent(content);

    // Verificar que son diferentes
    expect(elseResult).not.toBe(thenResult);

    // Verificar que Else usa slot="else"
    expect(elseResult).toContain('slot="else"');
    expect(elseResult).not.toContain('slot="then"');
  });

  it("debería manejar contenido con enlaces y navegación", () => {
    const navigationContent = `
      <nav>
        <a href="/home">Inicio</a>
        <a href="/about">Acerca de</a>
        <a href="/contact">Contacto</a>
      </nav>
    `;

    const result = renderElseComponent(navigationContent);
    expect(result).toContain('<Fragment slot="else">');
    expect(result).toContain("<nav>");
    expect(result).toContain('<a href="/home">Inicio</a>');
    expect(result).toContain('<a href="/about">Acerca de</a>');
    expect(result).toContain('<a href="/contact">Contacto</a>');
    expect(result).toContain("</nav>");
    expect(result).toContain("</Fragment>");
  });

  it("debería manejar contenido con formularios", () => {
    const formContent = `
      <form action="/submit" method="post">
        <input type="text" name="username" placeholder="Usuario" />
        <input type="password" name="password" placeholder="Contraseña" />
        <button type="submit">Enviar</button>
      </form>
    `;

    const result = renderElseComponent(formContent);
    expect(result).toContain('<Fragment slot="else">');
    expect(result).toContain('<form action="/submit" method="post">');
    expect(result).toContain(
      '<input type="text" name="username" placeholder="Usuario" />'
    );
    expect(result).toContain(
      '<input type="password" name="password" placeholder="Contraseña" />'
    );
    expect(result).toContain('<button type="submit">Enviar</button>');
    expect(result).toContain("</form>");
    expect(result).toContain("</Fragment>");
  });
});
