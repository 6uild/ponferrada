import { Address, ChainId } from "@iov/bcp";

import { getConnectionForGrafain } from "./connection";

export function isIov(username: string): boolean {
  return username.endsWith("*iov");
}

/**
 * Returns the address associated with the name, or undefined if not registered.
 * The name must include a namespace ("*iov")
 */
export async function lookupRecipientAddressByName(
  username: string,
  chainId: ChainId,
): Promise<Address | "name_not_found" | "no_address_for_blockchain"> {
  if (!isIov(username)) {
    throw new Error("Username must include namespace suffix");
  }

  const connection = await getConnectionForGrafain();
  const usernames = await connection.getUsernames({ username });
  if (usernames.length !== 1) {
    return "name_not_found";
  }

  const chainAddressPair = usernames[0].targets.find(addr => addr.chainId === chainId);

  if (chainAddressPair) {
    return chainAddressPair.address;
  }

  return "no_address_for_blockchain";
}
