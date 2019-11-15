import TestUtils from "react-dom/test-utils";
import { randomString } from "ui-logic";

import {
  mockClearDatabase,
  mockClearPersona,
  mockClearPersonaWithException,
  mockPersonaResponse,
} from "../../extension/background/model/persona/test/persona";
import { click, input, submit } from "../../utils/test/dom";
import { travelToDeleteKeyring, whenOnNavigatedToRoute } from "../../utils/test/navigation";
import { findRenderedDOMComponentWithId } from "../../utils/test/reactElemFinder";
import { KEYRING_STATUS_ROUTE, WELCOME_ROUTE } from "../paths";
import { getMnemonicValidity, isButtonDisabled } from "./test/operateDeleteKeyring";

describe("DOM > Feature > Delete Keyring", () => {
  let deleteKeyringDom: React.Component;
  let buttons: Element[];
  let backButton: Element;
  let deleteButton: Element;
  let mnemonicInput: Element;
  let form: Element;
  const mnemonic = "badge cattle stool execute involve main mirror envelope brave scrap involve simple";
  const personaMock = mockPersonaResponse([], mnemonic, []);

  beforeEach(async () => {
    deleteKeyringDom = await travelToDeleteKeyring(personaMock);
    buttons = TestUtils.scryRenderedDOMComponentsWithTag(deleteKeyringDom, "button");
    [backButton, deleteButton] = buttons;
    mnemonicInput = TestUtils.findRenderedDOMComponentWithTag(deleteKeyringDom, "textarea");
    form = TestUtils.findRenderedDOMComponentWithTag(deleteKeyringDom, "form");
  }, 60000);

  it("has two buttons", () => {
    expect(buttons.length).toBe(2);
  }, 60000);

  it("has a back arrow button that redirects to the Keyring Status view when clicked", async () => {
    expect(backButton.getAttribute("aria-label")).toBe("Go back");
    click(backButton);
    await whenOnNavigatedToRoute(KEYRING_STATUS_ROUTE);
  }, 60000);

  it('has a valid "Recovery words" input', async () => {
    expect(mnemonicInput.getAttribute("placeholder")).toBe("Recovery words");

    await submit(form);
    expect(getMnemonicValidity(deleteKeyringDom).textContent).toBe("Required");

    input(mnemonicInput, randomString(10));
    await submit(form);
    expect(getMnemonicValidity(deleteKeyringDom).textContent).toBe(
      "Wrong mnemonic entered, please try again.",
    );

    input(mnemonicInput, mnemonic);
    expect(getMnemonicValidity(deleteKeyringDom)).toBeUndefined();
  }, 60000);

  it('has a valid "Delete" button that redirects to the Keyring Status view if deleted successfuly when clicked', async () => {
    const clearPersonaMock = mockClearPersona();
    const clearDatabaseMock = mockClearDatabase();

    expect(deleteButton.textContent).toBe("Delete");
    expect(isButtonDisabled(deleteButton)).toBeTruthy();

    input(mnemonicInput, randomString(10));
    expect(isButtonDisabled(deleteButton)).toBeTruthy();

    input(mnemonicInput, mnemonic);
    await submit(mnemonicInput);
    await whenOnNavigatedToRoute(WELCOME_ROUTE);

    expect(clearPersonaMock).toHaveBeenCalledTimes(1);
    expect(clearDatabaseMock).toHaveBeenCalledTimes(1);
  }, 60000);

  it('shows "An error has occurred during deleting keyring" toast message if keyring deletion unsuccessful', async () => {
    mockClearPersonaWithException();
    input(mnemonicInput, mnemonic);
    await submit(form);
    const toast = (await findRenderedDOMComponentWithId(deleteKeyringDom, "toast-provider")) as Element;
    expect(toast.textContent).toBe("An error has occurred during deleting keyring");
  }, 60000);
});
