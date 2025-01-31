import { lazy, Suspense } from "react"
import { Switch, Route, BrowserRouter as Router } from "react-router-dom"
import { FormVehicle } from "../components/FormVehicle/FormVehicle"
import MenuHorizontal from "../components/MenuHorizontal/MenuHorizontal"
import { useAuth } from "../hooks/useAuth"
import { PageNotFound } from "../pages/PageNotFound"
import { VehicleList } from "../pages/VehicleList"
import { UserList } from "../pages/UserList"
import PrivateRoute from "./PrivateRoute"

const Home = lazy(() => import("../pages/Home"))
const Login = lazy(() => import("../pages/Login"))
const Dashboard = lazy(() => import("../pages/Dashboard"))
const BrandList = lazy(() => import("../pages/BrandList/BrandList"))
const BrandRegister = lazy(() => import("../pages/BrandRegister/BrandRegister"))


export default function Routes() {
  const { isUserLoggedIn } = useAuth()
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <MenuHorizontal isAuthenticated={isUserLoggedIn()}/>
        <Switch>
          <PrivateRoute path="/brands" component={BrandList} />
          <PrivateRoute path="/create-brand" component={BrandRegister} />
          <PrivateRoute path='/update-brand/:id' component={BrandRegister} />
          <PrivateRoute path='/dashboard' component={Dashboard} />
          <PrivateRoute path="/vehicle-form" component={FormVehicle} />
          <Route path="/vehicle" component={VehicleList} />
          <PrivateRoute path="/user" component={UserList} />
          <Route path="/login" component={Login} />
          <Route exact path="/" component={Home} />
          <Route path="*" component={PageNotFound} />
        </Switch>
      </Suspense>
    </Router>
  )
}

