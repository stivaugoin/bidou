import { chromium, FullConfig } from "@playwright/test";

const credentials = {
  email: process.env.E2E_USER_EMAIL ?? "",
  password: process.env.E2E_USER_PASSWORD ?? "",
};

async function globalSetup(config: FullConfig) {
  console.log("globalSetup");
  console.log("credentials", credentials);
  const [project] = config.projects;
  console.log(`Running global setup for project ${project.name}`);
  const { storageState, baseURL } = project.use;

  const browser = await chromium.launch();
  const page = await browser.newPage();

  await page.goto(baseURL as string);
  await page.click('input[type="email"]');
  await page.fill('input[type="email"]', credentials.email);
  await page.click('input[type="password"]');
  await page.fill('input[type="password"]', credentials.password);
  await page.click('text="Sign in with Credentials"');
  console.log("waiting for page to load");

  await page.context().storageState({
    path: storageState as string,
  });
  console.log("login complete");

  await browser.close();
}

export default globalSetup;
