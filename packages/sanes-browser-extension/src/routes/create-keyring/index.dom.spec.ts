import TestUtils from "react-dom/test-utils";
import { randomString } from "ui-logic";

import {
  mockCreatePersona,
  mockPersonaResponse,
  processCreateKeyring,
} from "../../extension/background/model/persona/test/persona";
import { check, click, input, submit } from "../../utils/test/dom";
import { travelToCreateKeyring, travelToWelcome, whenOnNavigatedToRoute } from "../../utils/test/navigation";
import { findRenderedDOMComponentWithId } from "../../utils/test/reactElemFinder";
import { mayTestChains } from "../../utils/test/testExecutor";
import { KEYRING_STATUS_ROUTE, WELCOME_ROUTE } from "../paths";
import { CREATE_KEYRING_ID_STEP_1 } from "./components/NewKeyringForm";
import { CREATE_KEYRING_ID_STEP_3 } from "./components/SecurityHintForm";
import { CREATE_KEYRING_ID_STEP_2 } from "./components/ShowWordsForm";
import {
  checkHintValidity,
  getConfirmPasswordMismatch,
  getConfirmPasswordValidity,
  getNewKeyringForm,
  getNewKeyringInputs,
  getPasswordValidity,
  getTermsCheckboxLabel,
  getTermsValidity,
  isButtonDisabled,
  submitNewKeyring,
  submitShowWords,
} from "./test/operateCreateKeyring";

describe("DOM > Feature > CreateKeyring", () => {
  const password = randomString(10);
  const mnemonic = "badge cattle stool execute involve main mirror envelope brave scrap involve simple";
  const hint = randomString(10);
  const personaMock = mockPersonaResponse([], mnemonic, []);

  let createKeyringDom: React.Component;

  beforeEach(async () => {
    createKeyringDom = await travelToCreateKeyring();
  }, 10000);

  mayTestChains(
    "should finish the create keyring three steps process",
    async () => {
      mockCreatePersona(personaMock);
      await processCreateKeyring();
    },
    10000,
  );

  describe("New Keyring Step", () => {
    let newKeyringInputs: Element[];
    let passwordInput: Element;
    let passwordConfirmInput: Element;
    let termsAcceptField: Element;
    let newAccountForm: Element;
    let buttons: Element[];
    let backButton: Element;
    let continueButton: Element;

    beforeEach(async () => {
      newKeyringInputs = getNewKeyringInputs(createKeyringDom);
      [passwordInput, passwordConfirmInput, termsAcceptField] = newKeyringInputs;
      newAccountForm = getNewKeyringForm(createKeyringDom);
      buttons = TestUtils.scryRenderedDOMComponentsWithTag(createKeyringDom, "button");
      [backButton, continueButton] = buttons;
    });

    it("has three inputs", () => {
      expect(newKeyringInputs.length).toBe(3);
    }, 10000);

    it('has a valid "Password" input', async () => {
      expect(passwordInput.getAttribute("placeholder")).toBe("Password");

      input(passwordConfirmInput, password);
      await check(termsAcceptField);

      await submit(newAccountForm);
      expect(getPasswordValidity(createKeyringDom).textContent).toBe("Required");

      input(passwordInput, randomString(7));
      expect(getPasswordValidity(createKeyringDom).textContent).toBe(
        "Password should have at least 8 characters",
      );

      input(passwordInput, password);
      expect(getPasswordValidity(createKeyringDom)).toBeUndefined();
    }, 10000);

    it('has a valid "Confirm Password" input', async () => {
      expect(passwordConfirmInput.getAttribute("placeholder")).toBe("Confirm Password");

      await check(termsAcceptField);

      await submit(newAccountForm);
      expect(getConfirmPasswordValidity(createKeyringDom).textContent).toBe("Required");

      input(passwordInput, password);

      input(passwordConfirmInput, randomString(10));
      expect(getConfirmPasswordMismatch(createKeyringDom).textContent).toBe("Passwords mismatch");

      input(passwordConfirmInput, password);
      expect(getConfirmPasswordValidity(createKeyringDom)).toBeUndefined();
    }, 10000);

    it('has a valid "Terms agreement" checkbox', async () => {
      expect(getTermsCheckboxLabel(termsAcceptField)).toBe("I have read and agree the T&C");

      input(passwordInput, password);
      input(passwordConfirmInput, password);

      await submit(newAccountForm);

      expect(getTermsValidity(createKeyringDom).textContent).toBe(
        "You should accept T&C in order to continue",
      );

      await check(termsAcceptField);
      expect(getConfirmPasswordValidity(createKeyringDom)).toBeUndefined();
    }, 10000);

    it("has two buttons", () => {
      expect(buttons.length).toBe(2);
    }, 10000);

    it('has a "Back" button that redirects to the previous route when clicked', async () => {
      expect(backButton.textContent).toBe("Back");
      await travelToWelcome(true);
      await travelToCreateKeyring();
      click(backButton);
      await whenOnNavigatedToRoute(WELCOME_ROUTE);
    }, 10000);

    it('has a valid "Continue" button that redirects to the Show Words Form if the form is valid when clicked', async () => {
      expect(continueButton.textContent).toBe("Continue");
      expect(isButtonDisabled(continueButton)).toBeTruthy();

      input(passwordInput, password);
      input(passwordConfirmInput, password);
      await check(termsAcceptField);

      expect(isButtonDisabled(continueButton)).toBeFalsy();
      mockCreatePersona(personaMock);

      await submit(newAccountForm);
      await findRenderedDOMComponentWithId(createKeyringDom, CREATE_KEYRING_ID_STEP_2);
    }, 10000);

    it("accepts several UTF-8 alphabets as password fields", async () => {
      const password = "abcαβγазб文字漢字한국";
      input(passwordInput, password);
      input(passwordConfirmInput, password);
      await check(termsAcceptField);
      mockCreatePersona(personaMock);
      await submit(newAccountForm);
      await findRenderedDOMComponentWithId(createKeyringDom, CREATE_KEYRING_ID_STEP_2);
    }, 10000);
  });

  describe("Show Words Step", () => {
    let checkbox: Element;
    let buttons: Element[];
    let backButton: Element;
    let continueButton: Element;

    beforeEach(async () => {
      mockCreatePersona(mockPersonaResponse([], mnemonic, []));
      await submitNewKeyring(createKeyringDom, password);

      checkbox = TestUtils.findRenderedDOMComponentWithTag(createKeyringDom, "input");
      buttons = TestUtils.scryRenderedDOMComponentsWithTag(createKeyringDom, "button");
      [backButton, continueButton] = buttons;
    });

    it("has an explanation text", async () => {
      const explanation = TestUtils.scryRenderedDOMComponentsWithTag(createKeyringDom, "p")[0];
      expect(explanation.textContent || "").toMatch(/^Your secret recovery words/);
    });

    it("has a toggle button that shows the mnemonic when active", async () => {
      const renderedMnemonic = TestUtils.scryRenderedDOMComponentsWithTag(createKeyringDom, "p")[1];
      expect(renderedMnemonic.textContent).toBe("");

      await check(checkbox);

      expect(renderedMnemonic.textContent).toBe(mnemonic);
    }, 10000);

    it('has a "Back" button that redirects to the previous view when clicked', async () => {
      expect(backButton.textContent).toBe("Back");

      await click(backButton);
      await findRenderedDOMComponentWithId(createKeyringDom, CREATE_KEYRING_ID_STEP_1);
    }, 10000);

    it('has a "Continue" button that redirects to the Security Hint Form when clicked', async () => {
      expect(continueButton.textContent).toBe("Continue");

      click(continueButton);
      await findRenderedDOMComponentWithId(createKeyringDom, CREATE_KEYRING_ID_STEP_3);
    }, 10000);
  });

  describe("Security Hint Step", () => {
    let hintInput: Element;
    let buttons: Element[];
    let backButton: Element;
    let createButton: Element;

    beforeEach(async () => {
      mockCreatePersona(mockPersonaResponse([], mnemonic, []));
      await submitNewKeyring(createKeyringDom, password);
      await submitShowWords(createKeyringDom);

      hintInput = TestUtils.findRenderedDOMComponentWithTag(createKeyringDom, "input");
      buttons = TestUtils.scryRenderedDOMComponentsWithTag(createKeyringDom, "button");
      [backButton, createButton] = buttons;
    });

    it('has a valid "Security hint" input', async () => {
      expect(hintInput.getAttribute("placeholder")).toBe("Security hint");

      input(hintInput, randomString(16));
      checkHintValidity(createKeyringDom, "15 characters max - Spaces are allowed");

      input(hintInput, hint);
      checkHintValidity(createKeyringDom, undefined);
    }, 10000);

    it('has a "Back" button that redirects to the New Account Form when clicked', async () => {
      expect(backButton.textContent).toBe("Back");

      await click(backButton);
      await findRenderedDOMComponentWithId(createKeyringDom, CREATE_KEYRING_ID_STEP_2);
    }, 10000);

    it('has a valid "Create" button that redirects to the Account Status view when clicked', async () => {
      expect(createButton.textContent).toBe("Create");
      expect(isButtonDisabled(createButton)).toBeFalsy();

      input(hintInput, randomString(16));
      expect(isButtonDisabled(createButton)).toBeTruthy();

      input(hintInput, hint);
      expect(isButtonDisabled(createButton)).toBeFalsy();

      await submit(createButton);
      await whenOnNavigatedToRoute(KEYRING_STATUS_ROUTE);
    }, 10000);
  });
});
