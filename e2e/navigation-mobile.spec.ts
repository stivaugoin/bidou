import { expect, test } from "@playwright/test";

test("should have a burger button", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("#burgerBtn")).toBeVisible();
});

test("should open menu on burger button click", async ({ page }) => {
  await page.goto("/");
  await page.locator("#burgerBtn").click();
  await expect(page.locator("nav a").first()).toBeVisible();
});

test("should navigate to Incomes page", async ({ page }) => {
  await page.goto("/");
  await page.locator("#burgerBtn").click();
  await page.locator("nav a", { hasText: "Incomes" }).click();
  await expect(page).toHaveURL("/incomes");
});
test("should navigate to Expenses page", async ({ page }) => {
  await page.goto("/");
  await page.locator("#burgerBtn").click();
  await page.locator("nav a", { hasText: "Expenses" }).click();
  await expect(page).toHaveURL("/expenses");
});
test("should navigate to Categories page", async ({ page }) => {
  await page.goto("/");
  await page.locator("#burgerBtn").click();
  await page.locator("nav a", { hasText: "Categories" }).click();
  await expect(page).toHaveURL("/categories");
});
