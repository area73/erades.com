import { defineConfig, devices } from "@playwright/test";
import os from "os";

// Config exclusivo para tests E2E
export default defineConfig({
  testDir: "tests/e2e",
  timeout: 30 * 1000,
  reporter: [["html", { open: "never" }]],
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : Math.ceil(os.cpus().length * 0.75),

  use: {
    baseURL: process.env.BASE_URL || "http://127.0.0.1:4321",
    headless: true,
    trace: "on-first-retry",
    video: "retain-on-failure",
    screenshot: "only-on-failure",
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
  },

  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],

  expect: {
    timeout: 5000,
  },

  // Arranca la app para las pruebas E2E
  // webServer: {
  // In CI the project is built in a separate step so the server can
  // start immediately for the tests. Locally Playwright will only
  // start the already built server.
  //   command: "pnpm start",
  //   url: "http://127.0.0.1:4321",
  //   timeout: 120_000,
  //   reuseExistingServer: !process.env.CI,
  //   env: { PORT: "4321" },
  // },
});
