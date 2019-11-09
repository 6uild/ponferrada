import { action } from "@storybook/addon-actions";
import { linkTo } from "@storybook/addon-links";
import { storiesOf } from "@storybook/react";
import { Storybook } from "medulas-react-components";
import React from "react";

import {
  Request,
  SignAndPostResponseData,
} from "../../extension/background/model/requestsHandler/requestQueueManager";
import { sanesRoot } from "../../utils/storybook";
import { WALLET_STATUS_PAGE } from "../wallet/index.stories";
import RejectRequest from "./components/RejectRequest";
import ShowRequest from "./components/ShowRequest";
import {
  getCashTransaction,
  getCreateTextResolutionActionTransaction,
  getEthTransaction,
  getVoteTransaction,
} from "./test";

export const TX_REQUEST_PATH = `${sanesRoot}/Transaction Request`;
const SEND_GRAFAIN_REQUEST_PAGE = "Send (GRAFAIN)";
const SEND_TX_ETHEREUM_REQUEST_PAGE = "Send (Ethereum)";
const VOTE_REQUEST_PAGE = "Vote";
export const REJECT_REQUEST_PAGE = "Reject Request";

const sendGrafainRequest: Request<SignAndPostResponseData> = {
  id: 0,
  accept: () => action("accept request"),
  reject: (permanent: boolean) => action(`reject request. Permanently: ${permanent ? "yes" : "no"}`),
  senderUrl: "http://localhost/",
  reason: "I would like you to sign this TX",
  responseData: {
    tx: getCashTransaction(),
  },
};

const sendEthereumRequest: Request<SignAndPostResponseData> = {
  id: 0,
  accept: () => action("accept request"),
  reject: (permanent: boolean) => action(`reject request. Permanently: ${permanent ? "yes" : "no"}`),
  senderUrl: "http://localhost/",
  reason: "I would like you to sign this Ethereum TX",
  responseData: {
    tx: getEthTransaction(),
  },
};

const createProposalRequest: Request<SignAndPostResponseData> = {
  id: 0,
  accept: () => action("accept request"),
  reject: (permanent: boolean) => action(`reject request. Permanently: ${permanent ? "yes" : "no"}`),
  senderUrl: "http://localhost/",
  reason: "I would like you to sign this TX",
  responseData: {
    tx: getCreateTextResolutionActionTransaction(),
  },
};

const voteRequest: Request<SignAndPostResponseData> = {
  id: 0,
  accept: () => action("accept request"),
  reject: (permanent: boolean) => action(`reject request. Permanently: ${permanent ? "yes" : "no"}`),
  senderUrl: "http://localhost/",
  reason: "I would like you to sign this TX",
  responseData: {
    tx: getVoteTransaction(),
  },
};

storiesOf(TX_REQUEST_PATH, module)
  .add(SEND_GRAFAIN_REQUEST_PAGE, () => {
    const { tx } = sendGrafainRequest.responseData;

    return (
      <Storybook>
        <ShowRequest
          tx={tx}
          sender={sendGrafainRequest.senderUrl}
          onAcceptRequest={linkTo(sanesRoot, WALLET_STATUS_PAGE)}
          showRejectView={linkTo(TX_REQUEST_PATH, REJECT_REQUEST_PAGE)}
        />
      </Storybook>
    );
  })
  .add(SEND_TX_ETHEREUM_REQUEST_PAGE, () => {
    const { senderUrl } = sendEthereumRequest;
    const { tx } = sendEthereumRequest.responseData;

    return (
      <Storybook>
        <ShowRequest
          tx={tx}
          sender={senderUrl}
          onAcceptRequest={linkTo(sanesRoot, WALLET_STATUS_PAGE)}
          showRejectView={linkTo(TX_REQUEST_PATH, REJECT_REQUEST_PAGE)}
        />
      </Storybook>
    );
  })
  .add(VOTE_REQUEST_PAGE, () => {
    const { senderUrl } = voteRequest;
    const { tx } = voteRequest.responseData;

    return (
      <Storybook>
        <ShowRequest
          sender={senderUrl}
          tx={tx}
          onAcceptRequest={linkTo(sanesRoot, WALLET_STATUS_PAGE)}
          showRejectView={linkTo(TX_REQUEST_PATH, REJECT_REQUEST_PAGE)}
        />
      </Storybook>
    );
  })
  .add(REJECT_REQUEST_PAGE, () => {
    const { senderUrl } = sendGrafainRequest;

    return (
      <Storybook>
        <RejectRequest
          sender={senderUrl}
          onBack={linkTo(TX_REQUEST_PATH, SEND_GRAFAIN_REQUEST_PAGE)}
          onRejectRequest={action("onAcceptRequest")}
        />
      </Storybook>
    );
  });
