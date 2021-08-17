import { screen } from "@testing-library/react"
import Home from ".."
import { renderWithRouter } from "../../../utils/renderWithRouter"
import '@testing-library/jest-dom';

describe("<Home />", () => {
  it("render correctly", () => {
    renderWithRouter(<Home />)

    expect(screen.getByRole('heading', {name: 'Bem vinda ao Carango Bom!'})).toBeInTheDocument()
    expect(screen.getByRole('heading', {name: 'Bem vinda ao Carango Bom!'}))
    expect(screen.getByRole('link', { name: /visualizar veículos/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /efetuar login/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /efetuar login/i })).toBeInTheDocument()
  })

  it("should have a link to veicules and login pages", () => {
    renderWithRouter(<Home />)
    
    expect(screen.getByRole('link', { name: /visualizar veículos/i })).toHaveAttribute("href", "/veiculos")
    expect(screen.getByRole('link', { name: /efetuar login/i })).toHaveAttribute("href", "/login")
  })
})