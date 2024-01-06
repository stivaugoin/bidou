import { expect, test } from "@playwright/test";

test("navigation mobile", async ({ page }) => {
  await page.goto("/");
  const burgerBtn = page.locator("#burgerBtn");

  // Should have a burger button
  await expect(burgerBtn).toBeVisible();

  // Should open menu on burger button click
  await burgerBtn.click();
  await expect(
    page.locator(".mantine-AppShell-navbar > a").first()
  ).toBeVisible();

  // Should navigate to Transactions page
  await page
    .locator(".mantine-AppShell-navbar > a", { hasText: "Transactions" })
    .click();
  await expect(page).toHaveURL("/transactions");

  // Should navigate to Categories page
  await page.locator("#burgerBtn").click();
  await page
    .locator(".mantine-AppShell-navbar > a", { hasText: "Categories" })
    .click();
  await expect(page).toHaveURL("/categories");

  // Should navigate to Settings page
  await page.locator("#burgerBtn").click();
  await page
    .locator(".mantine-AppShell-navbar > a", { hasText: "Settings" })
    .click();
  await expect(page).toHaveURL("/settings");
});
