export const WELCOME_ROUTE = "/welcome";
export const CREATE_KEYRING_ROUTE = "/create-keyring";
export const UNLOCK_ROUTE = "/unlock";
export const DELETE_KEYRING_ROUTE = "/delete-keyring";
export const RECOVERY_WORDS_ROUTE = "/recovery-words";
export const RESTORE_KEYRING = "/restore-keyring";
export const SHARE_IDENTITY = "/share-identity";
export const TX_REQUEST = "/tx-request";
export const KEYRING_STATUS_ROUTE = "/keyring";
export const REQUEST_ROUTE = "/requests";
export const TERMS_URL = "https://github.com/6uild";

export function initialUrl(personaLoaded: boolean, hasPersonaStored: boolean, hasRequests: boolean): string {
  if (personaLoaded && hasRequests) {
    return REQUEST_ROUTE;
  }

  if (personaLoaded && !hasRequests) {
    return KEYRING_STATUS_ROUTE;
  }

  if (hasPersonaStored) {
    return UNLOCK_ROUTE;
  }

  return WELCOME_ROUTE;
}
