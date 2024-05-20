import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#00e4f3',
    },
    secondary: {
      main: '#00325b',
    },
    grey: {
      main: '#7f7f73',
    },
    background: {
      default: '#00325b',
      paper: 'white',
    },
    success: {
      main: '#3ca341',
    },
  },
  typography: {
    fontFamily: 'Arial, sans-serif',
  },
  components: {
    MuiFilledInput: {
      styleOverrides: {
        root: {
          color: 'white', 
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: '#7f7f7a',
          '&.Mui-focused': {
            color: '#00e4f3', 
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
      },
    },
  },
});

export default theme;
