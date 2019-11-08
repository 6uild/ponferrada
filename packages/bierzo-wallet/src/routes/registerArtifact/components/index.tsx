import { Fee } from "@iov/bcp";
import {
  Avatar,
  Back,
  Block,
  Button,
  Form,
  Image,
  makeStyles,
  primaryColor,
  TextField,
  Tooltip,
  Typography,
  useForm,
} from "medulas-react-components";
import React from "react";
import { amountToString } from "ui-logic";

import { AddressesTableProps } from "../../../components/AddressesTable";
import PageContent from "../../../components/PageContent";
import { companyName } from "../../../theme/variables";
import shield from "../assets/shield.svg";

export const REGISTER_USERNAME_VIEW_ID = "register-username-view-id";
export const REGISTER_IMAGE_FIELD = "register-image-field";
export const REGISTER_CHECKSUM_FIELD = "register-checksum-field";

const registerIcon = <Image src={shield} alt="shield" />;
const registerTooltipIcon = <Image src={shield} alt="shield" width={24} height={24} />;

const useStyles = makeStyles({
  usernameHeader: {
    boxShadow: "0px 0px 14px #EDEFF4",
  },
  addressesHeader: {
    backgroundColor: primaryColor,
    fontSize: "27.5px",
    width: 56,
    height: 56,
  },
});

export function NoUsernameHeader(): JSX.Element {
  const classes = useStyles();
  return (
    <Block className={classes.usernameHeader} borderRadius={40} width={145} padding={1}>
      <Typography variant="subtitle1" weight="semibold" color="primary" align="center">
        yourname*iov
      </Typography>
    </Block>
  );
}

export function AddressesTooltipHeader(): JSX.Element {
  const classes = useStyles();
  const avatarClasses = { root: classes.addressesHeader };
  return <Avatar classes={avatarClasses}>{registerTooltipIcon}</Avatar>;
}

interface TooltipContentProps {
  readonly header: React.ReactNode;
  readonly title: string;
  readonly children: React.ReactNode;
}

export function TooltipContent({ children, title, header }: TooltipContentProps): JSX.Element {
  return (
    <Block padding={2} display="flex" flexDirection="column" alignItems="center">
      {header}
      <Block marginTop={2} />
      <Typography variant="subtitle1" weight="semibold" align="center" gutterBottom>
        {title}
      </Typography>
      <Typography variant="body2" color="textPrimary" align="center">
        {children}
      </Typography>
    </Block>
  );
}

function getSubmitButtonCaption(fee: Fee | undefined): string {
  if (fee && fee.tokens) {
    return `Register for ${amountToString(fee.tokens)}`;
  }

  return "Register";
}

interface Props extends AddressesTableProps {
  readonly onSubmit: (values: object) => Promise<void>;
  readonly validate: (values: object) => Promise<object>;
  readonly onCancel: () => void;
  readonly transactionFee: Fee | undefined;
}

const Layout = ({ chainAddresses, validate, onSubmit, onCancel, transactionFee }: Props): JSX.Element => {
  const { form, handleSubmit, invalid, pristine, submitting, validating } = useForm({
    onSubmit,
    validate,
  });

  const buttons = (
    <Block
      marginTop={4}
      marginBottom={1}
      justifyContent="center"
      display="flex"
      alignItems="center"
      flexDirection="column"
    >
      <Block width="75%">
        <Button
          fullWidth
          type="submit"
          disabled={invalid || pristine || submitting || validating}
          spinner={submitting || validating}
        >
          {getSubmitButtonCaption(transactionFee)}
        </Button>
      </Block>
      <Block width="75%" marginTop={1}>
        <Back fullWidth disabled={submitting} onClick={onCancel}>
          Back
        </Back>
      </Block>
    </Block>
  );

  return (
    <Form onSubmit={handleSubmit}>
      <PageContent id={REGISTER_USERNAME_VIEW_ID} icon={registerIcon} buttons={buttons} avatarColor="#31E6C9">
        <Block textAlign="left">
          <Block display="flex" justifyContent="space-between" marginBottom={1}>
            <Typography variant="subtitle2" weight="semibold">
              Register a new Artifact
            </Typography>
            <Block display="flex" alignItems="center">
              <Tooltip maxWidth={320}>
                <TooltipContent header={<NoUsernameHeader />} title="Choose your address">
                  Whitelist new docker image for the admission controller
                </TooltipContent>
              </Tooltip>
              <Block marginRight={1} />
              <Typography variant="subtitle2" inline weight="regular">
                How it works
              </Typography>
            </Block>
          </Block>
          <Block width="100%" marginBottom={1}>
            <Typography variant="subtitle2" weight="semibold">
              Image
            </Typography>
            <TextField
              name={REGISTER_IMAGE_FIELD}
              form={form}
              placeholder="eg. alpetest/grafain:v1.0.0"
              fullWidth
              margin="none"
            />
          </Block>
          <Block width="100%" marginBottom={1}>
            <Typography variant="subtitle2" weight="semibold">
              Checksum
            </Typography>
            <TextField
              name={REGISTER_CHECKSUM_FIELD}
              form={form}
              placeholder="eg. sha256:123123123"
              fullWidth
              margin="none"
            />
          </Block>
        </Block>
      </PageContent>
    </Form>
  );
};

export default Layout;
