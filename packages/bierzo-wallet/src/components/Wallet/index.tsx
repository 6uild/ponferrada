import React from 'react';
import ContinueButton from './ContinueButton';
import CurrencyToSend from './CurrencyToSend';
import ReceiverAddress from './ReceiverAddress';
import TextNote from './TextNote';
import { makeStyles } from '@material-ui/core';

const positionings: {
  wallet: React.CSSProperties;
  currencyToSend: React.CSSProperties;
  receiverAddress: React.CSSProperties;
  textNote: React.CSSProperties;
  continueButton: React.CSSProperties;
} = {
  wallet: {
    backgroundColor: '#f9f9f9',
    height: 'auto',
    minHeight: '100vh',
    display: 'grid',
    gridTemplateColumns: '1fr minmax(375px, 450px) 1fr',
    gridTemplateRows: 'repeat(4, auto)',
    gridTemplateAreas: `
  ". currency-to-send ."
  ". receiver-address ."
  ". text-note        ."
  ". continue-button  ."
  `,
    gridGap: '24px',
    placeItems: 'center',
    placeContent: 'center',
  },

  currencyToSend: {
    gridArea: 'currency-to-send',
  },

  receiverAddress: {
    gridArea: 'receiver-address',
  },

  textNote: {
    gridArea: 'text-note',
  },

  continueButton: {
    gridArea: 'continue-button',
  },
};

const useStyles = makeStyles({
  currencyToSend: {
    gridArea: 'currency-to-send',
  },
  continue: {
    gridArea: 'continue-button',
  },
});

const Wallet = () => {
  const classes = useStyles();

  return (
    <div style={positionings.wallet}>
      <CurrencyToSend positionedClass={classes.currencyToSend} />
      <ReceiverAddress positioning={positionings.receiverAddress} />
      <TextNote positioning={positionings.textNote} />
      <ContinueButton className={classes.continue} />
    </div>
  );
};

export default Wallet;
