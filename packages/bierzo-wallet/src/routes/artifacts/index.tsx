import { Table, TableBody, TableCell, TableHead, TableRow, Theme } from "@material-ui/core";
import { Block, defaultColor, makeStyles, Typography } from "medulas-react-components";
import React from "react";
import * as ReactRedux from "react-redux";

import PageMenu from "../../components/PageMenu";
import { RootState } from "../../store/reducers";
import AddArtifact from "../transactions/components/AddArtifact";

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
      <DoRegisterArtifact />
    </PageMenu>
  );
};

export function DoRegisterArtifact(): JSX.Element {
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
      <AddArtifact />
    </Block>
  );
}

export default Artifacts;
