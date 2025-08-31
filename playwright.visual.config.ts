import { defineConfig, devices } from "@playwright/test";
import os from "os";

// Config exclusivo para regresión visual (sin webServer)
export default defineConfig({
  testDir: "tests/visual-regression",
  timeout: 30 * 1000,
  reporter: [["html", { open: "never" }]],
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 4 : Math.ceil(os.cpus().length * 0.75),

  use: {
    // BASE_URL debe apuntar a un servidor ya arrancado (host o externo)
    baseURL: process.env.BASE_URL || "http://localhost:4321",
    headless: true,
    trace: "off",
    video: "retain-on-failure",
    screenshot: "only-on-failure",
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
  },

  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],

  expect: {
    timeout: 5000,
    toHaveScreenshot: {
      threshold: 0.2,
      maxDiffPixels: 1000,
    },
    toMatchSnapshot: { threshold: 0.2 },
  },
});
