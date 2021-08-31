import { fireEvent, render, screen } from "@testing-library/react"
import { Confirm } from "./Confirm"

describe('<Confirm />', () => {
  it('renders correctly', () => {
    const { container } = render(<Confirm open message='Mensagem teste' onConfirm={() => {}} onCancel={() => {}} />)

    expect(screen.getByRole('heading', { name: /mensagem teste/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /cancelar/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /confirmar/i })).toBeInTheDocument()
    expect(container).toBeInTheDocument()
    expect(container).toMatchSnapshot()
  })

  it('should call function on button click', () => {
    const cancelFn = jest.fn()
    const confirmFn = jest.fn()

    render(<Confirm open message='Mensagem teste' onConfirm={confirmFn} onCancel={cancelFn} />)

    fireEvent.click(screen.getByRole('button', { name: /cancelar/i }))
    fireEvent.click(screen.getByRole('button', { name: /confirmar/i }))

    expect(cancelFn).toHaveBeenCalled()
    expect(confirmFn).toHaveBeenCalled()
  })
})