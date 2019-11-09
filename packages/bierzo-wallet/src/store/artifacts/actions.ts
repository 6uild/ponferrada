import { Identity } from "@iov/bcp";

import { getConnectionForGrafain } from "../../logic/connection";
import { AddArtifactActionType, BwArtifact } from "./reducer";

export async function getArtifacts(identities: readonly Identity[]): Promise<readonly BwArtifact[]> {
  const grafainConnection = await getConnectionForGrafain();

  const grafainIdentity = identities.find(ident => ident.chainId === grafainConnection.chainId());
  if (!grafainIdentity) {
    console.log("not grafainIdentity! No artifacts");
    return [];
  }

  console.log("ja, grafainIdentity");

  // const grafainAddress = grafainCodec.identityToAddress(grafainIdentity);
  // const artifacts = await grafainConnection.getArtifacts({ owner: grafainAddress });
  const artifacts = await grafainConnection.getAllArtifacts();

  return artifacts.map(artf => ({
    image: artf.image,
    checksum: artf.checksum,
  }));
}

export const addArtifactAction = (artf: readonly BwArtifact[]): AddArtifactActionType => ({
  type: "@@artifact/ADD",
  payload: artf,
});
