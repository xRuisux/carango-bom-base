import { lazy, Suspense } from "react"
import { Switch, Route, BrowserRouter as Router } from "react-router-dom"
import { PageNotFound } from "../pages/PageNotFound"
import { Vehicle } from "../pages/Vehicle"
import PrivateRoute from "./PrivateRoute"

const Home = lazy(() => import("../pages/Home"))
const Login = lazy(() => import("../pages/Login"))
const CadastroMarca = lazy(() => import("../pages/CadastroMarca"))

export default function Routes() {

  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <PrivateRoute path="/cadastro-marca" component={CadastroMarca} />
          <PrivateRoute path='/alteracao-marca/:id' component={CadastroMarca} />
          <Route path="/veiculos">
            <div>Veículos</div>
          </Route>
          <Route path="/vehicle" component={Vehicle} />
          <Route path="/login" component={Login} />
          <Route exact path="/" component={Home} />
          <Route path="*" component={PageNotFound} />
        </Switch>
      </Suspense>
    </Router>
  )
}