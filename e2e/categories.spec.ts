import { expect, test } from "@playwright/test";

test("should navigate to Categories page", async ({ page }) => {
  await page.goto("/");
  await page.locator("nav a", { hasText: "Categories" }).click();
  await expect(page).toHaveURL("/categories");
});

test("should have a page title", async ({ page }) => {
  await page.goto("/categories");
  await expect(page).toHaveTitle(/Categories/);
});

test("should have a page header", async ({ page }) => {
  await page.goto("/categories");
  await expect(page.locator("h1")).toHaveText("Categories");
});

test("should have a create button", async ({ page }) => {
  await page.goto("/categories");
  await expect(page.locator("#createBtn", { hasText: "Create" })).toBeVisible();
});

test("should have a table", async ({ page }) => {
  await page.goto("/categories");
  await expect(page.locator("table")).toBeVisible();
});
