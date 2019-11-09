import { Typography } from "medulas-react-components";
import * as React from "react";

interface MsgProps {
  readonly image: string;
  readonly checksum: string;
}

const Msg = ({ image, checksum }: MsgProps): JSX.Element => {
  return (
    <React.Fragment>
      <Typography variant="body2" weight="semibold" inline>
        {image} {checksum}
      </Typography>
      <Typography variant="body2" inline>
        {" "}
        artifact has been registered
      </Typography>
    </React.Fragment>
  );
};

export default Msg;
