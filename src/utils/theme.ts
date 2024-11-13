import { createTheme } from '@mui/material';
import { dottedBorder } from './css-styles';

export const MainColor = '#816e5b';
export const MainContentColor = '#fee8c6';
export const InputColor = 'rgba(0,0,0,0.7)';

/* redesign of the Material-UI components */

export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: MainColor,
    },
  },
  typography: {
    fontFamily: 'Typewriter',
    allVariants: {
      color: MainColor,
      fontWeight: 600,
    },
  },
  components: {
    MuiCheckbox: {
      styleOverrides: {
        root: {
          padding: 1,
          marginTop: 4,
        },
      },
    },
    MuiInputBase: {
      defaultProps: {},
      styleOverrides: {
        input: {
          color: InputColor,
          fontFamily: 'Special Elite',
          fontSize: '1.8rem',
          fontWeight: 600,
          lineHeight: 1.5,
          height: '1.3rem',
          /*this is hardcoded based on the font position inside the element*/
          paddingBottom: '3px !important',
          paddingTop: '15px !important',
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        autoComplete: 'off',
        slotProps: {
          inputLabel: {
            shrink: true,
          },
        },
      },
    },
    MuiFilledInput: {
      styleOverrides: {
        root: {
          border: dottedBorder,
          borderRadius: '2px',
          padding: '4px 4px 0 0',
          lineHeight: '1rem',
          height: '45px',
          background: MainContentColor,
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '& input': {
            height: 32,
            paddingBottom: '8px',
          },
          '& .MuiOutlinedInput-notchedOutline': {
            border: '0',
          },
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          fontSize: '1em',
          fontWeight: 400,
          textTransform: 'uppercase',
          left: 'unset !important',
          right: '1rem',
          top: '-0.6em !important',
          transformOrigin: 'right !important',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          background: MainContentColor,
        },
      },
    },
    MuiTooltip: {
      defaultProps: {
        disableInteractive: true,
        enterDelay: 1000,
      },
      styleOverrides: {
        tooltip: {
          fontSize: '1rem',
          maxWidth: 200,
        },
      },
    },
    MuiCssBaseline: {
      defaultProps: {
        enableColorScheme: true,
      },
      styleOverrides: {
        '*': {
          '&::-webkit-scrollbar': {
            '&-thumb': {
              background: 'darkgray',
              borderRadius: '4px',
            },
            '&-track': {
              background: 'inherit',
            },
            height: '4px',
            width: '4px',
          },
        },
        body: {
          '&::-webkit-scrollbar': {
            '&-thumb': {
              borderRadius: '6px',
            },
            height: '6px',
            width: '6px',
          },
        },
      },
    },
  },
});

/*styleOverrides: {
  '*': {
    '&::-webkit-scrollbar': {
      '&-thumb': {
        background: colors.darkNight[400].color,
          borderRadius: '4px',
      },
      '&-track': {
        background: 'inherit',
      },
      height: '4px',
        width: '4px',
    },
  },
  body: {
    '&::-webkit-scrollbar': {
      '&-thumb': {
        borderRadius: '6px',
      },
      height: '6px',
        width: '6px',
    },
  },
},*/
