import { ReleaseEscrowAction } from "@iov/bns";
import { Uint64 } from "@iov/encoding";
import { Block, Typography } from "medulas-react-components";
import React from "react";
import { amountToString } from "ui-logic";

interface Props {
  readonly action: ReleaseEscrowAction;
}

const ReleaseEscrow = ({ action }: Props): JSX.Element => {
  return (
    <Block marginTop={2} marginBottom={2}>
      <Typography variant="body2" weight="semibold">
        Escrow {Uint64.fromBytesBigEndian(action.escrowId).toNumber()} releases{" "}
        {amountToString(action.amount)}
      </Typography>
    </Block>
  );
};

export default ReleaseEscrow;
