import { Identity, TransactionId } from "@iov/bcp";
import { extensionName } from "../theme/variables";

/**
 * The response of a successful "getIdentities" RPC call to an endpoint.
 *
 * @see https://github.com/iov-one/iov-core/blob/v0.17.2/docs/out-of-process-rpc.md#methods
 */
export type GetIdentitiesResponse = readonly Identity[];

/**
 * The response of a successful "signAndPost" RPC call to an endpoint.
 *
 * @see https://github.com/iov-one/iov-core/blob/v0.17.2/docs/out-of-process-rpc.md#methods
 */
export type SignAndPostResponse = TransactionId | null;

export const communicationTexts = {
  authorizeGetIdentitiesMessage: `Please authorize request in ${extensionName} to continue.`,
  authorizeSignAndPostMessage: `Please authorize request in ${extensionName} to continue.`,
  notAvailableMessage: `You need to install the ${extensionName} browser extension.`,
  notReadyMessage: `Please unlock ${extensionName} to continue.`,
  noMatchingIdentityMessage: `Please unlock ${extensionName} to continue.`,
};

export const browserExtensionErrorCodes = {
  signingServerNotReady: -32010,
  senderUrlMissing: -32011,
  senderBlocked: -32012,
};
