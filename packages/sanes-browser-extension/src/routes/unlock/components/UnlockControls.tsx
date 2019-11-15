import { Block, Link, Typography } from "medulas-react-components";
import * as React from "react";

import { RESTORE_KEYRING } from "../../paths";

const UnlockControls = (): JSX.Element => {
  return (
    <Block marginTop={4} textAlign="center">
      <Block marginBottom={1}>
        <Link to={RESTORE_KEYRING}>
          <Typography variant="subtitle2" color="primary" link inline>
            Restore keyring
          </Typography>
        </Link>
      </Block>
    </Block>
  );
};

export default UnlockControls;
