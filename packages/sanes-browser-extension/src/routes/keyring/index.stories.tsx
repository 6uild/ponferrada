import { ActionKind, CreateArtifactTX, CreateProposalTx, VoteOption, VoteTx } from "@6uild/grafain";
import { grafainCodec } from "@6uild/grafain";
import {
  Address,
  Algorithm,
  ChainId,
  Identity,
  PubkeyBytes,
  SendTransaction,
  TokenTicker,
  WithCreator,
} from "@iov/bcp";
import { Encoding } from "@iov/encoding";
import { storiesOf } from "@storybook/react";
import { Storybook, ToastProvider } from "medulas-react-components";
import React from "react";

import { PersonaProvider } from "../../context/PersonaProvider";
import { GetPersonaResponse } from "../../extension/background/model/backgroundscript";
import { ProcessedTx } from "../../extension/background/model/persona";
import { sanesRoot } from "../../utils/storybook";
import Layout from "./index";

export const KEYRING_STATUS_PAGE = "Keyring Status page";

const defaultAddress = "0x1212121212121212121212121212121212121212" as Address;
const defaultCreator: Identity = {
  chainId: "foobar" as ChainId,
  pubkey: {
    algo: Algorithm.Secp256k1,
    // Random Ethereum pubkey. Derived address: 0x7c15484EA11FD233AE566469af15d84335023c30
    data: Encoding.fromHex(
      "0434ce248a6a5979c04d75d1a75907b2bec1cb4d4f6e17b76521f0925e8b6b40e00711fe98e789cf5c8317cf1e731b3101e9dbfaba5e351e424e45c9a2f4dfb63c",
    ) as PubkeyBytes,
  },
};

const defaultAmount = { quantity: "10", fractionalDigits: 3, tokenTicker: "ETH" as TokenTicker };
const ethereumFee = {
  gasLimit: "12345678",
  gasPrice: { quantity: "20000000000", fractionalDigits: 18, tokenTicker: "ETH" as TokenTicker },
};

const send: SendTransaction & WithCreator = {
  kind: "bcp/send",
  amount: defaultAmount,
  creator: defaultCreator,
  sender: grafainCodec.identityToAddress(defaultCreator),
  fee: ethereumFee,
  memo: "A little donation",
  recipient: defaultAddress,
};

const createProposal: CreateProposalTx & WithCreator = {
  kind: "grafain/create_proposal",
  creator: defaultCreator,
  fee: {
    tokens: defaultAmount,
  },
  title: "Just an idea",
  description: "Try a centralized approach instead?",
  electionRuleId: 2,
  startTime: 1566383301091,
  author: defaultAddress,
  action: {
    kind: ActionKind.CreateTextResolution,
    resolution: "Stop all this blockchain stuff",
  },
};

const vote: VoteTx & WithCreator = {
  kind: "grafain/vote",
  creator: defaultCreator,
  fee: {
    tokens: defaultAmount,
  },
  proposalId: 666,
  selection: VoteOption.Yes,
};

let txId = 111;
function newTxId(): string {
  return (txId++).toString();
}

const processedTx: ProcessedTx = {
  id: newTxId(),
  signer: "Example Signer",
  creator: grafainCodec.identityToAddress(defaultCreator),
  time: "Sat May 25 10:10:00 2019 +0200",
  error: null,
  blockExplorerUrl: null,
  original: send,
};

const blockExplorerProcessedTx: ProcessedTx = {
  id: newTxId(),
  signer: "Example Signer",
  creator: grafainCodec.identityToAddress(defaultCreator),
  time: "Sat May 25 10:10:00 2019 +0200",
  error: null,
  blockExplorerUrl: "https://iov.one",
  original: send,
};

const errorProcessedTx: ProcessedTx = {
  id: newTxId(),
  signer: "Example Signer",
  creator: grafainCodec.identityToAddress(defaultCreator),
  time: "Sat May 25 10:10:00 2019 +0200",
  error: "This is an example of reported error",
  blockExplorerUrl: null,
  original: send,
};

const createProposalTx: ProcessedTx = {
  id: newTxId(),
  signer: "Example Signer",
  creator: grafainCodec.identityToAddress(defaultCreator),
  time: "Sat May 25 10:10:00 2019 +0200",
  error: null,
  blockExplorerUrl: null,
  original: createProposal,
};

const voteTx: ProcessedTx = {
  id: newTxId(),
  signer: "Example Signer",
  creator: grafainCodec.identityToAddress(defaultCreator),
  time: "Sat May 25 10:10:00 2019 +0200",
  error: null,
  blockExplorerUrl: null,
  original: vote,
};

const errorVoteTx: ProcessedTx = {
  id: newTxId(),
  signer: "Example Signer",
  creator: grafainCodec.identityToAddress(defaultCreator),
  time: "Sat May 25 10:10:00 2019 +0200",
  error: "Something went wrong :(",
  blockExplorerUrl: null,
  original: vote,
};

const artifactCreateTx: CreateArtifactTX & WithCreator = {
  kind: "grafain/create_artifact",
  creator: defaultCreator,
  fee: ethereumFee,
  image: "test/foo:v0.1.0",
  checksum: "sha256:847613382dbdc022b903fe3dc4749348863ba5814942cad672a93d36e6ef3c4d",
};
const artifactCreatedTx: ProcessedTx = {
  id: newTxId(),
  signer: "Example Signer",
  creator: grafainCodec.identityToAddress(defaultCreator),
  time: "Sat May 25 10:10:00 2019 +0200",
  error: null,
  blockExplorerUrl: null,
  original: artifactCreateTx,
};

const errorArtifactCreatedTx: ProcessedTx = {
  id: newTxId(),
  signer: "Example Signer",
  creator: grafainCodec.identityToAddress(defaultCreator),
  time: "Sat May 25 10:10:00 2019 +0200",
  error: "This is an example of reported error",
  blockExplorerUrl: null,
  original: artifactCreateTx,
};
storiesOf(`${sanesRoot}/${KEYRING_STATUS_PAGE}`, module)
  .add("With transactions", () => {
    const processedTx2 = { ...processedTx, id: (txId++).toString() };
    const processedTx3 = { ...processedTx, id: (txId++).toString() };

    const persona: GetPersonaResponse = {
      mnemonic: "",
      accounts: [{ label: "Account 0" }],
      txs: [
        artifactCreatedTx,
        errorArtifactCreatedTx,
        blockExplorerProcessedTx,
        processedTx,
        errorProcessedTx,
        processedTx2,
        processedTx3,
        createProposalTx,
        voteTx,
        errorVoteTx,
      ],
    };

    return (
      <PersonaProvider persona={persona} hasStoredPersona={true}>
        <Storybook>
          <ToastProvider>
            <Layout />
          </ToastProvider>
        </Storybook>
      </PersonaProvider>
    );
  })
  .add("No transactions", () => {
    const persona: GetPersonaResponse = {
      mnemonic: "",
      accounts: [{ label: "Account 0" }],
      txs: [],
    };

    return (
      <PersonaProvider persona={persona} hasStoredPersona={true}>
        <Storybook>
          <ToastProvider>
            <Layout />
          </ToastProvider>
        </Storybook>
      </PersonaProvider>
    );
  });
