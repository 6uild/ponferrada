import { Page } from "puppeteer";
import TestUtils from "react-dom/test-utils";

import { input, submit } from "../../../utils/test/dom";
import {
  findRenderedDOMComponentWithId,
  findRenderedE2EComponentWithId,
} from "../../../utils/test/reactElemFinder";
import { KEYRING_STATUS_ROUTE, RESTORE_KEYRING } from "../../paths";
import { IMPORT_KEYRING_ID } from "../../welcome";
import { MNEMONIC_FIELD } from "../components/SetMnemonicForm";
import {
  PASSWORD_CONFIRM_FIELD,
  PASSWORD_FIELD,
  SET_PASSWORD_STEP_RESTORE_KEYRING_ROUTE,
} from "../components/SetPasswordForm";

export const getMnemonicTextarea = (restoreKeyringDom: React.Component): Element => {
  return TestUtils.findRenderedDOMComponentWithTag(restoreKeyringDom, "textarea");
};

export const getMnemonicValidity = (restoreKeyringDom: React.Component): Element => {
  return TestUtils.scryRenderedDOMComponentsWithTag(restoreKeyringDom, "p")[0];
};

export const getMnemonicForm = (restoreKeyringDom: React.Component): Element => {
  return TestUtils.findRenderedDOMComponentWithTag(restoreKeyringDom, "form");
};

export const getPasswordInputs = (restoreKeyringDom: React.Component): Element[] => {
  return TestUtils.scryRenderedDOMComponentsWithTag(restoreKeyringDom, "input");
};

export const getPasswordValidity = (restoreKeyringDom: React.Component): Element => {
  return TestUtils.scryRenderedDOMComponentsWithTag(restoreKeyringDom, "p")[0];
};

export const getConfirmPasswordValidity = (restoreKeyringDom: React.Component): Element => {
  return TestUtils.scryRenderedDOMComponentsWithTag(restoreKeyringDom, "p")[0];
};

export const getPasswordForm = (restoreKeyringDom: React.Component): Element => {
  return TestUtils.findRenderedDOMComponentWithTag(restoreKeyringDom, "form");
};

export const isButtonDisabled = (button: Element): boolean => {
  return button.classList.contains("Mui-disabled");
};

export const submitMnemonicForm = async (
  restoreKeyringDom: React.Component,
  mnemonic: string,
): Promise<void> => {
  input(getMnemonicTextarea(restoreKeyringDom), mnemonic);
  submit(getMnemonicForm(restoreKeyringDom));
  await findRenderedDOMComponentWithId(restoreKeyringDom, SET_PASSWORD_STEP_RESTORE_KEYRING_ROUTE);
};

export const submitRecoveryWordsE2E = async (
  page: Page,
  mnemonic: string,
  password: string,
): Promise<void> => {
  await page.type(`textarea[name="${MNEMONIC_FIELD}"]`, mnemonic);
  await page.click('button[type="submit"]');
  await findRenderedE2EComponentWithId(page, SET_PASSWORD_STEP_RESTORE_KEYRING_ROUTE);

  await page.type(`input[name="${PASSWORD_FIELD}"]`, password);
  await page.type(`input[name="${PASSWORD_CONFIRM_FIELD}"]`, password);
  await page.click('button[type="submit"]');
  await findRenderedE2EComponentWithId(page, KEYRING_STATUS_ROUTE);
};

export const travelToRestoreKeyringStep = async (page: Page): Promise<void> => {
  await page.click(`#${IMPORT_KEYRING_ID}`);
  await findRenderedE2EComponentWithId(page, RESTORE_KEYRING);
};
