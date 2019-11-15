import { Browser, Page } from "puppeteer";
import { randomString } from "ui-logic";

import { closeBrowser, createPage, launchBrowser } from "../../utils/test/e2e";
import { withChainsDescribe } from "../../utils/test/testExecutor";
import {
  submitNewKeyringE2E,
  submitSecurityHintE2E,
  submitShowWordsE2E,
  travelToCreateKeyringNewKeyringStep,
} from "./test/operateCreateKeyring";

withChainsDescribe("DOM > Create Keyring route", () => {
  let browser: Browser;
  let page: Page;

  beforeEach(async () => {
    browser = await launchBrowser();
    page = await createPage(browser);
  }, 45000);

  afterEach(async () => {
    await closeBrowser(browser);
  });

  it("should redirect to create keyring route, fill required data, show recovery words and hint", async () => {
    await travelToCreateKeyringNewKeyringStep(page);
    await submitNewKeyringE2E(page, randomString(10), randomString(10));
    await submitShowWordsE2E(page);
    await submitSecurityHintE2E(page, randomString(10));
  }, 60000);
});
