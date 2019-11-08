import { isSendTransaction } from "@iov/bcp";
import { isCreateArtifactTX, isCreateProposalTx, isVoteTx } from "iov-bns";
import { makeStyles, Theme } from "@material-ui/core";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { Block, Hairline, Image } from "medulas-react-components";
import * as React from "react";
import { amountToString, voteToString } from "ui-logic";

import { ProcessedTx } from "../../../../extension/background/model/persona";
import iconErrorTx from "../../assets/transactionError.svg";
import iconSendTx from "../../assets/transactionSend.svg";
import MsgCreateProposalTx from "./MsgCreateProposalTx";
import MsgCreateArtifactTx from "./MsgCreateArtifactTx";
import MsgSendTransaction from "./MsgSendTransaction";
import MsgVoteTx from "./MsgVoteTx";

interface ItemProps {
  readonly item: ProcessedTx;
  readonly lastOne: boolean;
}

const useStyles = makeStyles((theme: Theme) => ({
  msg: {
    "& > span": {
      lineHeight: 1.3,
      marginBottom: theme.spacing(1),
    },
  },
  item: {
    backgroundColor: theme.palette.grey[50],
  },
  icon: {
    padding: `0 ${theme.spacing(1)}px`,
  },
}));

const TxItem = ({ item, lastOne }: ItemProps): JSX.Element => {
  const classes = useStyles();
  const { time, error } = item;

  let msg: JSX.Element;
  if (isSendTransaction(item.original)) {
    const { amount, recipient } = item.original;
    const beautifulAmount = amountToString(amount);
    msg = (
      <MsgSendTransaction
        id={item.id}
        blockExplorerUrl={item.blockExplorerUrl}
        error={error}
        amount={beautifulAmount}
        creator={item.creator}
        recipient={recipient}
      />
    );
  } else if (isCreateArtifactTX(item.original)) {
    const { image, checksum } = item.original;
    msg = (
      <MsgCreateArtifactTx
        id={item.id}
        blockExplorerUrl={item.blockExplorerUrl}
        creator={item.creator}
        image={image}
        checksum={checksum}
        error={error}
      />
    );
  } else if (isCreateProposalTx(item.original)) {
    const { title } = item.original;
    msg = (
      <MsgCreateProposalTx
        id={item.id}
        blockExplorerUrl={item.blockExplorerUrl}
        title={title}
        creator={item.creator}
        error={error}
      />
    );
  } else if (isVoteTx(item.original)) {
    const { selection, proposalId } = item.original;
    msg = (
      <MsgVoteTx
        id={item.id}
        blockExplorerUrl={item.blockExplorerUrl}
        selection={voteToString(selection)}
        proposalId={proposalId}
        creator={item.creator}
        error={error}
      />
    );
  } else {
    throw new Error("Received transaction type that cannot be displayed");
  }

  const icon = error ? iconErrorTx : iconSendTx;
  return (
    <Block className={classes.item}>
      <ListItem disableGutters>
        <Image className={classes.icon} src={icon} height={32} alt="Tx operation" />
        <ListItemText className={classes.msg} primary={msg} secondary={time} />
      </ListItem>
      {!lastOne && (
        <Block padding="md">
          <Hairline />
        </Block>
      )}
    </Block>
  );
};

export default TxItem;
