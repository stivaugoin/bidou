import { expect, test } from "@playwright/test";

test("Categories page", async ({ page }) => {
  await page.goto("/");

  // Should navigate to Categories page
  const selector = ".mantine-Group-root > a";
  await page.locator(selector, { hasText: "Categories" }).click();
  await expect(page).toHaveURL("/categories");

  // Should contain all expected elements
  await expect(page).toHaveTitle(/Categories/);
  await expect(page.locator("h1")).toHaveText("Categories");
  await expect(page.locator("#createBtn", { hasText: "Create" })).toBeVisible();
  await expect(page.getByRole("list")).toHaveCount(2);

  // TODO: Test creation of a new category
  // TODO: Test deletion of a category
  // TODO: Test editing of a category
});
