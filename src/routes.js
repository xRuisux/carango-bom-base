import { lazy, Suspense } from "react"
import { Switch, Route, BrowserRouter as Router } from "react-router-dom"

const Home = lazy(() => import("./pages/Home"))
const Login = lazy(() => import("./pages/Login"))
const CadastroMarca = lazy(() => import("./pages/CadastroMarca"))

export default function Routes() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
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
      </Suspense>
    </Router>
  )
}