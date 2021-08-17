import React from 'react';
import { Container, CssBaseline, makeStyles } from '@material-ui/core';
import blue from '@material-ui/core/colors/blue';
import { ptBR } from '@material-ui/core/locale';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import CadastroMarca from './pages/CadastroMarca';
import ListagemMarcas from './pages/ListagemMarcas';
import Home from "./pages/Home";
import Login from './pages/Login';

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
        <Switch>
          <Route path="/cadastro-marca">
            <CadastroMarca></CadastroMarca>
          </Route>
          <Route path='/alteracao-marca/:id'>
            <CadastroMarca></CadastroMarca>
          </Route>
          <Route path="/veiculos">
            <div>Veículos</div>
          </Route>
          <Route path="/login" component={Login} />
          {/* <Route path="/">
            <ListagemMarcas></ListagemMarcas>
          </Route> */}
          <Route exact path="/" component={Home} />
        </Switch>
      </main>
    </ThemeProvider>
  );
}

export default App;
