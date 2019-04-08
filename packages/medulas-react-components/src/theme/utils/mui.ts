import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeOptions } from '@material-ui/core/styles/createMuiTheme';
import { lightFont, white, secondaryColor } from './variables';
import grey from '@material-ui/core/colors/grey';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#31E6C9',
      contrastText: white,
    },
    secondary: {
      main: secondaryColor,
    },
    error: {
      main: '#ffb968',
    },
    text: {
      primary: '#1C1C1C',
      secondary: 'rgba(111, 116, 154, 0.47)',
    },
    background: {
      default: '#f5f7f9',
    },
    action: {
      disabled: white,
      disabledBackground: 'rgba(44, 208, 182, 0.40)',
    },
    contrastThreshold: 3,
    tonalOffset: 0.2,
  },
  typography: {
    fontFamily: "'Muli', sans-serif",
    fontSize: 10,
    fontWeightLight: lightFont,
    fontWeightRegular: 400,
    fontWeightMedium: 600,
    h1: {
      fontSize: '9.8rem',
    },
    h2: {
      fontSize: '6rem',
    },
    h3: {
      fontSize: '4.5rem',
    },
    h4: {
      fontSize: '3.5rem',
      fontWeight: lightFont,
    },
    h5: {
      fontSize: '3.2rem',
    },
    h6: {
      fontSize: '1.8rem',
    },
    body1: {
      fontSize: '1.6rem',
    },
    body2: {
      fontSize: '1.4rem',
      lineHeight: '1.6rem',
    },
    subtitle1: {
      fontSize: '1.6rem',
    },
    subtitle2: {
      fontSize: '1.4rem',
      lineHeight: '1.4rem',
    },
  },
});

const themeObject: ThemeOptions = {
  ...theme,

  overrides: {
    MuiButton: {
      root: {
        fontSize: '1.6rem',
      },
      label: {
        textTransform: 'capitalize',
      },
      contained: {
        boxShadow: 'none',
      },
      containedPrimary: {
        '&:hover': {
          backgroundColor: '#2cd0b6',
        },
      },
    },
    MuiOutlinedInput: {
      root: {
        // Do not change border color in hover effect
        '&:hover:not($disabled):not($focused):not($error) $notchedOutline': {
          borderColor: grey[300],
        },
        // Make bolder border color when focused
        '&$focused $notchedOutline': {
          borderWidth: '1px',
          borderColor: grey[400],
        },
        // Specify notched color
        '& $notchedOutline': {
          borderColor: grey[300],
        },
        // Make lighter border color when disabled
        '&$disabled $notchedOutline': {
          borderColor: grey[200],
        },
        backgroundColor: '#fcfcfc',
      },
      input: {
        padding: '12px',
        fontSize: '1.6rem',
      },
      error: {
        backgroundColor: '#fff1e1',
      },
    },
    MuiInputLabel: {
      formControl: {
        top: `-${theme.spacing(3)}px`,
        color: theme.palette.text.primary,
        fontWeight: theme.typography.fontWeightMedium,
        fontSize: '1.4rem',
        '&$focused': {
          // Use text primary in TextField labels when focusing.
          color: `${theme.palette.text.primary}`,
        },
      },
      error: {
        // Maintain the text primary color on errored text fields when loosing focus
        color: `${theme.palette.text.primary} !important`,
      },
    },
    MuiFormHelperText: {
      contained: {
        margin: `${theme.spacing(1)}px ${theme.spacing(0)}px`,
        fontSize: '1.4rem',
      },
    },
    MuiSnackbarContent: {
      root: {
        [theme.breakpoints.up('xs')]: {
          borderRadius: 2,
          boxShadow: '0 0 6px 0 #f3f4fb',
        },
        width: 350,
        backgroundColor: white,
        padding: `${theme.spacing(2)}px ${theme.spacing(3)}px`,
        flexWrap: 'nowrap',
      },
      message: {
        display: 'flex',
        flexGrow: 1,
        padding: 0,
      },
      action: {
        flexGrow: 0,
        margin: 0,
        padding: 0,
        marginRight: 0,
      },
    },
  },
  //https://material-ui.com/customization/themes/#properties
  props: {
    MuiButton: {
      variant: 'contained',
      color: 'primary',
    },
    MuiTextField: {
      variant: 'outlined',
      InputProps: {
        labelWidth: 0,
      },
    },
    MuiInputLabel: {
      shrink: true,
      variant: 'standard',
    },
  },
};

export default createMuiTheme(themeObject);
