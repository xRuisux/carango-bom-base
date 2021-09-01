import { render, screen } from "@testing-library/react"
import '@testing-library/jest-dom';
import CardList from "./CardList";

describe("<CardList />", () => {
  it("render correctly", () => {
    const myCards = [
        {
            brandName: "Volks",
            totalVehicles: 1,
            totalAmount: 10000
        },
        {
            brandName: "Honda",
            totalVehicles: 2,
            totalAmount: 200000
        },
    ]
    render(<CardList cards={myCards} />)

    expect(screen.getByText('Volks')).toBeInTheDocument()
    expect(screen.getByText('1 veículo')).toBeInTheDocument()
    expect(screen.getByText('Honda')).toBeInTheDocument()
    expect(screen.getByText('2 veículos')).toBeInTheDocument()
  })
})