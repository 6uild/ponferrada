import { Identity } from "@iov/bcp";

import { getConnectionForBns } from "../../logic/connection";
import { AddArtifactActionType, BwArtifact } from "./reducer";

export async function getArtifacts(identities: readonly Identity[]): Promise<readonly BwArtifact[]> {
  const bnsConnection = await getConnectionForBns();

  const bnsIdentity = identities.find(ident => ident.chainId === bnsConnection.chainId());
  if (!bnsIdentity) {
    console.log("not bnsIdentity! No artifacts");
    return [];
  }

  console.log("ja, bnsIdentity");

  // const bnsAddress = bnsCodec.identityToAddress(bnsIdentity);
  // const artifacts = await bnsConnection.getArtifacts({ owner: bnsAddress });
  const artifacts = await bnsConnection.getAllArtifacts();

  return artifacts.map(artf => ({
    image: artf.image,
    checksum: artf.checksum,
  }));
}

export const addArtifactAction = (artf: readonly BwArtifact[]): AddArtifactActionType => ({
  type: "@@artifact/ADD",
  payload: artf,
});
