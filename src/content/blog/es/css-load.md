---
title: "css-load"
description: "Estrategias para cargar CSS de forma eficiente."
pubDate: 2025-08-23
tags:
  - css
  - performance
  - wpo
categories:
  - css
  - best-practices
draft: false
heroImage: /blog-placeholder-26.png
---

## ¿Por qué es importante conocer cómo se carga el CSS?

A lo mejor podemos pensar que es por el peso (muchos bites a enviar al cliente), pero la respuesta es más
simple, porque **bloquea el renderizado del navegador**.

### **Este sería el diagrama de carga de los CSS**

![css-load](/css-load.drawio.png)

**HTML Parser:** Es el primer paso, donde el navegador analiza el documento HTML para crear el DOM.

**CSS Parser:** Cuando el analizador de HTML encuentra hojas de estilo CSS, se las pasa al analizador de CSS.

**CSSOM (CSS Object Model):** El analizador de CSS crea el CSSOM, una estructura en forma de árbol que representa los estilos del documento.

**DOM:** El analizador de HTML crea esta estructura de árbol del documento HTML.

**Render Tree (Árbol de Renderizado):** Es el renderizado a partir de la combinación del DOM y el CSSOM. Este árbol incluye solo los elementos visibles y sus estilos calculados y se aplica a la vez que las reglas de cascada.

**Cascade Rules (Reglas de Cascada):** Aquí es donde el navegador aplica las reglas de cascada, especificidad y herencia de CSS para determinar los estilos finales de cada elemento.

**Final Computed Style (Estilo Calculado Final):** Es el resultado final para cada elemento, mostrando todos los estilos aplicados, que se utiliza para los pasos posteriores de Layout/reflow (maquetación) y Paint (pintado).

### Maneras de cargar un CSS

#### Externo (`<link ...>`)

```html
<head>
  <!-- Carga bloqueante por defecto -->
  <link rel="stylesheet" href="/assets/styles.css" />
</head>
```

**Notas:**

- Bloquea el primer render hasta parsear `styles.css`.
- Para atenuarlo podríamos limitarlo por media por ejemplo sacando fuera los estilos de print

```html
<link rel="stylesheet" href="/assets/print.css" media="print" />
```

#### Interno (`<style>`)

```html
<head>
  <style>
    :root {
      --brand: #0a66c2;
    }
    body {
      color: var(--brand);
    }
  </style>
</head>
```

**Notas:**

- Se parsea in situ.
- Útil para critical CSS pequeño.

#### Inline (en el atributo style)

```html
<div style="color: tomato; font-weight: 600">Texto con estilo inline</div>
```

**Notas:**

- Máxima precedencia (salvo `!important`).
- No cachea
- No reutilizable (el HTML se puede cachear pero el parseo se tiene que volver a hacer)

#### Importándolo dentro de otro CSS (`@import`)

```css
/* main.css */
@import url("/assets/base.css");
@import url("/assets/theme.css") screen and (min-width: 48rem);

.container {
  margin-inline: auto;
}
```

O desde `<style>`:

```html
<style>
  @import url("/assets/base.css");
  body {
    font-family: system-ui;
  }
</style>
```

**Notas:**

- Evalúa en orden de aparición.
- Penaliza rendimiento
  - **Request en cadena**
  - Genera nuevas peticiones a servidores.
- **Problemas serios de seguridad**, te pueden robar los user/psw con un simple CSS
- Si después de esto lo quieres seguir usando supongo que será porque te gusta el riesgo. Yo tenía una frase de joven para cuando hacía locuras
  > Commander Salamander: Too fast to live, too young to die"

#### Dinámico por JS (inyectando `<link>` o `<style>`)

```html
<!-- **Insertar link dinámico (lazy styles)** -->
<script>
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = "/assets/chunk-above-the-fold.css";
  document.head.appendChild(link);
</script>
```

```html
<!-- **Insertar style con reglas (generadas o feature‑flag)** -->
<script>
  const style = document.createElement("style");
  style.textContent = `
    .promo { display: grid; gap: 0.5rem; }
    @media (prefers-color-scheme: dark) {
      .promo { color: white; }
    }
  `;
  document.head.appendChild(style);
</script>
```

**Notas:**

- Se aplican al terminar de parsear/adjuntar.
- Útil para code‑splitting de estilos o tematizado runtime.

### En resumen

Si atendemos a los bloqueos, diferenciando **bloqueo de red** (latencia/descarga) y **bloqueo de parseo/render** (el parser se para mientras procesa reglas), tendríamos algo así:

| Forma de carga              | Bloqueo de red | Bloqueo de parseo/render | Notas                                                                 |
| --------------------------- | -------------- | ------------------------ | --------------------------------------------------------------------- |
| **Hoja externa (link)**     | ✅ Sí          | ✅ Sí (hasta integrar)   | Espera a descargar → parsear → integrar en CSSOM. Bloquea FCP/LCP.    |
| **Interno (style)**         | ❌ No          | ✅ Sí (mínimo)           | Se parsea inline en el HTML. No hay espera de red, solo CPU local.    |
| **Inline (atributo style)** | ❌ No          | ✅ Sí (al aplicar)       | Se aplica al instante al elemento. Coste mínimo por regla puntual.    |
| **@import en CSS**          | ✅ Sí (extra)  | ✅ Sí                    | **Peor caso:** descarga en cadena → cada import bloquea el siguiente. |
| **Dinámico (JS)**           | ✅ Sí          | ❌ No (async)            | Se descarga al insertar el `<link>`/`<style>`. No bloquea el parser.  |

**Conclusión**

- Lo que realmente mata tu render son las **descargas externas síncronas** (link + import).
- Inline e interno sólo paran el parser localmente (normalmente irrelevante salvo CSS gigante).
- **Dinámico no bloquea el parser** porque ocurre después, pero **retrasa la aplicación de estilos** hasta que se descarga/aplica (AKA FOUC → Flash of Unstyled Content).

---

### Bola extra: Estrategias conocidas para minimizar el bloqueo

- Critical CSS en línea para el above-the-fold.
- `preload` del CSS principal y aplicar como stylesheet cuando cargue.
- Defer del CSS no crítico con `media` y `onload` (el viejo truquito de javascript).
- Dividir CSS por ruta o layout.

### Preload + swap (adelantar descarga; aplicar tras `onload`)

```html
<link
  rel="preload"
  as="style"
  href="/assets/late.css"
  onload="this.rel='stylesheet'"
/>
<noscript><link rel="stylesheet" href="/assets/late.css" /></noscript>
```

**notas:**

- No aplica estilos hasta el onload (evita bloquear el primer render).
- Hay que mantener un fallback en `<noscript>` por si las moscas.

### Media para cargar sin bloquear y activar luego

```html
<link
  rel="stylesheet"
  href="/assets/print.css"
  media="print"
  onload="this.media='all'"
/>
```

- Se descarga en segundo plano
- Se activa cuando cambias media a `all` .
