// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import astroExpressiveCode from "astro-expressive-code";
import tailwindcss from "@tailwindcss/vite";
import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  site: "https://example.com",
  markdown: {
    shikiConfig: {
      theme: "dracula",
    },
  },
  integrations: [
    astroExpressiveCode({
      themes: ["dracula"],
    }),
    mdx(),
    sitemap(),
    react(),
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
