import { act, render, screen, waitFor } from "@testing-library/react"
import '@testing-library/jest-dom';
import MenuHorizontal from ".";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { lazy, Suspense } from "react";

describe("<MenuHorizontal />", () => {
  it("should display login and veículos", () => {
    render(
        <BrowserRouter>
            <MenuHorizontal isAuthenticated={false} />
        </BrowserRouter>
    )

    expect(screen.getByText('login')).toBeInTheDocument()
    expect(screen.getByText('Veículos')).toBeInTheDocument()

  })
  it("should display at least veiculos, marcas e sair", () => {
    render(
        <BrowserRouter>
            <MenuHorizontal isAuthenticated={true} />
        </BrowserRouter>
    )

    expect(screen.getByText('Sair')).toBeInTheDocument()
    expect(screen.getByText('Veículos')).toBeInTheDocument()
    expect(screen.getByText('Marcas')).toBeInTheDocument()
    expect(screen.getByText('Dashboard')).toBeInTheDocument()

  })
   it("should redirect user when click on logout", async () => {
        const Login = lazy(() => import("../../pages/Login"))
        const VehicleList = lazy(() => import("../../pages/VehicleList"))
        const Home = lazy(() => import("../../pages/Home"))
    
        render(
            <BrowserRouter>
                <MenuHorizontal isAuthenticated={true}/>
                <Switch>
                <Suspense fallback={<div>Loading...</div>}>
                    <Route path="/vehicle" component={VehicleList} />
                    <Route path="/login" component={Login} />
                    <Route exact path="/" component={Home} />
                    </Suspense>
                </Switch>
            
            </BrowserRouter>
        );
        await waitFor(() => expect(screen.getByText('Sair')).toBeInTheDocument());
        const logout = screen.getByText(/Sair/);
        userEvent.click(logout)
        await waitFor(() => expect(screen.getByText('Efetuar login')).toBeInTheDocument());
     });

})