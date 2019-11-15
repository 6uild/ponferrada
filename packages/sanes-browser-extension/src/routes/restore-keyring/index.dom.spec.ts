import TestUtils from "react-dom/test-utils";
import { randomString } from "ui-logic";

import {
  mockCreatePersona,
  mockPersonaResponse,
} from "../../extension/background/model/persona/test/persona";
import { click, input, submit } from "../../utils/test/dom";
import { travelToRestoreKeyring, travelToUnlock, whenOnNavigatedToRoute } from "../../utils/test/navigation";
import { findRenderedDOMComponentWithId } from "../../utils/test/reactElemFinder";
import { withChainsDescribe } from "../../utils/test/testExecutor";
import { KEYRING_STATUS_ROUTE, RESTORE_KEYRING, UNLOCK_ROUTE } from "../paths";
import { SET_PASSWORD_STEP_RESTORE_KEYRING_ROUTE } from "./components/SetPasswordForm";
import {
  getConfirmPasswordValidity,
  getMnemonicForm,
  getMnemonicTextarea,
  getMnemonicValidity,
  getPasswordForm,
  getPasswordInputs,
  getPasswordValidity,
  isButtonDisabled,
  submitMnemonicForm,
} from "./test/operateRestoreKeyring";

withChainsDescribe("DOM > Feature > Restore Keyring", () => {
  const mnemonic = "badge cattle stool execute involve main mirror envelope brave scrap involve simple";
  const password = randomString(10);
  const personaMock = mockPersonaResponse([], mnemonic, []);

  let restoreKeyringDom: React.Component;

  beforeEach(async () => {
    restoreKeyringDom = await travelToRestoreKeyring();
  });

  describe("Set Mnemonic Step", () => {
    let mnemonicTextarea: Element;
    let mnemonicForm: Element;
    let backButton: Element;
    let continueButton: Element;

    beforeEach(async () => {
      mnemonicTextarea = getMnemonicTextarea(restoreKeyringDom);
      mnemonicForm = getMnemonicForm(restoreKeyringDom);
    });

    it('has a valid "Recovery words" textarea', () => {
      expect(mnemonicTextarea.getAttribute("placeholder")).toBe("Recovery words");

      submit(mnemonicForm);
      expect(getMnemonicValidity(restoreKeyringDom).textContent).toBe("Required");

      // Invalid inputs

      input(mnemonicTextarea, randomString(10));
      expect(getMnemonicValidity(restoreKeyringDom).textContent).toBe("Not a valid English mnemonic");

      input(mnemonicTextarea, "1 2 3 4 5 6 7 8 9 10 11 12");
      expect(getMnemonicValidity(restoreKeyringDom).textContent).toBe("Not a valid English mnemonic");

      input(mnemonicTextarea, "1 2 3 4 5 6 7 8 9 10 11 12 13");
      expect(getMnemonicValidity(restoreKeyringDom).textContent).toBe("Not a valid English mnemonic");

      input(
        mnemonicTextarea,
        "convince business loop hundred useless sadness easily script valve burger common common",
      );
      expect(getMnemonicValidity(restoreKeyringDom).textContent).toBe("Not a valid English mnemonic");

      // Valid inputs

      input(
        mnemonicTextarea,
        "convince business loop hundred useless sadness easily script valve burger common select",
      );
      expect(getMnemonicValidity(restoreKeyringDom)).toBeUndefined();

      input(
        mnemonicTextarea,
        "dirt motion accident topple cherry alert this track fluid crucial relief globe tourist add grape",
      );
      expect(getMnemonicValidity(restoreKeyringDom)).toBeUndefined();

      input(
        mnemonicTextarea,
        "emerge special door speak success mechanic lesson doll tip together waste shy suffer film confirm fetch reduce suffer sound toast tribe wet thunder situate",
      );
      expect(getMnemonicValidity(restoreKeyringDom)).toBeUndefined();
    }, 10000);

    it("has two buttons", () => {
      const buttons = TestUtils.scryRenderedDOMComponentsWithTag(restoreKeyringDom, "button");
      expect(buttons.length).toBe(2);
    }, 10000);

    it('has a "Back" button that redirects to the previous route when clicked', async () => {
      const unlockDom = await travelToUnlock();
      const restoreKeyringLink = TestUtils.findRenderedDOMComponentWithTag(unlockDom, "a");
      expect(restoreKeyringLink.textContent).toBe("Restore keyring");
      await click(restoreKeyringLink);
      await whenOnNavigatedToRoute(RESTORE_KEYRING);

      const buttons = TestUtils.scryRenderedDOMComponentsWithTag(unlockDom, "button");
      [backButton, continueButton] = buttons;
      expect(backButton.textContent).toBe("Back");
      await click(backButton);

      await whenOnNavigatedToRoute(UNLOCK_ROUTE);
    }, 30000);

    it('has a valid "Continue" button that redirects to the Set Password Form if the form is valid when clicked', async () => {
      const buttons = TestUtils.scryRenderedDOMComponentsWithTag(restoreKeyringDom, "button");
      [backButton, continueButton] = buttons;
      expect(continueButton.textContent).toBe("Continue");

      expect(isButtonDisabled(continueButton)).toBeTruthy();

      input(mnemonicTextarea, mnemonic);
      expect(isButtonDisabled(continueButton)).toBeFalsy();
      await submit(continueButton);
      await findRenderedDOMComponentWithId(restoreKeyringDom, SET_PASSWORD_STEP_RESTORE_KEYRING_ROUTE);
    }, 10000);
  });

  describe("Set Password Step", () => {
    let inputs: Element[];
    let passwordInput: Element;
    let passwordConfirmInput: Element;
    let passwordForm: Element;
    let buttons: Element[];
    let backButton: Element;
    let restoreButton: Element;

    beforeEach(async () => {
      await submitMnemonicForm(restoreKeyringDom, mnemonic);
      inputs = getPasswordInputs(restoreKeyringDom);
      [passwordInput, passwordConfirmInput] = inputs;
      passwordForm = getPasswordForm(restoreKeyringDom);
      buttons = TestUtils.scryRenderedDOMComponentsWithTag(restoreKeyringDom, "button");
      [backButton, restoreButton] = buttons;
    }, 10000);

    it("has two inputs", () => {
      expect(inputs.length).toBe(2);
    }, 10000);

    it('has a valid "Password" input', () => {
      expect(passwordInput.getAttribute("placeholder")).toBe("Password");

      input(passwordConfirmInput, password);

      submit(passwordForm);
      expect(getPasswordValidity(restoreKeyringDom).textContent).toBe("Required");

      input(passwordInput, randomString(7));
      expect(getPasswordValidity(restoreKeyringDom).textContent).toBe("Must be longer than 8 characters");

      input(passwordInput, password);
      expect(getPasswordValidity(restoreKeyringDom)).toBeUndefined();
    }, 10000);

    it('has a valid "Confirm Password" input', () => {
      expect(passwordConfirmInput.getAttribute("placeholder")).toBe("Confirm Password");

      input(passwordInput, password);

      submit(passwordForm);
      expect(getConfirmPasswordValidity(restoreKeyringDom).textContent).toBe("Required");

      input(passwordConfirmInput, randomString(10));
      expect(getConfirmPasswordValidity(restoreKeyringDom).textContent).toBe("Passwords mismatch");

      input(passwordConfirmInput, password);
      expect(getConfirmPasswordValidity(restoreKeyringDom)).toBeUndefined();
    }, 10000);

    it("has two buttons", () => {
      expect(buttons.length).toBe(2);
    }, 10000);

    it('has a "Back" button that redirects to the Set Mnemonic Step when clicked', async () => {
      expect(backButton.textContent).toBe("Back");

      click(backButton);
      await findRenderedDOMComponentWithId(restoreKeyringDom, RESTORE_KEYRING);
    }, 10000);

    it('has a valid "Restore" button that redirects to Account Status view if the form is valid when clicked', async () => {
      expect(restoreButton.textContent).toBe("Restore");

      expect(isButtonDisabled(restoreButton)).toBeTruthy();

      input(passwordInput, password);
      input(passwordConfirmInput, password);
      expect(isButtonDisabled(restoreButton)).toBeFalsy();
      mockCreatePersona(personaMock);
      await submit(restoreButton);
      await whenOnNavigatedToRoute(KEYRING_STATUS_ROUTE);
    }, 10000);

    it("accepts several UTF-8 alphabets as password fields", async () => {
      const password = "abcαβγазб文字漢字한국";
      input(passwordInput, password);
      input(passwordConfirmInput, password);
      mockCreatePersona(personaMock);
      submit(passwordForm);
      await whenOnNavigatedToRoute(KEYRING_STATUS_ROUTE);
    }, 10000);
  });
});
