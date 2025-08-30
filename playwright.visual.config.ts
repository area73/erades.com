import { defineConfig, devices } from "@playwright/test";
import os from "os";

// Playwright config dedicated to visual regression tests
export default defineConfig({
  testDir: "tests/visual-regression",
  timeout: 30 * 1000,
  reporter: [["html", { open: "never" }]],
  workers: process.env.CI ? 1 : Math.ceil(os.cpus().length * 0.75),
  use: {
    baseURL: process.env.BASE_URL || "http://localhost:4321",
    headless: true,
    trace: "on",
    video: "retain-on-failure",
    screenshot: "only-on-failure",
    // Consistent visuals
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
  },
  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
  ],
  expect: {
    timeout: 5000,
    toHaveScreenshot: {
      threshold: 0.2, // 20% tolerance for minor diffs
      maxDiffPixels: 1000, // Max different pixels allowed
    },
    toMatchSnapshot: {
      threshold: 0.2,
    },
  },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
});

