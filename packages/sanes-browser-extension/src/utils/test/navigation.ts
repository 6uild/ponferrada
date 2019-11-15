import TestUtils from "react-dom/test-utils";
import { whenTrue } from "ui-logic";

import { GetPersonaResponse } from "../../extension/background/model/backgroundscript";
import { Request } from "../../extension/background/model/requestsHandler/requestQueueManager";
import {
  CREATE_KEYRING_ROUTE,
  DELETE_KEYRING_ROUTE,
  KEYRING_STATUS_ROUTE,
  RECOVERY_WORDS_ROUTE,
  REQUEST_ROUTE,
  RESTORE_KEYRING,
  SHARE_IDENTITY,
  TX_REQUEST,
  UNLOCK_ROUTE,
  WELCOME_ROUTE,
} from "../../routes/paths";
import { REQUEST_FIELD } from "../../routes/requests/components/RequestList";
import { history } from "../../utils/history";
import { createDom } from "../../utils/test/dom";

export const whenOnNavigatedToRoute = (desiredRoute: string): Promise<void> =>
  whenTrue(() => window.location.pathname === desiredRoute);

export const travelTo = async (
  route: string,
  requests?: readonly Request[],
  persona?: GetPersonaResponse,
  hasStoredPersona?: boolean,
): Promise<React.Component> => {
  const dom = createDom(requests, persona, hasStoredPersona);

  TestUtils.act(() => {
    history.push({
      pathname: route,
      state:
        requests && requests.length > 0
          ? {
              [REQUEST_FIELD]: requests[0].id,
            }
          : null,
    });
  });

  await whenOnNavigatedToRoute(route);

  return dom;
};

export const travelToWelcome = async (hasStoredPersona: boolean): Promise<React.Component> => {
  return travelTo(WELCOME_ROUTE, undefined, undefined, hasStoredPersona);
};

export const travelToCreateKeyring = async (): Promise<React.Component> => {
  return travelTo(CREATE_KEYRING_ROUTE);
};

export const travelToUnlock = async (): Promise<React.Component> => {
  return travelTo(UNLOCK_ROUTE);
};

export const travelToRecoveryWords = async (persona?: GetPersonaResponse): Promise<React.Component> => {
  return travelTo(RECOVERY_WORDS_ROUTE, [], persona);
};

export const travelToRestoreKeyring = async (): Promise<React.Component> => {
  return travelTo(RESTORE_KEYRING);
};

export const travelToDeleteKeyring = async (persona?: GetPersonaResponse): Promise<React.Component> => {
  return travelTo(DELETE_KEYRING_ROUTE, [], persona);
};

export const travelToShareIdentity = async (requests: readonly Request[]): Promise<React.Component> => {
  expect(requests.length).toBeGreaterThanOrEqual(1);

  return travelTo(SHARE_IDENTITY, requests);
};

export const travelToTXRequest = async (requests: readonly Request[]): Promise<React.Component> => {
  expect(requests.length).toBeGreaterThanOrEqual(1);

  return travelTo(TX_REQUEST, requests);
};

export const travelToKeyring = async (persona?: GetPersonaResponse): Promise<React.Component> => {
  return travelTo(KEYRING_STATUS_ROUTE, [], persona);
};

export const travelToRequests = async (requests?: readonly Request[]): Promise<React.Component> => {
  return travelTo(REQUEST_ROUTE, requests);
};
