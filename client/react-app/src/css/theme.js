import { createTheme } from '@mui/material';

const theme = createTheme({
  typography: {
    fontFamily:[
      'Fredoka One',
      'cursive'
    ].join(','),
  },
  palette: {
    primary: {
      light: '#bedd9a',
      main: '#92e492',
      dark: '#77dd77',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ffb851',
      main: '#ffa726',
      dark: '#b2741a',
      contrastText: '#fff',
    },
  },
});

export default theme;
