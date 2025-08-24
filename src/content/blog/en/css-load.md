---
title: 'CSS: Load Strategies'
description: >-
  Practical guide on CSS loading: render blocking, strategies (preload, media,
  inline) and web performance.
pubDate: 2025-08-23T00:00:00.000Z
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
## Why is it important to know how CSS is loaded?

We might think it is because of the weight (many bytes to send to the client), but the answer is simpler, because it **blocks the browser rendering**.

### **CSS loading diagram**

![css-load](/css-load.drawio.png)

- **HTML Parser:**<br>
  This is the first step, where the browser analyzes the HTML document to create the DOM.
- **CSS Parser:**<br>
  When the HTML parser encounters CSS style sheets, it passes them to the CSS parser.
- **CSSOM (CSS Object Model):**<br>The CSS parser creates the CSSOM, a tree-like structure that represents the styles of the document.
- **DOM:**<br>The HTML parser creates this tree structure of the HTML document.
- **Render Tree:**<br>It is the rendering from the combination of the DOM and the CSSOM. This tree includes only the visible elements and their computed styles and applies the cascade rules at the same time.
- **Cascade Rules:**<br> This is where the browser applies the cascade, specificity, and inheritance rules of CSS to determine the final styles of each element.
- **Final Computed Style:**<br> It is the final result for each element, showing all applied styles, which is used for subsequent Layout/reflow and Paint steps.

### **Ways to Load CSS**

#### **External** (`<link ...>`)

<br>

```html
<head>
  <!-- Blocking load by default -->
  <link rel="stylesheet" href="/assets/styles.css" />
</head>
```

**Notes:**

- **Blocks the first render** until `styles.css` is parsed.
- To mitigate this, we could limit it by media by taking out print styles for example.

```html
<link rel="stylesheet" href="/assets/print.css" media="print" />
```

#### Internal (`<style>`)

<hr>

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

**Notes:**

- It is parsed in situ.
- Useful for small critical CSS.

#### Inline (in the style attribute)

<hr>

```html
<div style="color: tomato; font-weight: 600">Text with inline style</div>
```

**Notes:**

- Maximum precedence (except for `!important`).
- Not cacheable
- Not reusable (HTML can be cached but parsing has to be done again)

#### Imported within another CSS (`@import`)

<hr>

```css
/* main.css */
@import url("/assets/base.css");
@import url("/assets/theme.css") screen and (min-width: 48rem);

.container {
  margin-inline: auto;
}
```

Or from `<style>`:

```html
<style>
  @import url("/assets/base.css");
  body {
    font-family: system-ui;
  }
</style>
```

**Notes:**

- Evaluated in order of appearance.
- Penalizes performance
  - **Chain request**
  - Generates new server requests.
- **Serious security issues**, they can steal your user passwords with a simple CSS
- If after this you want to continue using it I suppose it's because you like risk. I had a phrase when I was young for when I did crazy things
  > Commander Salamander: Too fast to live, too young to die"

#### Dynamically by JS (injecting `<link>` or `<style>`)

<hr>

```html
<!-- **Insert dynamic link (lazy styles)** -->
<script>
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = "/assets/chunk-above-the-fold.css";
  document.head.appendChild(link);
</script>
```

```html
<!-- **Insert style with rules (generated or feature‑flag)** -->
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

**Notes:**

- Applied after parsing/attaching.
- Useful for style code‑splitting or runtime theming.

### In summary

If we look at the blocks, differentiating between **network block** (latency/download) and **parse/render block** (the parser stops while processing rules), we would have something like this:

| Charging Form               | Network Block | Parse/Render Block | Notes                                                                 |
| --------------------------- | -------------- | ------------------ | --------------------------------------------------------------------- |
| **External Sheet (link)**   | ✅ Yes         | ✅ Yes (until integrate) | Wait to download → parse → integrate in CSSOM. Blocks FCP/LCP.        |
| **Internal (style)**       | ❌ No          | ✅ Yes (minimum)    | It is parsed inline in the HTML. No network wait, only local CPU.    |
| **Inline (style attribute)** | ❌ No          | ✅ Yes (when applied)      | Applied instantly to the element. Minimal cost per specific rule.    |
| **@import in CSS**          | ✅ Yes (extra) | ✅ Yes              | **Worst case:** chain download → each import blocks the next one.     |
| **Dynamic (JS)**            | ✅ Yes         | ❌ No (async)          | Downloaded when inserting the `<link>`/`<style>`. Does not block the parser. |

**Conclusion**

- What really kills your render are the **synchronous external downloads** (link + import).
- Inline and internal only stop the parser locally (usually irrelevant except for huge CSS).
- **Dynamic does not block the parser** because it happens later, but**delays the application of styles** until it is downloaded/applied (AKA FOUC → Flash of Unstyled Content).

---

### Extra ball: Known strategies to minimize blocking

- Inline Critical CSS for the above-the-fold.
- `preload` of the main CSS and apply as a stylesheet when it loads.
- Defer of non-critical CSS with `media` and `onload` (the old JavaScript trick).
- Split CSS by route or layout.

### Preload + swap (advance downloading; apply after `onload`)

```html
<link
  rel="preload"
  as="style"
  href="/assets/late.css"
  onload="this.rel='stylesheet'"
/>
<noscript><link rel="stylesheet" href="/assets/late.css" /></noscript>
```

**notes:**

- Doesn't apply styles until onload (avoids blocking the first render).
- You must maintain a fallback in `<noscript>` just in case.

### Media to load without blocking and activate later

```html
<link
  rel="stylesheet"
  href="/assets/print.css"
  media="print"
  onload="this.media='all'"
/>
```

- It downloads in the background
- It activates when you change media to `all` .
