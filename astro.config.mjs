// @ts-check
import { defineConfig } from "astro/config";
import { fileURLToPath } from "node:url";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import astroExpressiveCode from "astro-expressive-code";
import tailwindcss from "@tailwindcss/vite";
import node from "@astrojs/node";
import swup, { Theme } from "@swup/astro";
// https://astro.build/config
// Predefine Vite config with JSDoc typing to avoid excess property checks
/** @type {import('vite').UserConfig} */
const viteConfig = {
  resolve: {
    alias: {
      "@components": fileURLToPath(
        new URL("./src/components", import.meta.url)
      ),
      "~": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  plugins: [
    tailwindcss(),
    {
      name: "exclude-public-test-files",
      /** @param {any} _ @param {any} bundle */
      generateBundle(_, bundle) {
        for (const file in bundle) {
          if (file.startsWith("public/") && file.endsWith(".test.js")) {
            delete bundle[file];
          }
        }
      },
      apply: "build",
    },
  ],
};

export default defineConfig({
  i18n: {
    defaultLocale: "es",
    locales: ["es", "en"],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  site: "https://erades.com",
  output: "server",
  adapter: node({
    mode: "standalone",
  }),
  markdown: {
    shikiConfig: {
      theme: "dracula",
    },
  },
  integrations: [
    swup({
      containers: ["main"],
      cache: true,
      preload: true,
      accessibility: true,
      native: true,
      forms: false,
      morph: false,
      parallel: false,
      progress: true,
      routes: false,
      smoothScrolling: true,
      updateBodyClass: false,
      updateHead: true,
      reloadScripts: true,
      debug: false,
      loadOnIdle: true,
      globalInstance: false,
    }),
    astroExpressiveCode({
      themes: ["dracula"],
    }),
    mdx(),
    sitemap({
      i18n: {
        defaultLocale: "es",
        locales: {
          es: "es-ES",
          en: "en-US",
        },
      },
      filter: (page) => {
        // Excluir páginas de prueba y desarrollo
        return !page.includes("/test/") && !page.includes("/_dev/");
      },
      changefreq: "weekly",
      priority: 0.7,
    }),
  ],
  vite: viteConfig,
});
