import { chromium, FullConfig } from "@playwright/test";

const credentials = {
  email: process.env.E2E_USER_EMAIL ?? "",
  password: process.env.E2E_USER_PASSWORD ?? "",
};

async function globalSetup(config: FullConfig) {
  const [project] = config.projects;
  const { storageState, baseURL } = project.use;

  const browser = await chromium.launch();
  const page = await browser.newPage();

  await page.goto(baseURL as string);
  await page.click('input[type="email"]');
  await page.fill('input[type="email"]', credentials.email);
  await page.click('input[type="password"]');
  await page.fill('input[type="password"]', credentials.password);
  await page.click('text="Sign in with Credentials"');

  await page.context().storageState({
    path: storageState as string,
  });

  await browser.close();
}

export default globalSetup;
