import { expect, test } from "@playwright/test";

test("should navigate to Incomes page", async ({ page }) => {
  await page.goto("/");
  await page.locator("nav a", { hasText: "Incomes" }).click();
  await expect(page).toHaveURL("/incomes");
});

test("should have a page title", async ({ page }) => {
  await page.goto("/incomes");
  await expect(page).toHaveTitle(/Incomes/);
});

test("should have a page header", async ({ page }) => {
  await page.goto("/incomes");
  await expect(page.locator("h1")).toHaveText("Incomes");
});

test("should have a create button", async ({ page }) => {
  await page.goto("/incomes");
  await expect(page.locator("#createBtn", { hasText: "Create" })).toBeVisible();
});

test("should have at least one table", async ({ page }) => {
  await page.goto("/incomes");
  await expect(page.locator("table").first()).toBeVisible();
});
