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
    h4: {
      fontWeight: "bold",
      color: "white", 
    },
    h6: {
      color: "white", 
    },
    body1: {
      color: "white", // X color para body1
    },
    body2: {
      color: "lightslategrey", // Y color para body2
    },
    body3: {
      color: "black",
    }
  },
  components: {
    MuiFilledInput: {
      styleOverrides: {
        root: {
          color: 'white', 
        },
      },
    },
    MuiPickersCalendarHeader: {
      styleOverrides: {
        label: {
          color: '#000000'
        }
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          color: 'white', 
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          '&.Mui-selected': {
            backgroundColor: "lightBlue",
          },
          color: 'black',
        },
      },
    },
    MuiAutocomplete: {
      styleOverrides: {
        paper: {
          color: 'black',
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
