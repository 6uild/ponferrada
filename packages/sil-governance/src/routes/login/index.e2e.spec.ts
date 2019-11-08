import express, { Request, Response } from "express";
import { Server } from "http";
import { Browser, Page } from "puppeteer";
import { sleep } from "ui-logic";

import { communicationTexts } from "../../communication";
import {
  closeBrowser,
  closeToast,
  createExtensionPage,
  createPage,
  getBackgroundPage,
  launchBrowser,
} from "../../utils/test/e2e";
import { whenOnNavigatedToE2eRoute } from "../../utils/test/navigation";
import {
  acceptGetIdentitiesRequest,
  rejectGetIdentitiesRequest,
  submitExtensionCreateWalletForm,
} from "../../utils/test/persona";
import { withChainsDescribe } from "../../utils/test/testExecutor";
import { travelToDashboardE2e } from "../dashboard/test/travelToDashboard";
import { DASHBOARD_ROUTE } from "../paths";

withChainsDescribe("E2E > Login route", () => {
  let browser: Browser;
  let page: Page;
  let extensionPage: Page;
  let server: Server;

  beforeAll(() => {
    const app = express();

    app.use(express.static(require("path").join(__dirname, "/../../../build")));

    app.get("/*", function(req: Request, res: Response) {
      res.sendFile(require("path").join(__dirname, "build", "index.html"));
    });

    server = app.listen(9000);
  });

  afterEach(async () => {
    await closeBrowser(browser);
  });

  afterAll(() => {
    server.close();
  });

  async function checkLoginMessage(page: Page): Promise<void> {
    const toastTextElement = await page.$("h6");
    if (!toastTextElement) throw new Error("h6 element not found");
    const text = await (await toastTextElement.getProperty("textContent")).jsonValue();
    expect(text).toBe(communicationTexts.noMatchingIdentityMessage);

    await closeToast(page);
  }

  it("should redirect when enqueued login request is accepted", async (): Promise<void> => {
    browser = await launchBrowser();
    page = await createPage(browser);
    extensionPage = await createExtensionPage(browser);
    await getBackgroundPage(browser);
    await submitExtensionCreateWalletForm(extensionPage, "12345678");
    await page.bringToFront();
    await travelToDashboardE2e(page);
    await sleep(1000);
    await acceptGetIdentitiesRequest(extensionPage);
    await page.bringToFront();
    await whenOnNavigatedToE2eRoute(page, DASHBOARD_ROUTE);
  }, 45000);

  it("should stay in login view if enqueued login request is rejected", async (): Promise<void> => {
    browser = await launchBrowser();
    page = await createPage(browser);
    extensionPage = await createExtensionPage(browser);
    await getBackgroundPage(browser);
    await submitExtensionCreateWalletForm(extensionPage, "12345678");
    await page.bringToFront();
    await travelToDashboardE2e(page);
    await sleep(1000);
    await rejectGetIdentitiesRequest(extensionPage);
    await page.bringToFront();
    await checkLoginMessage(page);
  }, 45000);

  it("shows login to Haxor extension if not persona detected", async (): Promise<void> => {
    browser = await launchBrowser();
    page = await createPage(browser);
    await getBackgroundPage(browser);
    await page.bringToFront();
    await sleep(1000);

    await page.click("button");
    await sleep(500);

    await checkLoginMessage(page);
  }, 45000);

  it("shows install Haxor extension message", async (): Promise<void> => {
    browser = await launchBrowser(0, false);
    page = await createPage(browser);
    await page.bringToFront();

    await sleep(1000);

    await page.click("button");
    await sleep(500);

    const toastTextElement = await page.$("h6");
    if (!toastTextElement) throw new Error("h6 element not found");
    const text = await (await toastTextElement.getProperty("textContent")).jsonValue();
    expect(text).toBe(communicationTexts.notAvailableMessage);

    await closeToast(page);
  }, 45000);
});
