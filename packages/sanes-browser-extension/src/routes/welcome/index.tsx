import { Block, Button, ToastContext, ToastVariant, Typography } from "medulas-react-components";
import * as React from "react";

import NeumaPageLayout from "../../components/NeumaPageLayout";
import { PersonaContext } from "../../context/PersonaProvider";
import { getConfigurationFile } from "../../extension/background/model/persona/config";
import { extensionName } from "../../theme/variables";
import { history } from "../../utils/history";
import { CREATE_KEYRING_ROUTE, RESTORE_KEYRING, UNLOCK_ROUTE, WELCOME_ROUTE } from "../paths";

export const UNLOCK_KEYRING_ID = "welcome-unlock-keyring";
export const CREATE_KEYRING_ID = "welcome-create-keyring";
export const IMPORT_KEYRING_ID = "welcome-import-keyring";

const Welcome = (): JSX.Element => {
  const personaProvider = React.useContext(PersonaContext);
  const toast = React.useContext(ToastContext);

  const createNewKeyring = async (): Promise<void> => {
    if ((await getConfigurationFile()).keyringCreationDisabled) {
      toast.show(
        "Please use an external address generator and import the Keyring using your mnemonic.",
        ToastVariant.INFO,
      );
      return;
    }

    history.push(CREATE_KEYRING_ROUTE);
  };

  const unlock = (): void => {
    history.push(UNLOCK_ROUTE);
  };

  const importKeyring = (): void => {
    history.push(RESTORE_KEYRING);
  };

  return (
    <NeumaPageLayout id={WELCOME_ROUTE} primaryTitle="Welcome" title={`to ${extensionName}`}>
      <Typography variant="body1" inline>
        This extension lets you manage all your accounts in one place.
      </Typography>
      <Block marginTop={2} />
      {personaProvider.hasStoredPersona && (
        <Button variant="contained" fullWidth onClick={unlock} id={UNLOCK_KEYRING_ID}>
          Unlock
        </Button>
      )}
      <Block marginTop={2} />
      <Button variant="contained" fullWidth onClick={createNewKeyring} id={CREATE_KEYRING_ID}>
        Create Keyring
      </Button>
      <Block marginTop={2} />
      <Button variant="contained" fullWidth onClick={importKeyring} id={IMPORT_KEYRING_ID}>
        Import Keyring
      </Button>
    </NeumaPageLayout>
  );
};

export default Welcome;
