import { render, screen } from "@testing-library/react"
import '@testing-library/jest-dom';
import Card from "./Card";

describe("<Card />", () => {
  it("render correctly", () => {
    render(<Card brandName="Volks" totalVehicles={1} totalAmount={1000} />)

    expect(screen.getByText('Volks')).toBeInTheDocument()
    expect(screen.getByText('1 veículo')).toBeInTheDocument()
   //expect(screen.getByText('R$ 1.000,00')).toBeInTheDocument()

  })
  it("vehicle translation must be on plural when there are more than one vehicle", () => {
    render(<Card brandName="Volks" totalVehicles={2} totalAmount={1000} />)

    expect(screen.getByText('Volks')).toBeInTheDocument()
    expect(screen.getByText('2 veículos')).toBeInTheDocument()
    //expect(screen.getByText('R$ 1.000,00')).toBeInTheDocument()

  })
  it("when there is no vehicle must see 'não há veículos'", () => {
    render(<Card brandName="Volks" totalVehicles={0} totalAmount={0} />)

    expect(screen.getByText('Volks')).toBeInTheDocument()
    expect(screen.getByText('Não há veículos')).toBeInTheDocument()

  })
})