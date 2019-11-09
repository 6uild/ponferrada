import { Address, Token, TokenTicker, TransactionId } from "@iov/bcp";
import { VoteOption, VoteTx } from "@6uild/grafain";
import { Sha256 } from "@iov/crypto";
import { Encoding, Uint64 } from "@iov/encoding";
import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";
import React from "react";
import { ReadonlyDate } from "readonly-date";
import { stringToAmount } from "ui-logic";

import { ProcessedTx } from "../../logic/transactions/types/BwParser";
import { ProcessedSendTransaction } from "../../store/notifications";
import DecoratedStorybook, { bierzoRoot } from "../../utils/storybook";
import Layout from "./components";
import { ORDER_DESC, SortOrder, TX_DATE_COLUMN, TxsOrder } from "./components/sorting";

export const TRANSACTIONS_STORY_PATH = `${bierzoRoot}/Transactions`;
export const TRANSACTIONS_STORY_SHOW_PATH = "With transactions";

const iov: Pick<Token, "tokenTicker" | "fractionalDigits"> = {
  fractionalDigits: 9,
  tokenTicker: "IOV" as TokenTicker,
};

const lsk: Pick<Token, "tokenTicker" | "fractionalDigits"> = {
  fractionalDigits: 8,
  tokenTicker: "LSK" as TokenTicker,
};

const eth: Pick<Token, "tokenTicker" | "fractionalDigits"> = {
  fractionalDigits: 18,
  tokenTicker: "ETH" as TokenTicker,
};

const currentUsersIovAddress = "tiov16cmjakgflq4ru6n6dm5egrztn6gc0l7af7r2tc" as Address;
const currentUsersEthAddress = "0x794d591840927890aC7C162C3B3e4665725f8f40" as Address;
const currentUsersLiskAddress = "16376202734673246431L" as Address;

const currentUsersAddresses = [
  currentUsersIovAddress,
  currentUsersEthAddress,
  currentUsersLiskAddress,
] as const;

let txCount = 0;

function makeExampleEthTransactionId(): TransactionId {
  // The generated hash is deterministic but arbitrary and has the correct format (see https://etherscan.io/txs)
  const data = Uint64.fromNumber(txCount++).toBytesBigEndian();
  return `0x${Encoding.toHex(new Sha256(data).digest())}` as TransactionId;
}

function makeExampleIovTransactionId(): TransactionId {
  // The generated hash is deterministic but arbitrary and has the correct format
  const data = Uint64.fromNumber(txCount++).toBytesBigEndian();
  return Encoding.toHex(new Sha256(data).digest()).toUpperCase() as TransactionId;
}

function makeExampleLiskTransactionId(): TransactionId {
  // The generated hash is deterministic but arbitrary and has the correct format (see https://explorer.lisk.io/txs/)
  return Uint64.fromNumber(2347199254740991 + txCount++).toString() as TransactionId;
}

const incomingSendTransaction: ProcessedSendTransaction = {
  time: new ReadonlyDate("2018-01-01T03:02:01.763Z"),
  id: makeExampleEthTransactionId(),
  original: {
    kind: "bcp/send",
    sender: "0x979a731650b6F5cbE0dB2966e9b43e9a6a931bdA" as Address,
    recipient: currentUsersEthAddress,
    amount: stringToAmount("10.5", eth),
    memo: "Sample note",
    fee: { tokens: stringToAmount("0.001", eth) },
  },
  incoming: true,
  outgoing: false,
};

const incomingAndOutgoingSendTransaction: ProcessedSendTransaction = {
  time: new ReadonlyDate("2018-02-03T04:03:02.763Z"),
  id: makeExampleIovTransactionId(),
  original: {
    kind: "bcp/send",
    sender: currentUsersIovAddress as Address,
    recipient: currentUsersIovAddress as Address,
    amount: stringToAmount("7.4", iov),
    memo: "Send money to myself for fun",
    fee: { tokens: stringToAmount("1.2", iov) },
  },
  incoming: true,
  outgoing: true,
};

const voteTx: ProcessedTx<VoteTx> = {
  id: makeExampleIovTransactionId(),
  time: new ReadonlyDate("2018-03-05T05:04:03.763Z"),
  original: {
    kind: "grafain/vote",
    fee: { tokens: stringToAmount("0.5", iov) },
    proposalId: 55,
    selection: VoteOption.Abstain,
  },
};

function onChangeRows(): void {
  action("onChangeRows action")();
}
function onPrevPage(): void {
  action("onPrevPage action")();
}
function onNextPage(): void {
  action("onNextPage action")();
}
function onSort(receivedOrderBy: TxsOrder, receivedOrder: SortOrder): () => void {
  return () => {
    action(`onSort action. receivedOrderBy: ${receivedOrderBy}, receivedOrder: ${receivedOrder}`)();
  };
}

storiesOf(TRANSACTIONS_STORY_PATH, module)
  .addParameters({ viewport: { defaultViewport: "responsive" } })
  .add("Without transactions", () => (
    <DecoratedStorybook>
      <Layout
        rows={[]}
        onChangeRows={onChangeRows}
        onPrevPage={onPrevPage}
        onNextPage={onNextPage}
        onSort={onSort}
        orderBy={TX_DATE_COLUMN}
        order={ORDER_DESC}
      />
    </DecoratedStorybook>
  ));
