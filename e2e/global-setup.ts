import { chromium, FullConfig } from "@playwright/test";

async function globalSetup(config: FullConfig) {
  const [project] = config.projects;
  const { storageState, baseURL } = project.use;

  const browser = await chromium.launch();
  const page = await browser.newPage();

  await page.goto(baseURL as string);
  await page.click('input[type="password"]');
  await page.fill('input[type="password"]', "password");
  await page.click('text="Sign in with Password"');

  await page.context().storageState({
    path: storageState as string,
  });

  await browser.close();
}

export default globalSetup;
