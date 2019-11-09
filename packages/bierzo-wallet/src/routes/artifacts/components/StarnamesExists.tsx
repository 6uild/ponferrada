import Paper from "@material-ui/core/Paper";
import clipboardCopy from "clipboard-copy";
import {
  Block,
  Image,
  makeStyles,
  ToastContext,
  ToastVariant,
  Tooltip,
  Typography,
} from "medulas-react-components";
import React from "react";

import AddressesTable, { ChainAddressPairWithName } from "../../../components/AddressesTable";
import copy from "../../../components/AddressesTable/assets/copy.svg";
import { AddressesTooltipHeader, TooltipContent } from "../../registerArtifact/components";

interface Props {
  readonly iovAddress: string;
  readonly chainAddresses: readonly ChainAddressPairWithName[];
}

const usePaper = makeStyles({
  rounded: {
    borderRadius: "5px",
  },
  elevation1: {
    boxShadow: "none",
  },
});

const useStyles = makeStyles({
  link: {
    cursor: "pointer",
  },
});

function StarnamesExists({ iovAddress, chainAddresses }: Props): JSX.Element {
  const paperClasses = usePaper();
  const classes = useStyles();
  const toast = React.useContext(ToastContext);

  const onStarnameCopy = (): void => {
    clipboardCopy(iovAddress);
    toast.show("Startname has been copied to clipboard.", ToastVariant.INFO);
  };

  return (
    <Block marginTop={1} width={650}>
      <Paper classes={paperClasses}>
        <Block
          display="flex"
          flexDirection="column"
          width="100%"
          marginTop={4}
          padding={5}
          border="1px solid #F3F3F3"
        >
          <Block display="flex" alignItems="center" alignSelf="center">
            <Typography variant="h4" align="center">
              {iovAddress}
            </Typography>
            <Block marginRight={2} />
            <Block onClick={onStarnameCopy} className={classes.link}>
              <Image src={copy} alt="Copy" width={20} />
            </Block>
          </Block>
          <Block display="flex" alignItems="center" marginBottom={1} marginTop={4}>
            <Typography variant="subtitle2" weight="semibold" inline>
              IS LINKED TO THESE ADDRESSES
            </Typography>
            <Block marginRight={1} />
            <Tooltip maxWidth={320}>
              <TooltipContent header={<AddressesTooltipHeader />} title="Your linked addresses">
                With IOV you can have an universal blockchain address that is linked to all your addresses.
                Just give your friends your personalized address.
              </TooltipContent>
            </Tooltip>
          </Block>
          <Block marginTop={2} />
          <AddressesTable chainAddresses={chainAddresses} />
        </Block>
      </Paper>
    </Block>
  );
}

export default StarnamesExists;
