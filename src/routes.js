import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import CadastroMarca from "./pages/CadastroMarca";
import Home from "./pages/Home";

export default function Routes() {
  return (
    <Router>
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
        <Route path="/login">
          <div>Login</div>
        </Route>
        {/* <Route path="/">
          <ListagemMarcas></ListagemMarcas>
        </Route> */}
        <Route exact path="/" component={Home} />
      </Switch>
    </Router>
  )
}