import React from "react";
import * as ReactRedux from "react-redux";
import { history } from "..";

import PageMenu from "../../components/PageMenu";
import { RootState } from "../../store/reducers";
import { Table, TableBody, TableCell, TableHead, TableRow, Theme } from "@material-ui/core";
import { Block, defaultColor, makeStyles, Typography } from "medulas-react-components";
import { REGISTER_ARTIFACT_ROUTE } from "../paths";
import { RpcEndpointType } from "../../communication/rpcEndpoint";

function onCreateArtifact(): void {
  history.push(REGISTER_ARTIFACT_ROUTE);
}

const useStyles = makeStyles((theme: Theme) => ({
  cell: {
    padding: `${theme.spacing(1)}px ${theme.spacing(4)}px ${theme.spacing(1)}px 0`,
    borderBottom: "1px solid #F3F3F3",
  },
  cellHead: {
    fontSize: "1.6rem",
    border: "none",
    fontWeight: "normal",
    color: defaultColor,
    paddingBottom: `${theme.spacing(2)}px`,
  },
  copyCell: {
    "& > svg": {
      cursor: "pointer",
    },
    paddingRight: 0,
  },
  link: {
    cursor: "pointer",
  },
}));

const Artifacts = (): JSX.Element => {
  // const rpcEndpointType = ReactRedux.useSelector(getRpcEndpointType);
  // const identities = ReactRedux.useSelector((state: RootState) => state.identities);
  const artifacts = ReactRedux.useSelector((state: RootState) => state.artifacts);

  const classes = useStyles();
  const cellClasses = {
    root: classes.cell,
    head: classes.cellHead,
  };
  return (
    <PageMenu>
      <h1>Artifacts</h1>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell classes={cellClasses} align="left">
              Image
            </TableCell>
            <TableCell classes={cellClasses} align="left">
              Checksum
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {artifacts.map(artf => (
            <TableRow>
              <TableCell>{artf.image}</TableCell>
              <TableCell>{artf.checksum}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <DoRegisterArtifact onCreateArtifact={onCreateArtifact} />
    </PageMenu>
  );
};

interface ArtifactNotExistsProps {
  readonly onCreateArtifact: () => void;
  readonly rpcEndpointType: RpcEndpointType;
}

export function DoRegisterArtifact({
  onCreateArtifact,
}: Omit<ArtifactNotExistsProps, "rpcEndpointType">): JSX.Element {
  return (
    <Block display="flex" flexDirection="column" alignItems="center">
      <Block marginTop={3} />
      <Typography variant="subtitle1" weight="semibold" gutterBottom>
        Whitelist Artifacts
      </Typography>
      <Typography variant="body2" color="textPrimary">
        This list of artifacts is whitelisted for the admission controller.
      </Typography>
      <Block marginTop={3} />
      <Typography
        id={REGISTER_ARTIFACT_ROUTE}
        variant="subtitle1"
        color="primary"
        weight="semibold"
        inline
        link
        onClick={onCreateArtifact}
      >
        Add more
      </Typography>
    </Block>
  );
}

export default Artifacts;
