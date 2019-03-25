import * as React from 'react';
import Button from 'medulas-react-components/lib/components/Button';
import Typography from 'medulas-react-components/lib/components/Typography';
import Block from 'medulas-react-components/lib/components/Block';
import Image from 'medulas-react-components/lib/components/Image';
import iovLogo from '../../../assets/iov-logo.png';
import { SIGNUP_ROUTE } from '../../paths';
import { StepProps } from './index';
import Form, {
  useForm,
  FormValues,
  ValidationError,
} from 'medulas-react-components/lib/components/forms/Form';
import TextFieldForm from 'medulas-react-components/lib/components/forms/TextFieldForm';

const USERNAME = 'usernameInputField';
const PASSWORD = 'passwordInputField';
const PASSWORD_CONFIRM = 'passwordConfirmInputField';

const validate = (values: object): object => {
  const formValues = values as FormValues;
  let errors: ValidationError = {};
  if (!formValues[USERNAME]) {
    errors[USERNAME] = 'Required';
  }
  if (!formValues[PASSWORD]) {
    errors[PASSWORD] = 'Required';
  }
  if (!formValues[PASSWORD_CONFIRM]) {
    errors[PASSWORD_CONFIRM] = 'Required';
  }

  if (formValues[PASSWORD] && formValues[PASSWORD].length < 8) {
    errors[PASSWORD] = 'Password should have at least 8 characters';
  }

  if (formValues[USERNAME] && formValues[USERNAME].length < 8) {
    errors[USERNAME] = 'Username should have at least 8 characters';
  }

  if (formValues[PASSWORD] != formValues[PASSWORD_CONFIRM]) {
    errors[PASSWORD_CONFIRM] = 'Passwords mismatch';
  }

  return errors;
};

const NewAccount = ({ setStep }: StepProps): JSX.Element => {
  const onSubmit = async (values: object): Promise<void> => {
    const formValues = values as FormValues;
    console.log(formValues);
    setStep('second');
  };

  const { form, handleSubmit, pristine, submitting, invalid } = useForm({
    onSubmit,
    validate,
  });

  return (
    <Block
      id={`${SIGNUP_ROUTE}_first`}
      paddingRight={2}
      paddingLeft={2}
      paddingTop={2}
    >
      <Typography color="primary" variant="h4" inline>
        New
      </Typography>
      <Typography variant="h4" inline>
        {' Account'}
      </Typography>
      <Block padding={2} marginTop={3} marginBottom={1}>
        <Form onSubmit={handleSubmit}>
          <Block marginBottom={1}>
            <TextFieldForm
              label="Username"
              placeholder="Username"
              form={form}
              required
              fullWidth
              name={USERNAME}
            />
          </Block>
          <Block marginBottom={1}>
            <TextFieldForm
              label="Password"
              placeholder="Password"
              type="password"
              form={form}
              required
              fullWidth
              name={PASSWORD}
            />
          </Block>
          <Block marginBottom={1}>
            <TextFieldForm
              label="Confirm Password"
              placeholder="Confirm Password"
              type="password"
              form={form}
              required
              fullWidth
              name={PASSWORD_CONFIRM}
            />
          </Block>
          <Block display="flex" justifyContent="flex-end">
            <Button type="submit" disabled={invalid || pristine || submitting}>
              Continue
            </Button>
          </Block>
        </Form>
      </Block>
      <Block textAlign="center" marginBottom={1}>
        <Image src={iovLogo} alt="IOV logo" />
      </Block>
    </Block>
  );
};

export default NewAccount;
