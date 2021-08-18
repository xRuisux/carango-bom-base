import { fireEvent, render, screen } from "@testing-library/react"
import Login from "."

describe('<Login />', () => {
  it('render correctly', () => {
    render(<Login />)

    const inputPassword = screen.getByLabelText(/senha/i)

    expect(screen.getByRole('heading', { name: /login/i })).toBeInTheDocument()
    expect(screen.getByLabelText(/usuário/i)).toBeInTheDocument()
    expect(inputPassword).toBeInTheDocument()
    expect(inputPassword).toHaveAttribute('type', 'password')
    expect(screen.getByRole('button', { name: /entrar/i })).toBeInTheDocument()
  })

  it('should not submit form', () => {
    render(<Login />)

    fireEvent.click(screen.getByRole('button'))

    expect(screen.getByText(/preencha todos os campos/i)).toBeInTheDocument()
  })

  it('should fill form', () => {
    render(<Login />)

    const userInput = screen.getByLabelText(/usuário/i)
    const passwordInput = screen.getByLabelText(/senha/i)

    fireEvent.change(userInput, { target: { value: 'amanda@gmail.com' } })
    fireEvent.change(passwordInput, { target: { value: 'pass123' } })

    expect(userInput).toHaveValue('amanda@gmail.com')
    expect(passwordInput).toHaveValue('pass123')
  })

  // test form submission
})