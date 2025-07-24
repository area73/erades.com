import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: ["src/**/*.test.{ts,tsx,js}", "src/**/*.spec.{ts,tsx,js}"],
    exclude: [
      "public",
      "node_modules",
      "dist",
      "**/*.astro",
      "src/content.config.ts",
    ],
    coverage: {
      provider: "v8",
      reporter: ["text", "html", "lcov"],
      include: ["src/**/*.ts", "src/**/*.tsx"],
      exclude: [
        "public",
        "node_modules",
        "dist",
        "**/*.test.*",
        "**/*.spec.*",
        "**/*.astro",
        "src/content.config.ts",
      ],
      thresholds: {
        statements: 90,
        branches: 90,
        functions: 90,
        lines: 90,
      },
    },
  },
});
