import { expect, test } from "@playwright/test";

test("should navigate to Providers page", async ({ page }) => {
  await page.goto("/");
  await page.locator("nav a", { hasText: "Providers" }).click();
  await expect(page).toHaveURL("/providers");
});

test("should have a page title", async ({ page }) => {
  await page.goto("/providers");
  await expect(page).toHaveTitle(/Providers/);
});

test("should have a page header", async ({ page }) => {
  await page.goto("/providers");
  await expect(page.locator("h1")).toHaveText("Providers");
});

test("should have a create button", async ({ page }) => {
  await page.goto("/providers");
  await expect(page.locator("#createBtn", { hasText: "Create" })).toBeVisible();
});

test("should have a table", async ({ page }) => {
  await page.goto("/providers");
  await expect(page.locator("table")).toBeVisible();
});
