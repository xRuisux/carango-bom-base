import { fireEvent, render, screen } from "@testing-library/react"
import { Vehicle } from "."

describe('<Vehicle />', () => {
  
  it('should render correctly', () => {
    render(<Vehicle />)

    expect(screen.getByRole("button", { name: /adicionar/i })).toBeInTheDocument()
    expect(screen.getByRole("button", { name: /excluir/i })).toBeInTheDocument()
    expect(screen.getByRole("button", { name: /alterar/i })).toBeInTheDocument()

    // search for table
  })

  // it('should display form after add vehicle button is clicked', async () => {
  //   render(<Vehicle />)

  //   fireEvent.click(screen.getByRole("button", { name: /adicionar/i }))
    
  //   expect(screen.getByTestId('form')).toBeInTheDocument();
  // })
})