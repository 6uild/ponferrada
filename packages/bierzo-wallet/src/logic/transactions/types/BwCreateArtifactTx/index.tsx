import { CreateArtifactTX } from "@6uild/grafain";
import { Address, BlockchainConnection, ConfirmedTransaction } from "@iov/bcp";
import * as React from "react";

import { BwParser, ProcessedTx } from "../../types/BwParser";
import TransactionHeader from "./ui/TransactionHeader";
import TransactionRow from "./ui/TransactionRow";

export class BwCreateArtifactParser extends BwParser<CreateArtifactTX> {
  public async parse(
    conn: BlockchainConnection,
    trans: ConfirmedTransaction<CreateArtifactTX>,
    _: Address,
  ): Promise<ProcessedTx<CreateArtifactTX>> {
    const header = await conn.getBlockHeader(trans.height);
    const time = header.time;

    return {
      id: trans.transactionId,
      time,
      original: trans.transaction,
    };
  }

  public graphicalRepresentation(tx: ProcessedTx<CreateArtifactTX>): JSX.Element {
    return <TransactionRow key={tx.id} tx={tx} />;
  }

  public headerRepresentation(tx: ProcessedTx<CreateArtifactTX>, lastOne: boolean): JSX.Element {
    return <TransactionHeader key={tx.id} item={tx} lastOne={lastOne} />;
  }
}
