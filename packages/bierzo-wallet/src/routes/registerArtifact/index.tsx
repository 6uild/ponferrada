import { ChainId, Identity, TransactionId } from "@iov/bcp";
import { BnsConnection } from "iov-bns";
import {
  BillboardContext,
  FormValues,
  ToastContext,
  ToastVariant,
  ValidationError,
} from "medulas-react-components";
import React from "react";
import * as ReactRedux from "react-redux";

import { history } from "..";
import { generateCreateArtifactTxRequest } from "../../communication/requestgenerators";
import LedgerBillboardMessage from "../../components/BillboardMessage/LedgerBillboardMessage";
import NeumaBillboardMessage from "../../components/BillboardMessage/NeumaBillboardMessage";
import PageMenu from "../../components/PageMenu";
import { getConnectionForChainId } from "../../logic/connection";
import { ExtendedIdentity } from "../../store/identities";
import { RootState } from "../../store/reducers";
import { getChainAddressPairWithNames } from "../../utils/tokens";
import { BALANCE_ROUTE, TRANSACTIONS_ROUTE } from "../paths";
import Layout, { REGISTER_CHECKSUM_FIELD, REGISTER_IMAGE_FIELD } from "./components";
import ConfirmRegistration from "./components/ConfirmRegistration";

function onSeeTransactions(): void {
  history.push(TRANSACTIONS_ROUTE);
}
function onReturnToBalance(): void {
  history.push(BALANCE_ROUTE);
}

function getBnsIdentity(identities: ReadonlyMap<ChainId, ExtendedIdentity>): Identity | undefined {
  for (const identity of Array.from(identities.values()).map(ext => ext.identity)) {
    if (getConnectionForChainId(identity.chainId) instanceof BnsConnection) {
      return identity;
    }
  }
}

export function isValidImageName(image: string): "valid" | "too_short" | "too_long" | "wrong_chars" {
  if (image.length < 1) return "too_short";
  if (image.length > 255) return "too_long";
  // if (/^[a-zA-Z0-9_:@\-.]{1,255}$/.test(image)) return "valid";
  return "valid";
}
export function isValidChecksum(checksum: string): "valid" | "too_short" | "too_long" | "wrong_chars" {
  if (checksum.length < 1) return "too_short";
  if (checksum.length > 100) return "too_long";
  if (/^[0-9a-zA-Z]{0,10}:?[0-9a-zA-Z]{1,100}$/.test(checksum)) return "valid";
  return "wrong_chars";
}

const validate = async (values: object): Promise<object> => {
  const formValues = values as FormValues;
  const errors: ValidationError = {};

  const image = formValues[REGISTER_IMAGE_FIELD];
  if (!image) {
    errors[REGISTER_IMAGE_FIELD] = "Required";
    return errors;
  }
  const checksum = formValues[REGISTER_CHECKSUM_FIELD];
  if (!checksum) {
    errors[REGISTER_CHECKSUM_FIELD] = "Required";
    return errors;
  }

  let checkResult = isValidImageName(image);
  switch (checkResult) {
    case "too_short":
      errors[REGISTER_IMAGE_FIELD] = "Image should be at least 3 characters";
      break;
    case "too_long":
      errors[REGISTER_IMAGE_FIELD] = "Image should be maximum 255 characters";
      break;
    case "wrong_chars":
      errors[REGISTER_IMAGE_FIELD] = "Image should match '^[a-zA-Z0-9_:@\\-.]' characters only";
      break;
    case "valid":
      break;
    default:
      throw new Error(`"Image validation error: ${checkResult}`);
  }
  if (checkResult !== "valid") {
    return errors;
  }

  checkResult = isValidChecksum(checksum);
  switch (checkResult) {
    case "too_short":
      errors[REGISTER_IMAGE_FIELD] = "Checksum should be at least 1 characters";
      break;
    case "too_long":
      errors[REGISTER_IMAGE_FIELD] = "Checksum should be maximum 100 characters";
      break;
    case "wrong_chars":
      errors[REGISTER_IMAGE_FIELD] = "Checksum should match '[0-9a-zA-Z]{0,10}:?[0-9a-zA-Z]{1,100}'";
      break;
    case "valid":
      break;
    default:
      throw new Error(`"Checksum validation error: ${checkResult}`);
  }

  if (checkResult !== "valid") {
    return errors;
  }
  // TODO: check image does not exists yet.
  // const connection = await getConnectionForBns();
  // const usernames = await connection.getUsernames({ username: image });
  // if (usernames.length > 0) {
  //   errors[REGISTER_IMAGE_FIELD] = "Personalized address already exists";
  // }
  return errors;
};

const RegisterArtifact = (): JSX.Element => {
  const [transactionId, setTransactionId] = React.useState<TransactionId | null>(null);
  // const [transactionFee, setTransactionFee] = React.useState<Fee | undefined>(undefined);

  const billboard = React.useContext(BillboardContext);
  const toast = React.useContext(ToastContext);

  const rpcEndpoint = ReactRedux.useSelector((state: RootState) => state.rpcEndpoint);
  const identities = ReactRedux.useSelector((state: RootState) => state.identities);
  const addresses = getChainAddressPairWithNames(identities);

  const bnsIdentity = getBnsIdentity(identities);

  if (!bnsIdentity) throw new Error("No BNS identity available.");
  if (!rpcEndpoint) throw new Error("RPC endpoint not set in redux store. This is a bug.");

  const onSubmit = async (values: object): Promise<void> => {
    const formValues = values as FormValues;

    const image = formValues[REGISTER_IMAGE_FIELD];
    const checksum = formValues[REGISTER_CHECKSUM_FIELD];

    try {
      const request = await generateCreateArtifactTxRequest(bnsIdentity, image, checksum);
      if (rpcEndpoint.type === "extension") {
        billboard.show(
          <NeumaBillboardMessage text={rpcEndpoint.authorizeSignAndPostMessage} />,
          "start",
          "flex-end",
        );
      } else {
        billboard.show(
          <LedgerBillboardMessage text={rpcEndpoint.authorizeSignAndPostMessage} />,
          "center",
          "center",
        );
      }
      const transactionId = await rpcEndpoint.sendSignAndPostRequest(request);
      if (transactionId === undefined) {
        toast.show(rpcEndpoint.notAvailableMessage, ToastVariant.ERROR);
      } else if (transactionId === null) {
        toast.show("Request rejected", ToastVariant.ERROR);
      } else {
        setTransactionId(transactionId);
      }
    } catch (error) {
      console.error(error);
      toast.show("An error occurred", ToastVariant.ERROR);
    } finally {
      billboard.close();
    }
  };

  return (
    <PageMenu>
      {transactionId ? (
        <ConfirmRegistration
          transactionId={transactionId}
          onSeeTransactions={onSeeTransactions}
          onReturnToBalance={onReturnToBalance}
        />
      ) : (
        <Layout
          onSubmit={onSubmit}
          validate={validate}
          onCancel={onReturnToBalance}
          chainAddresses={addresses}
          transactionFee={undefined}
        />
      )}
    </PageMenu>
  );
};

export default RegisterArtifact;
