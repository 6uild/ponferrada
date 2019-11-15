import { FormValues, ToastContext, ToastVariant } from "medulas-react-components";
import * as React from "react";

import { PersonaContext } from "../../context/PersonaProvider";
import { PersonaData } from "../../extension/background/model/backgroundscript";
import { createPersona } from "../../utils/chrome";
import { history } from "../../utils/history";
import { storeHintPhrase } from "../../utils/localstorage/hint";
import { KEYRING_STATUS_ROUTE } from "../paths";
import NewKeyringForm, { PASSWORD_FIELD } from "./components/NewKeyringForm";
import SecurityHintForm, { SECURITY_HINT } from "./components/SecurityHintForm";
import ShowWordsForm from "./components/ShowWordsForm";

const onBack = (): void => {
  history.goBack();
};

const CreateKeyring = (): JSX.Element => {
  const [step, setStep] = React.useState<"first" | "second" | "third">("first");
  const toast = React.useContext(ToastContext);
  const personaProvider = React.useContext(PersonaContext);

  const onNewKeyring = (): void => setStep("first");
  const onShowWords = (): void => setStep("second");
  const onHintPassword = (): void => setStep("third");

  const onSaveHint = (formValues: FormValues): void => {
    const hintPhrase = formValues[SECURITY_HINT];

    storeHintPhrase(hintPhrase);

    history.push(KEYRING_STATUS_ROUTE);
  };

  const onCreateKeyring = async (formValues: FormValues): Promise<void> => {
    const password = formValues[PASSWORD_FIELD];

    let response: PersonaData;
    try {
      response = await createPersona(password, undefined);
    } catch (error) {
      toast.show("An error occurred while signing up.", ToastVariant.ERROR);
      console.error(error);
      return;
    }

    personaProvider.update({
      accounts: response.accounts,
      mnemonic: response.mnemonic,
      txs: response.txs,
      hasStoredPersona: true,
    });
    onShowWords();
  };

  return (
    <React.Fragment>
      {step === "first" && <NewKeyringForm onBack={onBack} onCreateKeyring={onCreateKeyring} />}
      {step === "second" && (
        <ShowWordsForm
          mnemonic={personaProvider.mnemonic}
          onBack={onNewKeyring}
          onHintPassword={onHintPassword}
        />
      )}
      {step === "third" && <SecurityHintForm onBack={onShowWords} onSaveHint={onSaveHint} />}
    </React.Fragment>
  );
};

export default CreateKeyring;
