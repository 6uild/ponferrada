import TestUtils from "react-dom/test-utils";

import { click } from "../../utils/test/dom";
import { travelToWelcome, whenOnNavigatedToRoute } from "../../utils/test/navigation";
import { CREATE_KEYRING_ROUTE, RESTORE_KEYRING, UNLOCK_ROUTE } from "../paths";

describe("DOM > Feature > Welcome", () => {
  let welcomeDom: React.Component;
  let buttons: Element[];
  let unlockButton: Element;
  let newKeyringButton: Element;
  let importAccountButton: Element;

  beforeEach(async () => {
    welcomeDom = await travelToWelcome(true);
    buttons = TestUtils.scryRenderedDOMComponentsWithTag(welcomeDom, "button");
    [unlockButton, newKeyringButton, importAccountButton] = buttons;
  }, 60000);

  it("has three buttons", () => {
    expect(buttons.length).toBe(3);
  }, 60000);

  it("should contain two buttons in case if no persona exists", async () => {
    const welcomeDom = await travelToWelcome(false);
    const buttons = TestUtils.scryRenderedDOMComponentsWithTag(welcomeDom, "button");
    expect(buttons.length).toBe(2);
  }, 60000);

  it('has a "Unlock" button that redirects to the Unlock view when clicked', async () => {
    expect(unlockButton.textContent).toBe("Unlock");
    click(unlockButton);
    await whenOnNavigatedToRoute(UNLOCK_ROUTE);
  }, 60000);

  it('has a "Create Keyring" button that redirects to the Sign Up view when clicked', async () => {
    expect(newKeyringButton.textContent).toBe("Create Keyring");
    click(newKeyringButton);
    await whenOnNavigatedToRoute(CREATE_KEYRING_ROUTE);
  }, 60000);

  it('has an "Import Keyring" button that redirects to the Restore Keyring view when clicked', async () => {
    expect(importAccountButton.textContent).toBe("Import Keyring");
    click(importAccountButton);
    await whenOnNavigatedToRoute(RESTORE_KEYRING);
  }, 60000);
});
