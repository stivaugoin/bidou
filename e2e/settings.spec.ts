import { expect, test } from "@playwright/test";

test("Settings page", async ({ page }) => {
  await page.goto("/");

  // Should navigate to Settings page
  await page.getByLabel("settings").click();
  await expect(page).toHaveURL("/settings");

  // Should contain all expected elements
  await expect(page).toHaveTitle(/Settings/);
  await expect(page.locator("h1")).toHaveText("Settings");

  // TODO: Test all settings
});
