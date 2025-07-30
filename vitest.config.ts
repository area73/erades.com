/// <reference types="vitest" />
import { getViteConfig } from "astro/config";

export default getViteConfig({
  test: {
    globals: true,
    environment: "happy-dom",
    setupFiles: ["./src/test/setup.ts"],
    include: ["src/**/*.test.{ts,tsx,js}", "src/**/*.spec.{ts,tsx,js}"],
    exclude: [
      "node_modules",
      "dist",
      ".astro",
      "tests",
      "public/js/experiments/vector.test.js",
    ],
  },
});
