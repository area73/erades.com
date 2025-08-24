import { defineConfig, devices } from "@playwright/test";
import os from "os";

export default defineConfig({
  testDir: "./tests",
  timeout: 30 * 1000,
  expect: {
    timeout: 5000,
    // Configuración para regresión visual
    toHaveScreenshot: {
      threshold: 0.2, // 20% tolerance para diferencias menores
      maxDiffPixels: 1000, // Máximo de píxeles diferentes permitidos
    },
    toMatchSnapshot: {
      threshold: 0.2,
    },
  },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : Math.ceil(os.cpus().length * 0.75), // 75% de CPUs disponibles
  reporter: [["html", { open: "never" }]],
  webServer: {
    command: "pnpm build && pnpm preview --host 0.0.0.0 --port 4321",
    url: "http://127.0.0.1:4321",
    timeout: 120_000,
    reuseExistingServer: !process.env.CI,
    env: { PORT: "4321" },
  },
  use: {
    baseURL: "http://127.0.0.1:4321",
    trace: "on-first-retry",
    headless: true,
    // Configuración visual consistente
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    /*
    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },
    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] },
    },
    */
  ],
});
