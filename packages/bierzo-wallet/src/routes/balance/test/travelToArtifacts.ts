import { Browser, Page } from "puppeteer";
import TestUtils from "react-dom/test-utils";
import { Store } from "redux";
import { sleep } from "ui-logic";

import { history } from "../../../routes";
import { createDom } from "../../../utils/test/dom";
import { createExtensionPage, getBackgroundPage } from "../../../utils/test/e2e";
import { whenOnNavigatedToE2eRoute, whenOnNavigatedToRoute } from "../../../utils/test/navigation";
import { acceptEnqueuedRequest, submitExtensionCreateWalletForm } from "../../../utils/test/persona";
import { ARTIFACT_ROUTE } from "../../paths";

export const travelToArtifacts = async (store: Store): Promise<React.Component> => {
  const dom = createDom(store);
  TestUtils.act((): void => {
    history.push(ARTIFACT_ROUTE);
  });
  await whenOnNavigatedToRoute(ARTIFACT_ROUTE);

  return dom;
};

export async function travelToArtifactsE2E(browser: Browser, page: Page): Promise<void> {
  await getBackgroundPage(browser);
  const extensionPage = await createExtensionPage(browser);
  await submitExtensionCreateWalletForm(extensionPage, "12345678");
  await extensionPage.close();
  await page.bringToFront();
  // Click on login button
  await page.click("button");
  await sleep(1000);
  await acceptEnqueuedRequest(browser);
  await page.bringToFront();
  await whenOnNavigatedToE2eRoute(page, ARTIFACT_ROUTE);
}
