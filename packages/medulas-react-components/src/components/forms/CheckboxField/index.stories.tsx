/* eslint-disable no-console */
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import React from 'react';
import CheckboxField from './index';
import { Storybook } from '../../../utils/storybook';
import Form, { useForm } from '../Form';

const CheckboxFieldForm = (): JSX.Element => {
  const { form, handleSubmit } = useForm({
    onSubmit: () => {
      console.log('value checked, onSubmit');
      action('Form submit');
    },
  });

  return (
    <Form onSubmit={handleSubmit}>
      <CheckboxField
        initial={false}
        form={form}
        fieldName="SELECT_FIELD_ATTR"
        label="Checkbox field"
        onChangeCallback={(checked: boolean) => {
          console.log('value checked, onChangeCallback');
          action(`received ---> ${checked ? 'true' : 'false'}`);
        }}
      />
    </Form>
  );
};

storiesOf('Components /forms', module).add('CheckboxField', () => (
  <Storybook>
    <CheckboxFieldForm />
  </Storybook>
));
