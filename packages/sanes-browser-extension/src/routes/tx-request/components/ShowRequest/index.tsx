import { isSendTransaction } from "@iov/bcp";
import { isCreateArtifactTX, isCreateProposalTx, isVoteTx } from "iov-bns";
import { Block, Button, Typography } from "medulas-react-components";
import * as React from "react";

import NeumaPageLayout from "../../../../components/NeumaPageLayout";
import { SupportedTransaction } from "../../../../extension/background/model/persona";
import { TX_REQUEST } from "../../../paths";
import ReqCreateProposalTx from "./ReqCreateProposalTx";
import ReqCreateArtifactTx from "./ReqCreateArtifactTx";
import ReqSendTransaction from "./ReqSendTransaction";
import ReqVoteTx from "./ReqVoteTx";

export const TX_REQUEST_SHOW = `${TX_REQUEST}_show`;

interface Props {
  readonly onAcceptRequest: () => void;
  readonly showRejectView: () => void;
  readonly sender: string;
  readonly tx: SupportedTransaction;
}

const Layout = ({ sender, tx, onAcceptRequest, showRejectView }: Props): JSX.Element => {
  let req: JSX.Element;

  if (isSendTransaction(tx)) {
    req = <ReqSendTransaction tx={tx} />;
  } else if (isCreateArtifactTX(tx)) {
    req = <ReqCreateArtifactTx tx={tx} />;
  } else if (isCreateProposalTx(tx)) {
    req = <ReqCreateProposalTx tx={tx} />;
  } else if (isVoteTx(tx)) {
    req = <ReqVoteTx tx={tx} />;
  } else {
    throw new Error("Received transaction type that cannot be displayed");
  }

  return (
    <NeumaPageLayout id={TX_REQUEST_SHOW} color="white" primaryTitle="Tx" title="Request">
      <Block textAlign="center" marginBottom={2}>
        <Typography variant="body1" inline>
          {"The following site: "}
        </Typography>
        <Typography variant="body1" color="primary" inline>
          {sender}
        </Typography>
        <Typography variant="body1" inline>
          {" wants you to sign:"}
        </Typography>
      </Block>
      {req}
      <Block marginBottom={3} />
      <Button variant="contained" fullWidth onClick={onAcceptRequest}>
        Approve
      </Button>
      <Block marginTop={2} />
      <Button variant="contained" fullWidth color="secondary" onClick={showRejectView}>
        Reject
      </Button>
      <Block marginBottom={2} />
    </NeumaPageLayout>
  );
};

export default Layout;
