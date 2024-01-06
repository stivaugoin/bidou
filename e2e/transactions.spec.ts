import { expect, test } from "@playwright/test";

test("Transactions page", async ({ page }) => {
  await page.goto("/");

  // Should navigate to Transactions page
  const selector = ".mantine-Group-root > a";
  await page.locator(selector, { hasText: "Transactions" }).click();
  await expect(page).toHaveURL("/transactions");

  // Should contain all expected elements
  await expect(page).toHaveTitle(/Transactions/);
  await expect(page.locator("h1")).toHaveText("Transactions");
  await expect(page.locator("#createBtn", { hasText: "Add" })).toBeVisible();
  await expect(page.getByRole("toolbar")).toHaveCount(1);

  // TODO: Test creation of a new transaction
  // TODO: Test deletion of a transaction
  // TODO: Test editing of a transaction
  // TODO: Test filters
});
