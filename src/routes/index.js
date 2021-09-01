import { lazy, Suspense } from "react"
import { Switch, Route, BrowserRouter as Router } from "react-router-dom"
import { FormVehicle } from "../components/FormVehicle/FormVehicle"
import MenuHorizontal from "../components/MenuHorizontal"
import { PageNotFound } from "../pages/PageNotFound"
import { VehicleList } from "../pages/VehicleList"
import PrivateRoute from "./PrivateRoute"

const Home = lazy(() => import("../pages/Home"))
const Login = lazy(() => import("../pages/Login"))
const CadastroMarca = lazy(() => import("../pages/CadastroMarca"))
const Dashboard = lazy(() => import("../pages/Dashboard"))


export default function Routes() {

  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <MenuHorizontal />
        <Switch>
          <PrivateRoute path="/cadastro-marca" component={CadastroMarca} />
          <PrivateRoute path='/alteracao-marca/:id' component={CadastroMarca} />
          <PrivateRoute path='/dashboard' component={Dashboard} />
          <PrivateRoute path="/vehicle-form" component={FormVehicle} />
          <PrivateRoute path="/vehicle" component={VehicleList} />
          <Route path="/login" component={Login} />
          <Route exact path="/" component={Home} />
          <Route path="*" component={PageNotFound} />
        </Switch>
      </Suspense>
    </Router>
  )
}