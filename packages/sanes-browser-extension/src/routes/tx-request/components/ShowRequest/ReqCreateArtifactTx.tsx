import { Block, List, Typography } from "medulas-react-components";
import * as React from "react";

import TransactionFee from "./TransactionFee";
import { CreateArtifactTX } from "@6uild/grafain";

export const REQ_CREATE_ARTIFACT = "req-create-artifact-tx";

interface Props {
  readonly tx: CreateArtifactTX;
}

const ReqCreateArtifactTx = ({ tx }: Props): JSX.Element => {
  return (
    <React.Fragment>
      <Typography variant="body1" inline color="primary" id={REQ_CREATE_ARTIFACT}>
        I: {tx.image} C: {tx.checksum}
      </Typography>
      <Typography variant="body1" inline>
        {" "}
        create artifact request.
      </Typography>
      <Block marginTop={1} />
      <List>
        <TransactionFee fee={tx.fee} />
      </List>
    </React.Fragment>
  );
};

export default ReqCreateArtifactTx;
