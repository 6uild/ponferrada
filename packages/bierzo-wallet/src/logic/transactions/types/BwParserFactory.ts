import {
  Address,
  ConfirmedTransaction,
  FailedTransaction,
  isConfirmedTransaction,
  isFailedTransaction,
  isSendTransaction,
  LightTransaction,
} from "@iov/bcp";

import { ProcessedSendTransaction } from "../../../store/notifications";
import { BwParser, ProcessedTx } from "../types/BwParser";
import { BwSendParser } from "./BwSendTransaction";
import { BwUnkownParser } from "./BwUnkownTransaction";
import { CreateArtifactTX, isCreateArtifactTX } from "@6uild/grafain";
import { BwCreateArtifactParser } from "./BwCreateArtifactTx";

function isProcessedSendTransaction(tx: ProcessedTx): tx is ProcessedSendTransaction {
  return isSendTransaction(tx.original);
}

function isProcessedCreateArtifactTx(tx: ProcessedTx): tx is ProcessedTx<CreateArtifactTX> {
  return isCreateArtifactTX(tx.original);
}

export class BwParserFactory {
  public static getReactComponent(tx: ProcessedTx, userAddresses: readonly Address[]): JSX.Element {
    if (isProcessedSendTransaction(tx)) {
      return new BwSendParser().graphicalRepresentation(tx, userAddresses);
    } else if (isProcessedCreateArtifactTx(tx)) {
      return new BwCreateArtifactParser().graphicalRepresentation(tx);
    }

    return new BwUnkownParser().graphicalRepresentation(tx);
  }

  public static getHeaderRepresentation(tx: ProcessedTx, lastOne: boolean): JSX.Element {
    if (isProcessedSendTransaction(tx)) {
      return new BwSendParser().headerRepresentation(tx, lastOne);
    } else if (isProcessedCreateArtifactTx(tx)) {
      return new BwCreateArtifactParser().headerRepresentation(tx, lastOne);
    }

    return new BwUnkownParser().headerRepresentation(tx, lastOne);
  }

  public static getBwTransactionFrom(
    trans: ConfirmedTransaction<LightTransaction> | FailedTransaction,
  ): BwParser<LightTransaction> {
    if (isFailedTransaction(trans)) {
      throw new Error("Not supported error txs for now");
    }

    if (!isConfirmedTransaction(trans)) {
      throw new Error("Confirmed transaction expected");
    }

    const { transaction: payload } = trans;
    if (isSendTransaction(payload)) {
      return new BwSendParser();
    } else if (isCreateArtifactTX(payload)) {
      return new BwCreateArtifactParser();
    }

    return new BwUnkownParser();
  }
}
