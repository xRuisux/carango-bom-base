import { lazy, Suspense } from "react"
import { Switch, Route, BrowserRouter as Router } from "react-router-dom"
import { PageNotFound } from "../pages/PageNotFound"
import PrivateRoute from "./PrivateRoute"

const Home = lazy(() => import("../pages/Home"))
const Login = lazy(() => import("../pages/Login"))
const BrandRegister = lazy(() => import("../pages/Brand/BrandRegister/BrandRegister"))
const BrandList = lazy(() => import("../pages/Brand/BrandList/BrandList"))

export default function Routes() {

  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
        <PrivateRoute path="/brands" component={BrandList} />
          <PrivateRoute path="/create-brand" component={BrandRegister} />
          <PrivateRoute path='/update-brand/:id' component={BrandRegister} />
          <Route path="/vehicle">
            <div>Veículos</div>
          </Route>
          <Route path="/login" component={Login} />
          <Route exact path="/" component={Home} />
          <Route path="*" component={PageNotFound} />
        </Switch>
      </Suspense>
    </Router>
  )
}