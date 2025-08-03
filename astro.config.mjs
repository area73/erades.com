// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import astroExpressiveCode from "astro-expressive-code";
import tailwindcss from "@tailwindcss/vite";
import node from "@astrojs/node";
import swup, { Theme } from "@swup/astro";
// https://astro.build/config
export default defineConfig({
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
      theme: ["fade", { direction: "to-right" }],
      animationClass: "transition-",
      containers: ["main"],
      cache: true,
      preload: true,
      accessibility: true,
      ignore: null,
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
  vite: {
    plugins: [
      tailwindcss(),
      {
        name: "exclude-public-test-files",
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
  },
});
