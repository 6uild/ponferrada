import { Address } from "@iov/bcp";
import { Typography } from "medulas-react-components";
import * as React from "react";
import { ellipsifyMiddle } from "ui-logic";

interface MsgCreateArtifactTxProps {
  readonly id: string;
  readonly blockExplorerUrl: string | null;
  readonly error?: any;
  readonly creator: Address;
  readonly image: string;
  readonly checksum: string;
}

const MsgCreateArtifactTx = ({
  id,
  blockExplorerUrl,
  error,
  creator,
  image,
  checksum,
}: MsgCreateArtifactTxProps): JSX.Element => {
  const creatorShort = ellipsifyMiddle(creator, 18);

  if (error) {
    return (
      <React.Fragment>
        <Typography weight="light" inline>
          Your attempt to create{" "}
        </Typography>
        <Typography weight="semibold" inline link>
          I: {image} C: {checksum}
        </Typography>
        <Typography weight="light" inline>
          {" "}
          personalized address from{" "}
        </Typography>
        <Typography weight="semibold" inline>
          {creatorShort}
        </Typography>
        <Typography weight="light" inline>
          {" "}
          was unsuccessful
        </Typography>
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <Typography weight="light" inline>
          You ({creatorShort}) have created{" "}
        </Typography>
        <Typography weight="semibold" inline link>
          I: {image} C: {checksum}
        </Typography>
        <Typography weight="light" inline>
          {" "}
          artifact.
        </Typography>
      </React.Fragment>
    );
  }
};

export default MsgCreateArtifactTx;
