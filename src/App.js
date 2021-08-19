import React from 'react';
import { CssBaseline } from '@material-ui/core'
import { ptBR } from '@material-ui/core/locale';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import './App.css';
import CadastroMarca from './pages/CadastroMarca';
import ListagemMarcas from './pages/ListagemMarcas';
import Routes from './routes';
import { AutenticacaoProvider } from './hooks/useAutenticacao';

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
    white: '#F6F8FC',
    gray: '#A9A9A9',
    darkGray: '#777777',
    red: "#EE4F4F"
  }
}, ptBR);

function App() {

  return (
    <AutenticacaoProvider>
      <ThemeProvider theme={muiTheme}>
        <CssBaseline />
        <main>
          <Routes />
        </main>
      </ThemeProvider>
    </AutenticacaoProvider>
  );
}

export default App;
