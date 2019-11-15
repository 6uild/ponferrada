import { Browser, Page } from "puppeteer";
import { randomString } from "ui-logic";

import { closeBrowser, createPage, launchBrowser } from "../../utils/test/e2e";
import { withChainsDescribe } from "../../utils/test/testExecutor";
import { submitRecoveryWordsE2E, travelToRestoreKeyringStep } from "./test/operateRestoreKeyring";

withChainsDescribe("E2E > Restore Keyring route", () => {
  const password = randomString(10);
  const mnemonic = "degree tackle suggest window test behind mesh extra cover prepare oak script";

  let browser: Browser;
  let page: Page;

  beforeEach(async () => {
    browser = await launchBrowser();
    page = await createPage(browser);
  }, 45000);

  afterEach(async () => {
    await closeBrowser(browser);
  });

  it("should redirect to restore keyring route, fill recovery words and redirect to account route", async () => {
    await travelToRestoreKeyringStep(page);
    await submitRecoveryWordsE2E(page, mnemonic, password);
  }, 60000);
});
