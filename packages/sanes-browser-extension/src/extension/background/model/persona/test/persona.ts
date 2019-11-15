import { randomString } from "ui-logic";

import { PersonaAcccount, ProcessedTx } from "..";
import {
  submitNewKeyring,
  submitSecurityHint,
  submitShowWords,
} from "../../../../../routes/create-keyring/test/operateCreateKeyring";
import { KEYRING_STATUS_ROUTE } from "../../../../../routes/paths";
import * as chromeInternalMsgs from "../../../../../utils/chrome";
import { travelToCreateKeyring, whenOnNavigatedToRoute } from "../../../../../utils/test/navigation";
import { PersonaData } from "../../backgroundscript";

export async function processCreateKeyring(
  password: string = randomString(10),
  hint: string = randomString(10),
): Promise<React.Component> {
  const createKeyringDom = await travelToCreateKeyring();

  await submitNewKeyring(createKeyringDom, password);
  await submitShowWords(createKeyringDom);
  await submitSecurityHint(createKeyringDom, hint);

  await whenOnNavigatedToRoute(KEYRING_STATUS_ROUTE);

  const accountStatusDom = createKeyringDom;

  return accountStatusDom;
}

export const mockPersonaResponse = (
  accounts: PersonaAcccount[] = [],
  mnemonic: string = "",
  txs: ProcessedTx[] = [],
): PersonaData => {
  return { accounts, mnemonic, txs };
};

export const mockGetPersonaData = (personaData: PersonaData): void => {
  jest.spyOn(chromeInternalMsgs, "getPersonaData").mockResolvedValueOnce(personaData);
};

export const mockCreatePersona = (personaData: PersonaData): void => {
  jest.spyOn(chromeInternalMsgs, "createPersona").mockResolvedValueOnce(personaData);
};

export const mockLoadPersona = (personaData: PersonaData): void => {
  jest.spyOn(chromeInternalMsgs, "loadPersona").mockResolvedValueOnce(personaData);
};

export const mockClearPersona = (): jest.SpyInstance => {
  return jest.spyOn(chromeInternalMsgs, "clearPersona").mockResolvedValueOnce();
};

export const mockClearPersonaWithException = (): void => {
  jest.spyOn(chromeInternalMsgs, "clearPersona").mockRejectedValueOnce("error during persona clearing");
};

export const mockClearDatabase = (): jest.SpyInstance => {
  return jest.spyOn(chromeInternalMsgs, "clearDatabase").mockResolvedValueOnce();
};
