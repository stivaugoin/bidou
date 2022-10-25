import { expect, test } from "@playwright/test";

test("should navigate to Expenses page", async ({ page }) => {
  await page.goto("/");
  await page
    .locator(".mantine-Group-root > a", { hasText: "Expenses" })
    .click();
  await expect(page).toHaveURL("/expenses");
});

test("should have a page title", async ({ page }) => {
  await page.goto("/expenses");
  await expect(page).toHaveTitle(/Expenses/);
});

test("should have a page header", async ({ page }) => {
  await page.goto("/expenses");
  await expect(page.locator("h1")).toHaveText("Expenses");
});

test("should have a create button", async ({ page }) => {
  await page.goto("/expenses");
  await expect(page.locator("#createBtn", { hasText: "Create" })).toBeVisible();
});

test("should have at least one table", async ({ page }) => {
  await page.goto("/expenses");
  await expect(page.locator("table").first()).toBeVisible();
});
