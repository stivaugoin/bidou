import { devices, PlaywrightTestConfig } from "@playwright/test";
import dotenv from "dotenv";
import path from "path";

dotenv.config();

const config: PlaywrightTestConfig = {
  globalSetup: "./e2e/global-setup",

  timeout: 30 * 1000,
  testDir: path.join(__dirname, "e2e"),
  retries: 2,
  outputDir: "test-results/",

  webServer: {
    command: "pnpm dev",
    url: process.env.E2E_BASE_URL,
    timeout: 120 * 1000,
    reuseExistingServer: !process.env.CI,
  },

  use: {
    baseURL: process.env.E2E_BASE_URL,
    storageState: "./e2e/storage-state.json",
    trace: "retry-with-trace",
  },

  projects: [
    {
      name: "Desktop Chrome",
      testIgnore: ["**/*-mobile.spec.ts"],
      use: devices["Desktop Chrome"],
    },
    {
      name: "Desktop Firefox",
      testIgnore: ["**/*-mobile.spec.ts"],
      use: devices["Desktop Firefox"],
    },
    {
      name: "Desktop Safari",
      testIgnore: ["**/*-mobile.spec.ts"],
      use: devices["Desktop Safari"],
    },
    {
      name: "Mobile Chrome",
      testMatch: ["**/*-mobile.spec.ts"],
      use: devices["Pixel 5"],
    },
    {
      name: "Mobile Safari",
      testMatch: ["**/*-mobile.spec.ts"],
      use: devices["iPhone 12"],
    },
  ],
};
export default config;
