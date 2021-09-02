import { act, fireEvent, render, screen, waitFor } from "@testing-library/react"
import '@testing-library/jest-dom';
import { Router } from "react-router-dom";
import { createMemoryHistory }  from 'history'
import MenuHorizontal from "./MenuHorizontal";

describe("<MenuHorizontal />", () => {
    it("should display login and veículos", async () => {
        const history = createMemoryHistory()
        history.location.pathname = '/vehicle';
        await act(async ()=> render(
            <Router history={history} >
                <MenuHorizontal isAuthenticated={false} />
            </Router>
        ))
        await waitFor(() => expect(screen.getByText('login')).toBeInTheDocument());
        await waitFor(() => expect(screen.getByText('Veículos')).toBeInTheDocument());

    })
    it("should display at least veiculos, marcas e sair", async () => {
        const history = createMemoryHistory()
        history.location.pathname = '/vehicle';
        await act(async ()=> render(
            <Router history={history} >
                <MenuHorizontal isAuthenticated={true} />
            </Router>
        ))

        expect(screen.getByText('Sair')).toBeInTheDocument()
        expect(screen.getByText('Veículos')).toBeInTheDocument()
        expect(screen.getByText('Marcas')).toBeInTheDocument()
        expect(screen.getByText('Dashboard')).toBeInTheDocument()

    })

    it("should redirect user when click on logout - simple way", async () => {
        
        const history = createMemoryHistory()
        history.location.pathname = '/vehicle'

        await act(async () => render(
            <Router history={history}>
                <MenuHorizontal isAuthenticated={true}/>
            </Router>)
        )
        
        await act(async () => {
        fireEvent.click(screen.getByText(/Sair/))
        expect(history.location.pathname).toEqual('/')
        })
    });

    it("on home not display menu", async () => {
        
        const history = createMemoryHistory()
        history.location.pathname = '/'

        const { container } = render(
            <Router history={history}>
                <MenuHorizontal isAuthenticated={true}/>
            </Router>
        )
        
        expect(container).toBeEmptyDOMElement()
     });

})