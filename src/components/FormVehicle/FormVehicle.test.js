import { fireEvent, render, screen } from "@testing-library/react"
import { FormVehicle } from "."

describe('<FormVehicle />', () => {

  it('renders correctly', () => {
    render(<FormVehicle />)

    const confirmBtn = screen.getByRole("button", { name: /cadastrar/i })
// TODO: add select
    expect(screen.getByLabelText(/modelo/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/ano/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/valor/i)).toBeInTheDocument()
    expect(screen.getByRole("button", { name: /cancelar/i })).toBeInTheDocument()
    expect(confirmBtn).toBeInTheDocument()
    expect(confirmBtn).toHaveAttribute('type', 'submit')
    expect(confirmBtn).toBeDisabled()
  })

  it('should call cancel function on cancel button click', () => {
    const cancelFn = jest.fn()

    render(<FormVehicle onCancel={cancelFn} />)

    fireEvent.click(screen.getByRole('button', { name: /cancelar/i }))

    expect(cancelFn).toHaveBeenCalled()
  })

  it('should enable confirm button after after fields are all filled and submit form', () => {
    const submitFunc = jest.fn()

    render(<FormVehicle onSubmit={submitFunc} />)

    // TODO: add select
    const inputYear = screen.getByLabelText(/ano/i)
    const inputModel  = screen.getByLabelText(/modelo/i)
    const inputPrice = screen.getByLabelText(/valor/i)

    fireEvent.change(inputYear, { target: { value: 2020 }})
    fireEvent.change(inputModel, { target: { value: 'Civic' }})
    fireEvent.change(inputPrice, { target: { value: '60.000' }})

    expect(screen.getByRole('button', { name: /cadastrar/i })).not.toBeDisabled()
  })
})