import React from 'react';
import { CssBaseline } from '@material-ui/core';
import { ptBR } from '@material-ui/core/locale';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import CadastroMarca from './pages/CadastroMarca';
import ListagemMarcas from './pages/ListagemMarcas'
import Routes from './routes';

/*
breakpoints:
xs: 0 - 599
sm: 600 - 959
md: 960 - 1279
lg: 1280 - 1919
xl: 1920 - ...
*/
const muiTheme = createMuiTheme({
  palette: {
    primary: {
      main: 'rgba(31,45,75, 0.95)',
      yellow: '#EED44D',
    },
    white: '#F6F8FC'
  }
}, ptBR);

function App() {

  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      <main>
        <Routes />
      </main>
    </ThemeProvider>
  );
}

export default App;
