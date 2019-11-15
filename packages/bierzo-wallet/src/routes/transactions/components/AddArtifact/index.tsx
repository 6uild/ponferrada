import { Fab, makeStyles, Theme } from "@material-ui/core";
import { useTheme } from "@material-ui/styles";
import { Block, CircleImage, Typography } from "medulas-react-components";
import * as React from "react";

import { history } from "../../..";
import { getBorderColor } from "../../../../theme/css";
import { REGISTER_ARTIFACT_ROUTE } from "../../../paths";
import sendIcon from "../../assets/toAddressWhite.svg";

const addArtifactPadding = 20;
const addArtifactLabel = "Add Artifact";

function goToArtifact(): void {
  history.push(REGISTER_ARTIFACT_ROUTE);
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: "auto",
    justifyContent: "left",
    textTransform: "inherit",
  },
  sizeSmall: {
    height: `${theme.spacing(4)}px`,
    "&&": {
      padding: 0,
    },
  },
  secondary: {
    backgroundColor: "white",
    color: theme.palette.text.primary,
    padding: 0,
    boxShadow: "none",
    border: `1px solid ${getBorderColor(theme)}`,
    "&:hover": {
      background: theme.palette.background.default,
    },
  },
}));

const AddArtifact = (): JSX.Element => {
  const theme = useTheme<Theme>();
  const classes = useStyles();

  const fabClasses = {
    secondary: classes.secondary,
    root: classes.root,
    sizeSmall: classes.sizeSmall,
  };
  const diameter = `${theme.spacing(4)}px`;

  return (
    <Block
      height={64}
      display="flex"
      alignItems="center"
      paddingTop={3}
      paddingBottom={3}
      paddingLeft={addArtifactPadding}
      paddingRight={addArtifactPadding}
      bgcolor="white"
    >
      <Fab
        variant="extended"
        size="small"
        color="secondary"
        aria-label={addArtifactLabel}
        classes={fabClasses}
        onClick={goToArtifact}
      >
        <CircleImage
          icon={sendIcon}
          circleColor={theme.palette.primary.main}
          alt={addArtifactLabel}
          dia={diameter}
          width={16}
          height={16}
        />
        <Block paddingLeft={1.5} paddingRight={1.5}>
          <Typography variant="subtitle2" weight="regular">
            {addArtifactLabel}
          </Typography>
        </Block>
      </Fab>
    </Block>
  );
};

export default AddArtifact;
