import { createTheme } from '@mui/material/styles';

const baseTheme = createTheme({
  shape: {
    borderRadius: "0.65em"
  },
  typography: {
    fontFamily: 'FreeSans, sans-serif',
  },
  components: { 
    MuiFormLabel: {
      styleOverrides: {
        root: {
          "&.Mui-focused": {
            "color": "#1976d2"
          }
        },
      },
    },
    MuiAccordion: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
          background: 'none',
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        indicator: {
          backgroundColor: '#1976d2',
          height: '0.2em',
        },
      },
    },
    MuiSwitch: {
      styleOverrides: {
        root: {
          '& .MuiSwitch-switchBase.Mui-checked': {
            color: '#1976d2',
            '&:hover': {
              backgroundColor: 'none',
            },
          },
          '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
            backgroundColor: '#1976d2',
          },
          '& .MuiSwitch-switchBase.Mui-focusVisible': {
            background: 'rgb(25, 118, 210, 0.2)',
          },
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          margin: '1.5em',
          border: 'none',
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        root: {
          '&.Mui-focusVisible': {
            outline: 'none',
          },
        },
        paper: {
          backgroundImage: 'none',
        },
      },
    },
    MuiDialogActions: {
      styleOverrides: {
        root: {
          padding: '0',
        },
      },
    },
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
      },
    },    
  },
});

const darkTheme = createTheme({
  ...baseTheme,
  palette: {
    mode: 'dark',
    background: {
      default: '#212224',
      paper: '#3B3B3B',
    },
  },
  components: {
    ...baseTheme.components,
    MuiBox: {
      styleOverrides: {
        root: {
          backgroundColor: '#ebebeb',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          border: 'none',
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          '&:focus-visible': {
            background: '#2d2d2d',
            outline: 'none;',
          },
        },
      },
    },    
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          background: '#2d2d2d',
        },
        notchedOutline: {
          border: 'none',
        },
      }
    },
    MuiDialogActions: {
      styleOverrides: {
        root: {
          padding: '0',
          '& .MuiButton-root': {
            borderColor: '#2d2d2d',

          },
          '& .MuiButton-root:hover': {
            background: 'none',
            color: '#f0f0f0',
          },
        },
      },
    },        
    MuiTab: {
      styleOverrides: {
        root: {
          "&.Mui-selected": {
            "color": '#1976d2',
          },
          '&.Mui-focusVisible': {
            backgroundColor: '#2d2d2d',
          },          
        },
      },
    },
    MuiRadio: {
      styleOverrides: {
        root: {
          color: 'white',
          "&.Mui-checked": {
            "color": '#1976d2',
          },
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: '#1976d2',
          "&.Mui-checked": {
            color: '#1976d2',
          },
          '&.Mui-focusVisible svg': {
            color: 'white',
          },
          '&.Mui-checked.Mui-focusVisible svg': {
            color: 'white',
          },
        },
      },
    },
    MuiPickersDay: {
      styleOverrides: {
        root: {
          '&.Mui-selected': {
            color: 'white',
            backgroundColor: '#1976d2',
          },
          '&.MuiPickersDay-today': {
            color: '#2d2d2d',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          minWidth: '2.5em',
          textTransform: 'none',
          fontSize: '1em',
          boxShadow: 'none',
          background: '#1976d2',
          color: 'white',
          '&:hover': {
            boxShadow: 'none',
            background: '#1976d2',
          },
          '&:active': {
            boxShadow: 'none',
          },
          '&:focus': {
            boxShadow: 'none',
          },
          '&.Mui-focusVisible': {
            outline: '2px solid #f0f0f0',
            backgroundColor: 'none',
          },
        }
      }, 
    },
  },
});

const lightTheme = createTheme({
  ...baseTheme,
  palette: {
    mode: 'light',
  },  
  components: {
    ...baseTheme.components,
    MuiDrawer: {
      styleOverrides: {
        paper: {
          border: 'none',
          backgroundColor: '#ebebeb',
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          background: '#f0f0f0',
        },
        notchedOutline: {
          border: 'none',
        },
      }
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          '&:focus-visible': {
            background: '#f0f0f0',
            outline: 'none;',
          },
        },
      },
    },
    MuiDialogActions: {
      styleOverrides: {
        root: {
          padding: '0',
          '& .MuiButton-root': {
            borderColor: '#f0f0f0',
          },
          '& .MuiButton-root:hover': {
            background: '#f0f0f0',
          },
        },
      },
    },    
    MuiTab: {
      styleOverrides: {
        root: {
          "&.Mui-selected": {
            "color": '#1976d2',
          },
          '&.Mui-focusVisible': {
            backgroundColor: '#ccc',
          },          
        },    
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: '#1976d2',
          "&.Mui-checked": {
            "color": '#1976d2',
          },
          '&.Mui-focusVisible svg': {
            color: '#5a5a5a',
          },
          '&.Mui-checked.Mui-focusVisible svg': {
            color: '5a5a5a',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          minWidth: '2.5em',
          textTransform: 'none',
          fontSize: '1em',
          boxShadow: 'none',
          background: '#1976d2',
          color: 'white',
          '&:hover': {
            boxShadow: 'none',
            background: '#1976d2',
          },
          '&:active': {
            boxShadow: 'none',
          },
          '&:focus': {
            boxShadow: 'none',
          },
          '&:focus-visible': {
            outline: '2px solid #5a5a5a',
            border: 'none',
          },
        }
      }, 
    },    
  },
});

export { darkTheme, lightTheme };