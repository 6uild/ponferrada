import { FieldValidator, FormApi } from "final-form";
import {
  Block,
  composeValidators,
  FieldInputValue,
  required,
  TextFieldForm,
  Typography,
} from "medulas-react-components";
import React, { useMemo } from "react";

const WHEN_FIELD = "When";
export const DATE_FIELD = "Date";

const weekMilliseconds = 604800000;

export const dateAfterNow = (value: FieldInputValue): string | undefined => {
  if (typeof value !== "string") throw new Error("Input must be a string");

  const date = new Date(value);
  const now = new Date();
  const dateLimit = new Date(now.getTime() + weekMilliseconds);

  if (now < date && date < dateLimit) {
    return undefined;
  } else {
    return "Must be a future date within 7 days";
  }
};

interface Props {
  readonly form: FormApi;
}

const WhenField = ({ form }: Props): JSX.Element => {
  const dateAfterNowValidator = React.useMemo(() => {
    const validator: FieldValidator<FieldInputValue> = (value): string | undefined => dateAfterNow(value);
    return validator;
  }, []);

  const dateValidator = useMemo(() => composeValidators(required, dateAfterNowValidator), [
    dateAfterNowValidator,
  ]);

  return (
    <Block>
      <Typography>{WHEN_FIELD}</Typography>
      <TextFieldForm
        name={DATE_FIELD}
        form={form}
        validate={dateValidator}
        type="datetime-local"
        fullWidth
        margin="none"
      />
    </Block>
  );
};

export default WhenField;
