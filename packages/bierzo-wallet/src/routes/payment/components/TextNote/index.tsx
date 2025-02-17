import { FormApi } from "final-form";
import { Block, notLongerThan, TextField, Typography } from "medulas-react-components";
import React from "react";

export const TEXTNOTE_FIELD = "textNoteField";

interface Props {
  form: FormApi;
}

const validator = notLongerThan(150);

const TextNote = (props: Props): JSX.Element => {
  return (
    <Block width="100%" marginTop={4} display="flex" flexDirection="column">
      <Typography color="textPrimary" variant="subtitle2">
        Note
      </Typography>
      <Block marginTop={1}>
        <TextField
          name={TEXTNOTE_FIELD}
          form={props.form}
          validate={validator}
          placeholder="Add an optional message"
          multiline
          rows="2"
          fullWidth
          margin="none"
        />
      </Block>
    </Block>
  );
};

export default TextNote;
