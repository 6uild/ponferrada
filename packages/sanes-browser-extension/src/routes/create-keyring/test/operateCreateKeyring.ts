import { Page } from "puppeteer";
import TestUtils from "react-dom/test-utils";

import { getHintPhrase } from "../../../utils/localstorage/hint";
import { check, click, input, submit } from "../../../utils/test/dom";
import {
  findRenderedDOMComponentWithId,
  findRenderedE2EComponentWithId,
} from "../../../utils/test/reactElemFinder";
import { KEYRING_STATUS_ROUTE } from "../../paths";
import { CREATE_KEYRING_ID } from "../../welcome";
import {
  CREATE_KEYRING_ID_STEP_1,
  PASSWORD_CONFIRM_FIELD,
  PASSWORD_FIELD,
  TERMS_ACCEPT_FIELD,
} from "../components/NewKeyringForm";
import { CREATE_KEYRING_ID_STEP_3, SECURITY_HINT } from "../components/SecurityHintForm";
import { CREATE_KEYRING_ID_STEP_2 } from "../components/ShowWordsForm";

export const getNewKeyringInputs = (createKeyringDom: React.Component): Element[] => {
  return TestUtils.scryRenderedDOMComponentsWithTag(createKeyringDom, "input");
};

export const checkHintValidity = (createKeyringDom: React.Component, error?: string): void => {
  const elements = TestUtils.scryRenderedDOMComponentsWithTag(createKeyringDom, "p");

  if (elements.length === 0) {
    return;
  }

  expect(elements[0].textContent).toBe(error);
};

export const getPasswordValidity = (createKeyringDom: React.Component): Element => {
  return TestUtils.scryRenderedDOMComponentsWithTag(createKeyringDom, "p")[0];
};

export const getConfirmPasswordValidity = (createKeyringDom: React.Component): Element => {
  return TestUtils.scryRenderedDOMComponentsWithTag(createKeyringDom, "p")[1];
};

export const getTermsValidity = (createKeyringDom: React.Component): Element => {
  return TestUtils.scryRenderedDOMComponentsWithTag(createKeyringDom, "p")[0];
};

export const getConfirmPasswordMismatch = (createKeyringDom: React.Component): Element => {
  return TestUtils.scryRenderedDOMComponentsWithTag(createKeyringDom, "p")[0];
};

export const getNewKeyringForm = (createKeyringDom: React.Component): Element => {
  return TestUtils.findRenderedDOMComponentWithTag(createKeyringDom, "form");
};

export const getSecurityHintForm = (createKeyringDom: React.Component): Element => {
  return TestUtils.findRenderedDOMComponentWithTag(createKeyringDom, "form");
};

export const getTermsCheckboxLabel = (termsCheckbox: Element): string | null => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const titleSpan = termsCheckbox.parentElement!.parentElement!.parentElement!.querySelector(
    "span:nth-of-type(2)",
  );
  if (titleSpan === null) return null;

  return titleSpan.textContent;
};

export const isButtonDisabled = (button: Element): boolean => {
  return button.classList.contains("Mui-disabled");
};

export const submitNewKeyringE2E = async (
  page: Page,
  keyringName: string,
  password: string,
): Promise<void> => {
  await page.type(`input[name="${PASSWORD_FIELD}"]`, password);
  await page.type(`input[name="${PASSWORD_CONFIRM_FIELD}"]`, password);
  await page.click(`input[name="${TERMS_ACCEPT_FIELD}"]`);

  await page.click('button[type="submit"]');
  await findRenderedE2EComponentWithId(page, CREATE_KEYRING_ID_STEP_2);
};

export const submitNewKeyring = async (newKeyringDom: React.Component, password: string): Promise<void> => {
  const inputs = getNewKeyringInputs(newKeyringDom);

  const [passwordField, passwordConfirmField, termsAcceptField] = inputs;
  input(passwordField, password);
  input(passwordConfirmField, password);
  await check(termsAcceptField);

  const newKeyringForm = TestUtils.findRenderedDOMComponentWithTag(newKeyringDom, "form");
  const submitPasswordForm = async (): Promise<void> => {
    TestUtils.Simulate.submit(newKeyringForm);
    await findRenderedDOMComponentWithId(newKeyringDom, CREATE_KEYRING_ID_STEP_2);
  };

  await TestUtils.act(submitPasswordForm as any);
};

export const submitShowWordsE2E = async (page: Page): Promise<void> => {
  const checkbox = await page.$('input[type="checkbox"]');
  expect(checkbox).not.toBeNull();

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  await checkbox!.click();

  const mnemonic = await page.evaluate(() => {
    const element = document.querySelectorAll("p")[1];
    if (!element) throw new Error("Paragraph element not found");
    return element.textContent || "";
  });
  expect(mnemonic.split(" ").length).toBe(12);

  const buttons = await page.$$("button");
  await buttons[1].click();
  await findRenderedE2EComponentWithId(page, CREATE_KEYRING_ID_STEP_3);
};

export const submitShowWords = async (showWordsDom: React.Component): Promise<void> => {
  const continueButton = TestUtils.scryRenderedDOMComponentsWithTag(showWordsDom, "button")[1];
  click(continueButton);
  await findRenderedDOMComponentWithId(showWordsDom, CREATE_KEYRING_ID_STEP_3);
};

export const submitSecurityHintE2E = async (page: Page, securityHint: string): Promise<void> => {
  await page.type(`input[name="${SECURITY_HINT}"]`, securityHint);

  await page.click('button[type="submit"]');

  await findRenderedE2EComponentWithId(page, KEYRING_STATUS_ROUTE);
};

export const submitSecurityHint = async (securityHintDom: React.Component, hint: string): Promise<void> => {
  const hintInput = TestUtils.findRenderedDOMComponentWithTag(securityHintDom, "input");
  input(hintInput, hint);

  const form = TestUtils.findRenderedDOMComponentWithTag(securityHintDom, "form");
  submit(form);
  await findRenderedDOMComponentWithId(securityHintDom, KEYRING_STATUS_ROUTE);
  expect(getHintPhrase()).toBe(hint);
};

export const travelToCreateKeyringNewKeyringStep = async (page: Page): Promise<void> => {
  await page.click(`#${CREATE_KEYRING_ID}`);

  await findRenderedE2EComponentWithId(page, CREATE_KEYRING_ID_STEP_1);
};
