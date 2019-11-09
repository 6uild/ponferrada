import { ChainId, Identity, isFailedTransaction } from "@iov/bcp";
import { CreateArtifactTX, isCreateArtifactTX } from "@6uild/grafain";
import { Dispatch } from "redux";
import { Subscription } from "xstream";

import { getConfig } from "../../config";
import { addTransaction } from "../../store/notifications";
import { addArtifactAction, BwArtifact } from "../../store/artifacts";
import { getCodec } from "../codec";
import { getConnectionForChainId } from "../connection";
import { BwParserFactory } from "./types/BwParserFactory";

let txsSubscriptions: Subscription[] = [];

export async function subscribeTransaction(
  identities: readonly Identity[],
  dispatch: Dispatch,
): Promise<void> {
  const config = await getConfig();
  const chains = config.chains;

  for (const chain of chains) {
    const connection = getConnectionForChainId(chain.chainSpec.chainId as ChainId);
    if (!connection) {
      continue;
    }
    const codec = getCodec(chain.chainSpec);
    const identity = identities.find(identity => identity.chainId === connection.chainId());
    if (!identity) {
      continue;
    }

    const address = codec.identityToAddress(identity);

    // subscribe to balance changes via
    const subscription = connection.liveTx({ signedBy: address }).subscribe({
      next: async tx => {
        const bwTransaction = BwParserFactory.getBwTransactionFrom(tx);
        const parsedTx = await bwTransaction.parse(connection, tx, address);

        if (!isFailedTransaction(tx) && isCreateArtifactTX(parsedTx.original)) {
          const createArtifactTx = parsedTx.original as CreateArtifactTX;
          const artf: BwArtifact[] = [
            {
              image: createArtifactTx.image,
              checksum: createArtifactTx.checksum,
            },
          ];
          await dispatch(addArtifactAction(artf));
        }
        await dispatch(addTransaction(parsedTx));
      },
      error: error => console.error(error),
    });
    txsSubscriptions.push(subscription);
  }
}

export function unsubscribeTransactions(): void {
  txsSubscriptions.forEach(subs => subs.unsubscribe());
  txsSubscriptions = [];
}
