import * as React from 'react';
import Block from 'medulas-react-components/lib/components/Block';
import Hairline from 'medulas-react-components/lib/components/Hairline';
import PageLayout from 'medulas-react-components/lib/components/PageLayout';
import { ToastContext } from 'medulas-react-components/lib/context/ToastProvider';
import { ToastVariant } from 'medulas-react-components/lib/context/ToastProvider/Toast';
import Typography from 'medulas-react-components/lib/components/Typography';
import { ACCOUNT_STATUS_ROUTE } from '../paths';
import Account from './components/Account';
import SelectField, { Item } from 'medulas-react-components/lib/components/forms/SelectFieldForm';
import { useForm } from 'react-final-form-hooks';
import Form from 'medulas-react-components/lib/components/forms/Form';
import { PersonaContext } from '../../context/PersonaProvider';
import { AccountInfo } from '../../logic/persona/accountManager';

const CREATE_NEW_ONE = 'Create a new one';

const AccountView = (): JSX.Element => {
  const [accounts, setAccounts] = React.useState<Item[]>([]);
  const persona = React.useContext(PersonaContext);
  const { show } = React.useContext(ToastContext);
  const { form, handleSubmit } = useForm({
    onSubmit: () => {},
  });

  React.useEffect(() => {
    async function fetchMyAccounts(): Promise<void> {
      const accounts = persona.accountNames;
      let actualItems: Item[] = [];
      actualItems.push({ name: CREATE_NEW_ONE });
      accounts.forEach((acc: AccountInfo) => actualItems.push({ name: acc.name }));
      setAccounts(actualItems);
    }

    fetchMyAccounts();
  }, [persona.accountNames]);

  const onChange = (item: Item): void => {
    if (item.name === CREATE_NEW_ONE) {
      show('Feature coming soon. Stay tuned', ToastVariant.INFO);
      return;
    }

    // const tokensPerAccount = calculate tokens from choosen acccount
    // setTokens(tokensPerAccount)
  };

  return (
    <PageLayout id={ACCOUNT_STATUS_ROUTE} primaryTitle="Account" title="Status">
      <Form onSubmit={handleSubmit}>
        <Block marginBottom={1}>
          <Typography variant="subtitle2">Available accounts</Typography>
        </Block>
        <SelectField
          items={accounts}
          initial={CREATE_NEW_ONE}
          form={form}
          fieldName="SELECT_FIELD_ATTR"
          onChangeCallback={onChange}
        />
      </Form>
      <Hairline space={2} />
      <Block padding={2} marginTop={3} marginBottom={1}>
        <Account blockchainAccounts={['foo', 'bar', 'baz']} />
      </Block>
    </PageLayout>
  );
};

export default AccountView;
